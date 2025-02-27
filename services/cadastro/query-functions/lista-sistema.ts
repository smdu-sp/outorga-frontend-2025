/** @format */

export async function FetchListarSistemasCadastro(access_token: string) {
	const baseURL = process.env.API_URL;
	try {
		const sistemas = await fetch(`${baseURL}cadastros/lista-sistemas`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		});

		const data = await sistemas.json();
		console.log(data);

		if (sistemas.status === 200)
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
			error: error,
			data: null,
			status: 500,
		};
	}
}
