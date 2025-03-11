'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth';
import { revalidateTag } from 'next/cache';
import { ICreatePermissao, IPermissao, IRespostaPermissao } from '@/types/permissao';

export async function criar(
    data: ICreatePermissao,
): Promise<IRespostaPermissao> {
    const session = await auth();
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    if (!session) redirect('/login');
    const response: Response = await fetch(`${baseURL}permissoes/criar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(data),
    });
    const dataResponse = await response.json();
    if (response.status === 201){
        revalidateTag('permissao');
        return {
            ok: true,
            error: null,
            data: dataResponse as IPermissao,
            status: 201,
    }};
    if (!dataResponse)
        return {
            ok: false,
            error: 'Erro ao criar nova permissão.',
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
