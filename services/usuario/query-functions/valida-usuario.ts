/** @format */

import { IRespostaUsuario, IUsuario } from "@/types/usuario";

export async function validaUsuario(access_token: string): Promise<IRespostaUsuario> {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	try {
		const usuario = await fetch(`${baseURL}usuarios/valida-usuario`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		});
		const data = await usuario.json();
		return {
			ok: true,
			error: null,
			data: data as IUsuario,
			status: 200,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			error: 'Não foi possível validar o usuário:' + error,
			data: null,
			status: 500,
		};
	}
}
