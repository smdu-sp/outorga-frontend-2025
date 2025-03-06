/** @format */

'use server';

import { auth } from "@/lib/auth/auth";


export interface IProcessosPaginado {
    total: number
    pagina: number
    limite: number
    data?: IProcesso[]
}

export interface IProcesso {
    id: string
    tipo?: ['PDE', 'COTA']
    codigo?: string
    num_processo: string
    protocolo_ad?: string
    cpf_cnpj?: string
    data_entrada?: Date
    parcelas?: IParcela[]
}

export interface IParcela {
    id: string
    num_parcela: number
    valor: number
    vencimento: Date
    data_quitacao?: Date
    ano_pagamento?: number
    status_quitacao: boolean
    processo_id: string
}

export interface IRespostaProcesso {
    ok: boolean;
    error: string | null;
    data: IProcessosPaginado | null;
    status: number;
}

export async function buscarTudo(

	pagina: number = 1,
	limite: number = 10,
	busca: string = '',
): Promise<IRespostaProcesso> {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const session = await auth();
	try {
		const processos = await fetch(`${baseURL}processos/buscar-tudo?pagina=${pagina}&limite=${limite}&busca=${busca}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session?.access_token}`,
			},
		});
		const data = await processos.json();
		if (processos.status === 200)
			return {
				ok: true,
				error: null,
				data: data,
				status: 200,
			};
		return {
			ok: false,
			error: data.message,
			data: null,
			status: data.statusCode,
		};
	} catch (error) {
		return {
			ok: false,
			error: 'Não foi possível buscar a lista de processos:' + error,
			data: null,
			status: 400,
		};
	}
}
