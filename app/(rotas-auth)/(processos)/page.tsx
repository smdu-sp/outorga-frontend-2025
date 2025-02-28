/** @format */

import DataTable, { TableSkeleton } from '@/components/data-table';
// import { auth } from '@/lib/auth/auth';
// import { FetchBuscarTudoCadastro } from '@/services/cadastro/query-functions/buscar-tudo';
import { IProcesso } from '@/types/processo';
import { Suspense } from 'react';
import { columns } from './_components/columns';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Report from './_components/report';
import processos from './mock/processos-data';

export default async function HomeSuspense() {
	return (
		<Suspense fallback={<TableSkeleton />}>
			<Home />
		</Suspense>
	);
}

export async function Home() {
	const data: IProcesso[] = processos;
	// const session = await auth();
	// if (session && session.access_token) {
	// 	const response = await FetchBuscarTudoCadastro(session?.access_token || '');
	// 	if (response && response.data && response.data.data)
	// 		data = response.data.data;
	// }

	return (
		<Card className='mt-10'>
			<CardHeader>
				<CardTitle className='text-4xl font-bold'>Processos</CardTitle>
				<CardDescription>
					Consulte todos os processos pelo número
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-10'>
				<Report />
				<DataTable
					columns={columns}
					data={data || []}
				/>
			</CardContent>
		</Card>
	);
}
