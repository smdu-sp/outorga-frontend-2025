/** @format */

export async function FetchBuscarTudo(
	access_token: string,
	pagina: number = 1,
	limite: number = 10,
	busca: string = '',
	status: string = '',
	permissao: string = '',
) {
	const baseURL = process.env.API_URL;
	try {
		const usuarios = await fetch(`${baseURL}usuarios/buscar-tudo?pagina=${pagina}&limite=${limite}&busca=${busca}&status=${status}&permissao=${permissao}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		});
		const data = await usuarios.json();
		console.log(data);
		if (usuarios.status === 200)
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
			error: 'Não foi possível buscar a lista de usuários:' + error,
			data: null,
			status: 400,
		};
	}
}
