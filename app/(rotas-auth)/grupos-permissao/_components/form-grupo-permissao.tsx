/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as gruposPermissao from '@/services/grupos-permissao';
import { IGrupoPermissao } from '@/types/grupo-permissao';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	nome: z.string(),
});

interface FormGrupoPermissaoProps {
	isUpdating: boolean;
	grupoPermissao?: Partial<IGrupoPermissao>;
}

export default function FormGrupoPermissao({ isUpdating, grupoPermissao }: FormGrupoPermissaoProps) {
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: grupoPermissao?.nome || '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			if (isUpdating && grupoPermissao?.id && values?.nome) {
				const nome = values.nome;
				const resp = await gruposPermissao.atualizar(grupoPermissao?.id, {
					nome
				});
				if (resp.error) toast.error('Algo deu errado', { description: resp.error });
				else toast.success('Grupo de permissão atualizado', { description: resp.status });
			} else {
				const { nome } = values;
				const resp = await gruposPermissao.criar({ nome });
				if (resp.error) toast.error('Algo deu errado', { description: resp.error });
				if (resp.ok) toast.success('Grupo de permissão criado', { description: resp.status });
				console.log(JSON.stringify(resp));
			}
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4'>
				<FormField
					control={form.control}
					name='nome'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input
									placeholder='Nome da permissão'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex gap-2 items-center justify-end'>
					<DialogClose asChild>
						<Button variant={'outline'}>Voltar</Button>
					</DialogClose>
					<Button
						disabled={isPending}
						type='submit'>
						{isUpdating ? (
							<>
								Atualizar {isPending && <Loader2 className='animate-spin' />}
							</>
						) : (
							<>
								Adicionar {isPending && <Loader2 className='animate-spin' />}
							</>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
