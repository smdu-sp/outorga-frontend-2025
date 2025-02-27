import DataTable, { TableSkeleton } from "@/components/data-table";
import { columns } from "./_components/columns";
import { ICadastros } from "@/types/cadastro";
import { FetchBuscarTudoCadastro } from "@/services/cadastro/query-functions/buscar-tudo";
import { auth } from "@/lib/auth/auth";
import { Suspense } from "react";

export default async function HomeSuspense() {
  return <Suspense fallback={<TableSkeleton />}><Home /></Suspense>
}

export async function Home() {
  var data: ICadastros[] = [];
  const session = await auth();
  if (session && session.access_token) {
    const response = await FetchBuscarTudoCadastro(session?.access_token || '');
    if (response && response.data && response.data.data) data = response.data.data;
  }

  return <DataTable columns={columns} data={data || []} />
}