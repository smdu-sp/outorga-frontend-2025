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
import { IPaginadoUsuario, IUsuario } from '@/types/usuario';
import { auth } from '@/lib/auth/auth';
import * as usuario from '@/services/usuario';
import ModalUpdateAndCreate from './_components/modal-update-create';

export default function UsuariosSuspense({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	return (
		<Suspense fallback={<TableSkeleton />}>
			<Usuarios searchParams={searchParams} />
		</Suspense>
	);
}

async function Usuarios({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	let ok = false;
	const { busca = '' } = await searchParams;
	let dados: IUsuario[] = [];
	const session = await auth();
	if (session && session.access_token) {
		const response = await usuario.buscarTudo(
			session.access_token || '',
			+pagina,
			+limite,
			busca as string,
		);
		const { data } = response;
		ok = response.ok;
		if (ok) {
			if (data) {
				const paginado = data as IPaginadoUsuario;
				pagina = paginado.pagina || 1;
				limite = paginado.limite || 10;
				total = paginado.total || 0;
				dados = paginado.data || [];
			}
			const paginado = data as IPaginadoUsuario;
			dados = paginado.data || [];
		}
	}

	return ([
		<div className='max-w-7xl w-full relative h-full'>
			<Card>
				<CardHeader>
					<CardTitle className='text-4xl font-bold'>Usuários</CardTitle>
					<CardDescription>
						Gerenciamento e consulta de usuários
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
		<div className='absolute bottom-5 right-5 hover:scale-110'>
			<ModalUpdateAndCreate isUpdating={false} />
		</div>
	]);
}
