/** @format */

'use server';

export async function ActionBuscarListaCadastro(
	listaSql: string[],
	access_token: string,
) {
	const baseURL = process.env.API_URL;
	const cadastros = await fetch(`${baseURL}cadastros/buscar-lista-sql`, {
		method: 'POST',
		body: JSON.stringify({ listaSql: listaSql }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${access_token}`,
		},
	});
	const dataResponse = await cadastros.json();

	if (cadastros.status === 200)
		return {
			ok: true,
			error: null,
			data: dataResponse,
			status: 200,
		};
	if (!dataResponse)
		return {
			ok: false,
			error: 'Erro ao buscar cadastros.',
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
