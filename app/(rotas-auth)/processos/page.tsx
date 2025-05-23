/** @format */

import DataTable, { TableSkeleton } from '@/components/data-table';
import Pagination from '@/components/pagination';
import { buscarTudo } from '@/services/processos/query-functions/buscar-tudo';
import { IProcesso, IProcessosPaginado } from '@/types/processo';
import { Suspense } from 'react';
import { columns } from '../_components/columns';
import ModalFormProcessos from './_components/modal-form-processos';

export default function Processos({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	return (
		<Suspense fallback={<TableSkeleton />}>
			<Home searchParams={searchParams} />
		</Suspense>
	);
}

async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;

	const { busca = '' } = await searchParams;
	let dataProcessos: IProcesso[] = [];
	const response = await buscarTudo(+pagina, +limite, busca as string);
	const { data, ok } = response;
	const dataResponse = data as IProcessosPaginado;
	if (ok) {
		if (dataResponse) {
			pagina = dataResponse.pagina || 1;
			limite = dataResponse.limite || 10;
			total = dataResponse.total || 0;
			dataProcessos = dataResponse.data || [];
		}
	}

	return (
		<div className='container mx-auto w-full relative pb-14'>
			<div className='flex flex-col gap-2 mb-5'>
				<h1 className='text-4xl font-bold'>Processos</h1>
				<p className='text-muted-foreground'>
					Consulte todos os processos pelo número
				</p>
			</div>
			<div className='flex flex-col gap-5'>
				{dataProcessos && (
					<DataTable
						columns={columns}
						data={dataProcessos || []}
					/>
				)}

				{dataProcessos && dataProcessos.length > 0 && (
					<Pagination
						total={+total}
						limite={+limite}
						pagina={+pagina}
					/>
				)}
			</div>
			<div className='absolute right-0 -bottom-0'>
				<ModalFormProcessos />
			</div>
		</div>
	);
}
