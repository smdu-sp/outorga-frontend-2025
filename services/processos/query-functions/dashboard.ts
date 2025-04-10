/** @format */

'use server';

import { auth } from '@/lib/auth/auth';
import { IRespostaProcesso } from '@/types/processo';

export async function dashboard(): Promise<IRespostaProcesso> {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const session = await auth();
    try {
        const processos = await fetch(
            `${baseURL}processos/dashboard`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.access_token}`,
                },
            },
        );
        const data = await processos.json();

        if (processos.status === 200)
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
            error: 'Não foi possível buscar o dashboard:' + error,
            data: null,
            status: 400,
        };
    }
}
