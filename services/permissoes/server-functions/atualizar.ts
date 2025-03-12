/** @format */

'use server';

import { auth } from '@/lib/auth/auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { IPermissao, IRespostaPermissao, IUpdatePermissao } from '@/types/permissao';

export async function atualizar(
	id: string,
	data: IUpdatePermissao,
): Promise<IRespostaPermissao> {
	const session = await auth();
	if (!session) redirect('/login');
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const response: Response = await fetch(`${baseURL}permissoes/atualizar/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.access_token}`,
		},
		body: JSON.stringify(data),
	});
	const dataResponse = await response.json();
	if (response.status === 200) {
		revalidateTag('permissoes');
		return {
			ok: true,
			error: null,
			data: dataResponse as IPermissao,
			status: 200,
		};
	}
	if (!dataResponse)
		return {
			ok: false,
			error: 'Erro ao atualizar permissão.',
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
