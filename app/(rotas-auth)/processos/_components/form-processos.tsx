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
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { criar } from '@/services/processos';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	processo: z.string(),
	type: z.enum(['PDE', 'COTA']),
	cpf_cnpj: z.string(),
	protocolo: z.string().optional(),
	valor_total: z.number(),
	qtd_parcelas: z.number(),
	vencimento: z.date(),
	valor_parcela: z.number(),
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
			valor_total: 0,
			qtd_parcelas: 0,
			valor_parcela: 0,
			vencimento: new Date(),
		},
	});

	const [parcelasT, setParcelasT] = useState(0);

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

	function gerarParcelas(valor_total: number, qtd_parcelas: number) {
		setParcelasT(qtd_parcelas);
	}

	return (
		<Tabs defaultValue='processo'>
			<TabsList className='grid w-full grid-cols-3'>
				<TabsTrigger value='processo'>Processo</TabsTrigger>
				<TabsTrigger value='gerar'>Gerar Parcelas</TabsTrigger>
				<TabsTrigger value='parcelas'>Parcelas</TabsTrigger>
			</TabsList>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<TabsContent
						value='processo'
						className='space-y-5 mt-2'>
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
						/>
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
					</TabsContent>
					<TabsContent
						value='gerar'
						className='space-y-5 mt-2'>
						<FormField
							control={form.control}
							name='valor_total'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Valor Total</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='Digite o valor total do processo'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='qtd_parcelas'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nº de Parcelas</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='Digite o número de parcelas'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex items-center gap-5'>
							<Button
								onClick={() =>
									gerarParcelas(
										form.getValues('valor_total'),
										form.getValues('qtd_parcelas'),
									)
								}
								disabled={isPending}
								className='w-full'
								type='button'>
								Gerar Agora {isPending && <Loader2 className='animate-spin' />}
							</Button>
						</div>
					</TabsContent>
					<TabsContent
						value='parcelas'
						className='space-y-5 mt-5                            '>
						{parcelasT == 0 ? (
							<p className='text-muted-foreground'>Nenhuma parcela gerada</p>
						) : (
							<div className='grid grid-cols-5 gap-5'>
								{Array.from({ length: parcelasT }, (_, index) => {
									return (
										<div
											key={index}
											className='space-y-3'>
											<FormField
												control={form.control}
												name='cpf_cnpj'
												render={({ field }) => (
													<FormItem>
														<FormLabel>CPF/CNPJ</FormLabel>
														<FormControl>
															<Input
																placeholder='Digite o número do CPF ou CNPJ'
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name='valor_parcela'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Nº de Parcelas</FormLabel>
														<FormControl>
															<Input
																type='number'
																placeholder='Digite o número de parcelas'
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name='vencimento'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Nº de Parcelas</FormLabel>
														<FormControl>
															<Input
																type='date'
																placeholder='Digite a data de vencimento'
																{...field}
																value={
																	field.value
																		? field.value.toISOString().split('T')[0]
																		: ''
																}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<Separator />
										</div>
									);
								})}
							</div>
						)}

						<Button
							disabled={isPending}
							className='w-full'
							type='submit'>
							Cadastrar {isPending && <Loader2 className='animate-spin' />}
						</Button>
					</TabsContent>
				</form>
			</Form>
		</Tabs>
	);
}
