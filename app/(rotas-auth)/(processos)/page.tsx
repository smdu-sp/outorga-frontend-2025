import DataTable, { TableSkeleton } from '@/components/data-table';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Report from './_components/report';
import { IProcesso, IProcessosPaginado } from '@/types/processo';
import { columns } from './_components/columns';
import { buscarTudo } from '@/services/processos/query-functions/buscar-tudo';
import Pagination from '@/components/pagination';
import { Suspense } from 'react';

export default function HomeSuspense({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	return (
		<Suspense fallback={<TableSkeleton />}>
			<Home searchParams={searchParams} />
		</Suspense>
	)	
}

async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	let ok = false;
	const { busca = '' } = await searchParams;
	let dataProcessos: IProcesso[] = [];
	const response = await buscarTudo(+pagina, +limite, busca as string);
	const { data } = response;
	ok = response.ok;
	if (ok) {
		if (data) {
			const paginado = data as IProcessosPaginado;
			pagina = paginado.pagina || 1;
			limite = paginado.limite || 10;
			total = paginado.total || 0;
			dataProcessos = paginado.data || [];
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-4xl font-bold'>Processos</CardTitle>
				<CardDescription>
					Consulte todos os processos pelo número
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-10'>
				<Report />
				{dataProcessos && <DataTable
					columns={columns}
					data={dataProcessos || []}
				/>}
				{dataProcessos && dataProcessos.length > 0 && <Pagination total={+total} limite={+limite} pagina={+pagina} />}
			</CardContent>
		</Card>
	);
}
