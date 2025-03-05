'use client'

import DataTable from '@/components/data-table';
import { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Report from './_components/report';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IProcesso } from '@/types/processo';
import { columns } from './_components/columns';
import { buscarTudo, IProcessosPaginado } from '@/services/processos/query-functions/buscar-tudo';
import { toast } from 'sonner';
import Pagination from '@/components/pagination';

export default function Home() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [dataProcessos, setDataProcessos] = useState<IProcesso[]>([]);

	function atualizaParametros(pagina: number, limite: number, busca: string, total: number) {
		const params = new URLSearchParams(searchParams.toString())
		params.set('busca', busca);
		params.set('pagina', String(pagina));
		params.set('limite', String(limite));
		params.set('total', String(total));
		router.push(pathname + '?' + params.toString());
	}

	function retornaData() {
		const busca = searchParams.get('busca') || '';
		const pagina = +(searchParams.get('pagina') || 1);
		const limite = +(searchParams.get('limite') || 10);
		buscarTudo('', pagina, limite, busca).then(({ ok, error, data }) => {
			if (!ok) toast.error(error || 'Ocorreu um erro ao buscar os processos.');
			if (ok) {
				const { limite, pagina, total, data: processos } = data as IProcessosPaginado;
				atualizaParametros(pagina, limite, busca, total);
				setDataProcessos(processos || []);
				console.log(processos);
			}
		})
	}

	useEffect(() => {
		retornaData();
	}, [searchParams]);

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
				<DataTable
					columns={columns}
					data={dataProcessos || []}
				/>
				<Pagination />
			</CardContent>
		</Card>
	);
}
