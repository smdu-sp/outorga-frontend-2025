/** @format */

'use server';

import { auth } from "@/lib/auth/auth";
import { IPaginadoGrupoPermissao, IRespostaGrupoPermissao } from "@/types/grupo-permissao";

async function buscarTudo(
    pagina: number = 1,
    limite: number = 10,
    busca: string = '',
): Promise<IRespostaGrupoPermissao> {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const session = await auth();
    try {
        const permissoes = await fetch(`${baseURL}grupos-permissao/buscar-tudo?pagina=${pagina}&limite=${limite}&busca=${busca}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.access_token}`,
            },
            next: { tags: ['grupos-permissao'], revalidate: 120 },
        });
        const data = await permissoes.json();
        if (permissoes.status === 200)
            return {
                ok: true,
                error: null,
                data: data as IPaginadoGrupoPermissao,
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
            error: 'Não foi possível buscar a lista de grupos de permissão:' + error,
            data: null,
            status: 400,
        };
    }
}

export { 
    buscarTudo
};