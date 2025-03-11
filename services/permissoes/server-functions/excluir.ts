/** @format */

'use server';

import { auth } from '@/lib/auth/auth';
import { IRespostaPermissao } from '@/types/permissao';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';


async function excluir(id: string): Promise<IRespostaPermissao> {
    const session = await auth();
    if (!session) redirect('/login');
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const desativado = await fetch(`${baseURL}permissoes/excluir/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
        },
    });
    const dataResponse = await desativado.json();
    if (desativado.status === 200) {
        revalidateTag('permissoes');
        return {
            ok: true,
            error: null,
            data: dataResponse,
            status: 200,
        };
    }
    if (!dataResponse)
        return {
            ok: false,
            error: 'Erro ao desativar usuário.',
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

export { excluir };


