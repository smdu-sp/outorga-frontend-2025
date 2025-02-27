'use client';

import { IUsuario } from '@/types/usuario';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IUsuario>[] = [
    {
        accessorKey: 'nome',
        header: 'Nome',
    },
    {
        accessorKey: 'login',
        header: 'Usuário',
    },
    {
        accessorKey: 'email',
        header: 'E-mail',
    },
    {
        accessorKey: 'permissao',
        header: 'Permissão',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
];