import DataTable, { TableSkeleton } from "@/components/data-table";
import { auth } from "@/lib/auth/auth";
import { FetchBuscarTudo } from "@/services/usuario/query-functions/buscar-tudo";
import { columns } from "./_components/columns";
import { Suspense } from "react";
import { ICadastros } from "@/types/cadastro";
import { IUsuario } from "@/types/usuario";

export default async function UsuariosSuspense() {
  return <Suspense fallback={<TableSkeleton />}><Usuarios /></Suspense>
}

export async function Usuarios() {
  var data: IUsuario[] = [];
  const session = await auth();
  if (session && session.access_token) {
    const response = await FetchBuscarTudo(session?.access_token || '');
    if (response && response.data && response.data.data) data = response.data.data;
  }

  return <DataTable columns={columns} data={data || []} />
}
