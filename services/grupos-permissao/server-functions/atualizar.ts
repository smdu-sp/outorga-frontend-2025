/** @format */

'use server';

import { auth } from '@/lib/auth/auth';
import { IGrupoPermissao, IRespostaGrupoPermissao, IUpdateGrupoPermissao } from '@/types/grupo-permissao';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function atualizar(
	id: string,
	data: IUpdateGrupoPermissao,
): Promise<IRespostaGrupoPermissao> {
	const session = await auth();
	if (!session) redirect('/login');
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const response: Response = await fetch(`${baseURL}grupos-permissao/atualizar/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.access_token}`,
		},
		body: JSON.stringify(data),
	});
	const dataResponse = await response.json();
	if (response.status === 200) {
		revalidateTag('grupos-permissao');
		return {
			ok: true,
			error: null,
			data: dataResponse as IGrupoPermissao,
			status: 200,
		};
	}
	if (!dataResponse)
		return {
			ok: false,
			error: 'Erro ao atualizar grupo de permissão.',
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
