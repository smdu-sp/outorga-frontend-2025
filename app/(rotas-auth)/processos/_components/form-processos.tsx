/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { criar } from '@/services/processos';

const formSchema = z.object({
	processo: z.string(),
	type: z.enum(['PDE', 'COTA']),
	cpf_cnpj: z.string(),
	protocolo: z.string().optional(),
});

export default function FormProcessos() {
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			processo: '',
			type: 'PDE',
			cpf_cnpj: '',
			protocolo: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const { processo, type, protocolo } = values;
		startTransition(async () => {
			const resp = await criar({
				num_processo: processo,
				tipo: type,
				protocolo_ad: protocolo,
			});
			console.log(resp);
			if (!resp.ok) {
				console.log(resp.error);
				toast.error('Algo deu errado');
			} else {
				toast.success('Processo criado com sucesso');
				window.location.reload();
			}
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'>
				<FormField
					control={form.control}
					name='processo'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nº Processo</FormLabel>
							<FormControl>
								<Input
									placeholder='Digite o número do processo'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>{' '}
				{/* <FormField
					control={form.control}
					name='cpf_cnpj'
					render={({ field }) => (
						<FormItem>
							<FormLabel>CPF/CNPJ</FormLabel>
							<FormControl>
								<Input
									placeholder='Digite seu CPF ou CNPJ'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>{' '} */}
				<FormField
					control={form.control}
					name='type'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tipo de Processo</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Selecione o tipo de processo' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='PDE'>PDE</SelectItem>
									<SelectItem value='COTA'>COTA</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='protocolo'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nº Protocolo</FormLabel>
							<FormControl>
								<Input
									placeholder='Digite o número do protocolo'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={isPending}
					className='w-full'
					type='submit'>
					Cadastrar {isPending && <Loader2 className='animate-spin' />}
				</Button>
			</form>
		</Form>
	);
}
