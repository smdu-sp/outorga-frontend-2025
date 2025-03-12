'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth';
import { revalidateTag } from 'next/cache';
import { ICreateGrupoPermissao, IGrupoPermissao, IRespostaGrupoPermissao } from '@/types/grupo-permissao';

export async function criar(
    data: ICreateGrupoPermissao,
): Promise<IRespostaGrupoPermissao> {
    const session = await auth();
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    if (!session) redirect('/login');
    const response: Response = await fetch(`${baseURL}grupos-permissao/criar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(data),
    });
    const dataResponse = await response.json();
    if (response.status === 201){
        revalidateTag('grupos-permissao');
        return {
            ok: true,
            error: null,
            data: dataResponse as IGrupoPermissao,
            status: 201,
    }};
    if (!dataResponse)
        return {
            ok: false,
            error: 'Erro ao criar novo grupo de permissão.',
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
