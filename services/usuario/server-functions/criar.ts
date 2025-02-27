/** @format */

'use server';

import { redirect } from 'next/navigation';
import { ICreateUsuario, IRespostaUsuario } from '../../../types/usuario';
import { auth } from '@/lib/auth/auth';

export async function CriarUsuario(
	data: ICreateUsuario,
): Promise<IRespostaUsuario> {
	const session = await auth();
	const baseURL = process.env.API_URL;

	if (!session) redirect('/login');
	const response: Response = await fetch(`${baseURL}usuarios/criar`, {
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
