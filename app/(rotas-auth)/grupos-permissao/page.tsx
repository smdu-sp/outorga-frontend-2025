/** @format */

import DataTable, { TableSkeleton } from '@/components/data-table';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { columns } from './_components/columns';
import Pagination from '@/components/pagination';
import { Suspense } from 'react';
import { auth } from '@/lib/auth/auth';
import * as gruposPermissao from '@/services/grupos-permissao';
import { IPaginadoPermissoes, IPermissao } from '@/types/permissao';
import ModalUpdateAndCreate from './_components/modal-update-create';
import { IGrupoPermissao, IPaginadoGrupoPermissao } from '@/types/grupo-permissao';

export default function UsuariosSuspense({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	return (
		<Suspense fallback={<TableSkeleton />}>
			<Permissoes searchParams={searchParams} />
		</Suspense>
	);
}

async function Permissoes({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	let ok = false;
	const { busca = '' } = await searchParams;
	let dados: IGrupoPermissao[] = [];
	const session = await auth();
	if (session && session.access_token) {
		const response = await gruposPermissao.buscarTudo(
			+pagina,
			+limite,
			busca as string,
		);
		const { data } = response;
		ok = response.ok;
		if (ok) {
			if (data) {
				const paginado = data as IPaginadoGrupoPermissao;
				pagina = paginado.pagina || 1;
				limite = paginado.limite || 10;
				total = paginado.total || 0;
				dados = paginado.data || [];
			}
			const paginado = data as IPaginadoGrupoPermissao;
			dados = paginado.data || [];
		}
	}

	return ([
		<div className='max-w-7xl w-full relative h-full'>
			<Card>
				<CardHeader>
					<CardTitle className='text-4xl font-bold'>Grupos de Permissão</CardTitle>
					<CardDescription>
						Gerenciamento e consulta de grupos de permissão
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-10'>
					{dados && (
						<DataTable
							columns={columns}
							data={dados || []}
						/>
					)}
					{dados && dados.length > 0 && (
						<Pagination
							total={+total}
							limite={+limite}
							pagina={+pagina}
						/>
					)}
				</CardContent>
			</Card>
		</div>,
		<div className='absolute bottom-4 right-4 hover:scale-110'>
			<ModalUpdateAndCreate isUpdating={false} />
		</div>
	]);
}
