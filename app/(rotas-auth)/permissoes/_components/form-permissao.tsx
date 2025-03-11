/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import * as permissoes from '@/services/permissoes';
import { IPermissao } from '@/types/permissao';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	nome: z.string(),
	permissao: z.string(),
});

interface FormPermissaoProps {
	isUpdating: boolean;
	permissao?: Partial<IPermissao>;
}

export default function FormPermissao({ isUpdating, permissao }: FormPermissaoProps) {
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: permissao?.nome || '',
			permissao: permissao?.permissao || '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			if (isUpdating && permissao?.id && values?.permissao) {
				const permissao_texto = values.permissao;
				const nome = values.nome;
				const resp = await permissoes.atualizar(permissao?.id, {
					permissao: permissao_texto,
					nome
				});
				if (resp.error) toast.error('Algo deu errado', { description: resp.error });
				else toast.success('Permissão Atualizada', { description: resp.status });
			} else {
				const { nome, permissao } = values;
				const resp = await permissoes.criar({ nome, permissao });
				if (resp.error) toast.error('Algo deu errado', { description: resp.error });
				if (resp.ok) toast.success('Permissão Criada', { description: resp.status });
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
				<FormField
					control={form.control}
					name='permissao'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Permissão</FormLabel>
							<FormControl>
								<Input
									placeholder='Permissão'
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
