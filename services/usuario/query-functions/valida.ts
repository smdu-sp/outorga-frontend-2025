/** @format */

export async function FetchValidaUsuario(access_token: string) {
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
			data: data,
			status: 200,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			error: error,
			data: null,
			status: 500,
		};
	}
}
