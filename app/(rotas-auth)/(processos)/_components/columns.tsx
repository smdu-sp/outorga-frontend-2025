/** @format */

'use client';

import { IProcesso } from '@/types/processo';
import { ColumnDef } from '@tanstack/react-table';
import ModalProcessos from './modal-processos';

export const columns: ColumnDef<IProcesso>[] = [
	{
		accessorKey: 'codigo',
		header: 'Código',
	},
	{
		accessorKey: 'num_processo',
		header: 'Número do Processo',
	},
	{
		accessorKey: 'tipo',
		header: 'Tipo do Processo',
	},
	{
		accessorKey: 'cpf_cnpj',
		header: 'CPF/CNPJ',
	},
	{
		accessorKey: 'protocolo_ad',
		header: 'Protocolo',
	},
	{
		accessorKey: 'action',
		header: () => <p className='text-center'>Ações</p>,
		cell: ({ row }) => {
			return (
				<ModalProcessos
					processo={row.original}
					key={row.original.id}
				/>
			);
		},
	},
];
