/** @format */

export async function FetchBuscarTudoCadastro(
	access_token: string,
	pagina: number = 1,
	limite: number = 10,
	busca: string = '',
	sistema: string = '',
) {
	const baseURL = process.env.API_URL;
	try {
		const cadastros = await fetch(
			`${baseURL}cadastros/buscar-tudo?pagina=${pagina}&limite=${limite}&busca=${busca}&sistema=${sistema}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`,
				},
			},
		);
		const data = await cadastros.json();
		if (cadastros.status === 200)
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
