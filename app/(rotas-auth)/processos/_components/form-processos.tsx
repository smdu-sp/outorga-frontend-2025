/** @format */

'use client';

import {
	calculoParcelas,
	days,
	formatCurrency,
	formatDate,
	Installment,
} from '@/app/utils/funcoes-utilitarias';
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
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { criar } from '@/services/processos';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	processo: z.string(),
	type: z.enum(['PDE', 'COTA']),

	protocolo: z.string().optional(),
	valor_total: z.number(),
	qtd_parcelas: z.number(),
	vencimento: z.date(),
	valor_parcela: z.number(),
	dia_vencimento: z.string(),
});

export default function FormProcessos() {
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			processo: '',
			type: 'PDE',

			protocolo: '',
			valor_total: 0,
			qtd_parcelas: 0,
			valor_parcela: 0,
			vencimento: new Date(),
			dia_vencimento: '',
		},
	});

	const [parcelasT, setParcelasT] = useState({
		valorTotal: '',
		parcelas: '',
		vencimento: '',
		cpf_cnpj: '',
	});

	const [installment, setInstallment] = useState<Installment[]>([]);

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

	function handleReset() {
		setParcelasT({
			parcelas: '',
			valorTotal: '',
			vencimento: '',
			cpf_cnpj: '',
		});
		setInstallment([]);
	}

	function handleGenerate() {
		const resp = calculoParcelas(
			parcelasT.valorTotal,
			parcelasT.parcelas,
			parcelasT.vencimento,
		);

		console.log(resp);
		setInstallment(resp);

		return;
	}

	return (
		<Tabs defaultValue='processo'>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='processo'>Processo</TabsTrigger>
				<TabsTrigger value='gerar'>Gerar Parcelas</TabsTrigger>
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
						className='space-y-4 mt-2'>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label>Valor Total</Label>
								<Input
									type='number'
									value={parcelasT.valorTotal}
									onChange={(e) =>
										setParcelasT((prev) => ({
											...prev,
											valorTotal: e.target.value,
										}))
									}></Input>
							</div>
							<div>
								<Label>Nº Parcelas</Label>
								<Input
									type='number'
									value={parcelasT.parcelas}
									onChange={(e) =>
										setParcelasT((prev) => ({
											...prev,
											parcelas: e.target.value,
										}))
									}></Input>
							</div>
							<div>
								<Label>CPF/CNPJ</Label>
								<Input
									type='text'
									placeholder='Digite o CPF ou CNPJ'
									value={parcelasT.cpf_cnpj}
									onChange={(e) =>
										setParcelasT((prev) => ({
											...prev,
											cpf_cnpj: e.target.value,
										}))
									}></Input>
							</div>
							<div>
								<Label>Dia de Vencimento</Label>
								<Select
									onValueChange={(e) =>
										setParcelasT((prev) => ({
											...prev,
											vencimento: e,
										}))
									}
									value={parcelasT.vencimento}
									defaultValue={parcelasT.vencimento}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Selecione o dia' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{days.map((day) => (
											<SelectItem
												key={day}
												value={day}>
												{day}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className='flex items-center gap-5'>
							<Button
								onClick={() => handleGenerate()}
								disabled={
									installment.length > 0 ||
									!parcelasT.parcelas ||
									!parcelasT.valorTotal ||
									!parcelasT.vencimento
								}
								className='w-full'
								type='button'>
								Gerar {isPending && <Loader2 className='animate-spin' />}
							</Button>{' '}
							<Button
								variant={'destructive'}
								onClick={() => handleReset()}
								disabled={parcelasT.parcelas == '' || !parcelasT.parcelas}
								className='w-full'
								type='button'>
								Resetar {isPending && <Loader2 className='animate-spin' />}
							</Button>
						</div>
						{installment.length > 0 && (
							<div>
								<Table className='border'>
									<TableHeader className='bg-primary'>
										<TableRow>
											<TableHead className='text-secondary text-center text-xs'>
												#
											</TableHead>
											<TableHead className='text-secondary text-center text-xs'>
												Vencimento
											</TableHead>
											<TableHead className='text-secondary text-center text-xs'>
												CPF/CNPJ
											</TableHead>
											<TableHead className='text-secondary text-center text-xs'>
												Valor
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{installment.map((item, index) => {
											return (
												<TableRow key={index}>
													<TableCell className='font-medium text-center text-xs'>
														{item.number}
													</TableCell>
													<TableCell className='text-center text-xs'>
														{formatDate(item.dueDate)}
													</TableCell>
													<TableCell className='text-center text-xs'>
														{parcelasT.cpf_cnpj}
													</TableCell>
													<TableCell className='text-center text-xs'>
														{formatCurrency(item.value)}
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
									<TableFooter>
										<TableRow>
											<TableCell
												className='text-right'
												colSpan={3}>
												Total
											</TableCell>
											<TableCell className='text-center'>
												{formatCurrency(Number(parcelasT.valorTotal))}
											</TableCell>
										</TableRow>
									</TableFooter>
								</Table>
								<Button
									disabled={parcelasT.valorTotal == '' || !parcelasT.valorTotal}
									className='w-full mt-5'
									type='button'>
									Cadastrar <ArrowRight />{' '}
									{isPending && <Loader2 className='animate-spin' />}
								</Button>
							</div>
						)}
					</TabsContent>
				</form>
			</Form>
		</Tabs>
	);
}
