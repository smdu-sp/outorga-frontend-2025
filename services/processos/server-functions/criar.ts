/** @format */

'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth';
import { IProcesso } from '@/app/(rotas-auth)/importacao/_components/form-importacao';

interface IRespostaProcesso {
	ok: boolean;
	error: string | null;
	data: IProcesso[] | null;
	status: number;
}

export async function CriarProcessos(
	data: IProcesso[],
): Promise<IRespostaProcesso> {
	const session = await auth();
	const baseURL = process.env.API_URL;

	if (!session) redirect('/login');
	const response: Response = await fetch(`${baseURL}processos/criar`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.access_token}`,
		},
		body: JSON.stringify(data),
	});
	const dataResponse = await response.json();
	if (response.status === 201)
		return {
			ok: true,
			error: null,
			data: dataResponse,
			status: 201,
		};
	if (!dataResponse)
		return {
			ok: false,
			error: 'Erro ao criar novo usuário.',
			data: null,
			status: 500,
		};
	return {
		ok: false,
		error: dataResponse.message,
		data: null,
		status: dataResponse.statusCode,
	};
}
