/** @format */

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { IProcesso } from '@/types/processo';
import React from 'react';

export default function ModalProcessos({ processo }: { processo: IProcesso }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={'outline'}
					className='w-full'>
					Ver Detalhes
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold'>
						Processo: {processo.num_processo}
					</DialogTitle>
				</DialogHeader>
				<ul className='grid grid-cols-2 gap-2'>
					<li>Código: {processo.codigo}</li>
					<li>Tipo: {processo.tipo}</li>
					<li>CPF/CNPJ: {processo.cpf_cnpj}</li>
					<li>Protocolo: {processo.protocolo_ad}</li>
				</ul>
				<ScrollArea className='max-h-80'>
					<Accordion type='multiple'>
						<AccordionItem value='item-1'>
							<AccordionTrigger className='text-lg font-semibold'>
								Parcelas
							</AccordionTrigger>
							<AccordionContent className='grid grid-cols-2 gap-5'>
								{processo && processo.parcelas && processo.parcelas.map((item, index) => {
									return (
										<ul key={index}>
											<li>Número da Parcela: {item.num_parcela}</li>
											<li>
												Status: {item.status_quitacao ? 'Ativo' : 'Inativo'}
											</li>
											<li>
												Data de Quitação:{' '}
												{item.data_quitacao
													? new Date(item.data_quitacao).toLocaleDateString()
													: 'Data não disponível'}
											</li>
											<li>
												Data de Vencimento:{' '}
												{item.data_quitacao
													? new Date(item.data_quitacao).toLocaleDateString()
													: 'Data não disponível'}
											</li>
											<li>
												Valor:{' '}
												{item.valor.toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
											</li>
											<Separator className='my-3' />
										</ul>
									);
								})}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</ScrollArea>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={'outline'}>Voltar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
