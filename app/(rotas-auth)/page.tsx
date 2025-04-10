/** @format */

import { TableSkeleton } from '@/components/data-table';
import { Suspense } from 'react';
import ValorRecebidoAno from './_components/graficos/valor-recebido-ano';
import Report from './_components/report';
import ValorRecebidoPorTipo from './_components/graficos/valor-recebido-por-tipo';
import ProcessosPorTipo from './_components/graficos/processos-por-tipo';
import ProgressaoSemestralProjetada from './_components/graficos/progressao-semestral-projetada';

export default function HomeSuspense({
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	return (
		<div className='container mx-auto w-full'>
			<div className='flex flex-col gap-2 mb-5'>
				<h1 className='text-4xl font-bold'>Dashboard</h1>
				<p className='text-muted-foreground'>
					Relatório completo de processos de Outorga
				</p>
			</div>
			<div className='flex flex-col gap-5 w-full'>
				<Report />
				<div className='grid grid-cols-2 gap-5 w-full'>
					<ValorRecebidoPorTipo />
					<ProcessosPorTipo />
				</div>
				<ProgressaoSemestralProjetada />
				<ValorRecebidoAno />
			</div>
		</div>
	);
}
