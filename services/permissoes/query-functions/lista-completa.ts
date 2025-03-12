/** @format */

'use server';

import { auth } from "@/lib/auth/auth";
import { IPermissao, IRespostaPermissao } from "@/types/permissao";

async function listaCompleta(): Promise<IRespostaPermissao> {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const session = await auth();
    try {
        const permissoes = await fetch(`${baseURL}permissoes/lista-completa`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.access_token}`,
            },
            next: { tags: ['permissoes'], revalidate: 120 },
        });
        const data = await permissoes.json();
        if (permissoes.status === 200)
            return {
                ok: true,
                error: null,
                data: data as IPermissao[],
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
            error: 'Não foi possível buscar a lista de permissões:' + error,
            data: null,
            status: 400,
        };
    }
}

export { 
    listaCompleta
};