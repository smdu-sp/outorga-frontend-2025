'use client';

import { ICadastros } from '@/types/cadastro';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ICadastros>[] = [
    {
        accessorKey: 'sql_incra',
        header: 'SQL/INCRA',
    },
    {
        accessorKey: 'tipoSql_incra',
        header: 'Tipo',
    },
    {
        accessorKey: 'sistema',
        header: 'Sistema',
    },
    {
        accessorKey: 'protocolo',
        header: 'Protocolo',
    },
    {
        accessorKey: 'assunto.dtInclusaoAssunto',
        header: () => <p className="text-right">Data Inclusão</p>,
        cell: ({ row }) => <p className="text-right">{row.original.assunto?.dtInclusaoAssunto ? new Date(row.original.assunto?.dtInclusaoAssunto).toLocaleDateString() : ''}</p>
    }
];