/** @format */

export async function FetchListaCompleta(access_token: string) {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	try {
		const alvaraTipos = await fetch(`${baseURL}usuarios/lista-completa`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		});
		const data = await alvaraTipos.json();
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
