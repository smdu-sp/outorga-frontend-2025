'use client'

import { Input } from "@/components/ui/input";
import { z } from "zod";
import * as xlsx from "xlsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { CriarProcessos } from "@/services/processos/server-functions/criar";

const formSchema = z.object({
    tipo: z.enum(["AD", "SEI"], { required_error: "Selecione um tipo de documento." }),
});


export interface IProcesso {
    id?: string
    tipo?: string
    codigo?: string
    num_processo: string
    protocolo_ad?: string
    cpf_cnpj?: string
    data_entrada: Date
    parcelas: IParcela[]
}

export interface IParcela {
    id?: string
    num_parcela: number
    valor: number
    vencimento: Date
    data_quitacao?: Date
    ano_pagamento?: number
    status_quitacao: boolean
}

export default function FormImportacao() {
    const [arquivo, setArquivo] = useState<File | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tipo: "AD",
        },
    });

    async function onSubmit({ tipo }: z.infer<typeof formSchema>) {
        if (!arquivo) toast("Selecione um arquivo válido!");
        console.log(typeof arquivo);
        if (arquivo) enviarArquivo(arquivo, tipo);
    }

    function enviarArquivo(arquivo: File, tipo: string): void {
        if (!arquivo) return alert("Suba um arquivo válido!");
            const reader = new FileReader();
            reader.readAsArrayBuffer(arquivo);
            reader.onload = (e) => {
                if (e.target){
                    const data = e.target?.result;
                    const wb = xlsx.read(data);
                    switch (tipo) {
                        case "AD":
                            planilhaAD(wb)
                            break;
                        case "SEI":
                            planilhaSEI(wb)
                            break;
                    }
                }
        };
    }

    async function planilhaAD(wb: xlsx.WorkBook) {
        const emPagamentoDPD = wb.Sheets[wb.SheetNames[1]];
        const quitadoDPD = wb.Sheets[wb.SheetNames[2]];
        const quebraDPD = wb.Sheets[wb.SheetNames[3]];
        const linhasEmPagamentoDPD = xlsx.utils.sheet_to_json(emPagamentoDPD, { header: 1 });
        const linhasQuitadoDPD = xlsx.utils.sheet_to_json(quitadoDPD, { header: 1 });
        const linhasQuebraDPD = xlsx.utils.sheet_to_json(quebraDPD, { header: 1 });
        if (linhasEmPagamentoDPD.length <= 0) toast("Lista vazia.");
        var processos: IProcesso[] = [];
        var processo: IProcesso | undefined;
        for (const index in linhasEmPagamentoDPD) {
            // if (+index > 0) {
            //     const linhaParcela: any = linhasEmPagamentoDPD[index];

            //     const tipo = linhaParcela[1] ? linhaParcela[1] === "PDE" ? "PDE" : "COTA" : undefined;
            //     const data_entrada = linhaParcela[0] ? new Date(Date.UTC(0, 0, linhaParcela[0])) : undefined;
            //     const protocolo_ad = linhaParcela[2] || undefined;
            //     const num_processo = linhaParcela[3] || undefined;
            //     const cpf_cnpj = linhaParcela[4] || undefined;

            //     const num_parcela = +linhaParcela[5];
            //     const status_quitacao = linhaParcela[9] === "Pago";
            //     const valor = typeof linhaParcela[7] === "string" ? +linhaParcela[7].replace(".", "").replace(",", ".").replace("R$", "").trim() : linhaParcela[7];
            //     const vencimento = new Date(Date.UTC(0, 0, linhaParcela[6]));
            //     const ano_pagamento = (linhaParcela[8] && linhaParcela[8] !== "") ? +linhaParcela[8] : undefined;

            //     if (num_parcela === 1 && data_entrada) {
            //         if (processo) processos.push(processo);
            //         processo = { tipo, data_entrada, protocolo_ad, num_processo, cpf_cnpj, parcelas: [] }
            //     }
            //     if (processo && num_parcela && valor) processo.parcelas?.push({ num_parcela, status_quitacao, valor: valor || 0, vencimento, ano_pagamento });
            // }
        }
        processo = undefined;
        for (const linha of linhasQuitadoDPD) {
            // const linhaParcela: any = linha;

            // const tipo = linhaParcela[1] ? linhaParcela[1] === "PDE" ? "PDE" : "COTA" : undefined;
            // const data_entrada = linhaParcela[0] ? new Date(Date.UTC(0, 0, linhaParcela[0])) : undefined;
            // const protocolo_ad = linhaParcela[2] || undefined;
            // const num_processo = linhaParcela[3] || undefined;
            // const cpf_cnpj = linhaParcela[4] || undefined;

            // const num_parcela = +linhaParcela[5];
            // const status_quitacao = linhaParcela[9] === "Pago" || linhaParcela[9] === "Quitado";
            // const valor = typeof linhaParcela[7] === "string" ? +linhaParcela[7].replace(".", "").replace(",", ".").replace("R$", "").trim() : linhaParcela[7];
            // const vencimento = new Date(Date.UTC(0, 0, linhaParcela[6]));
            // const ano_pagamento = vencimento ? vencimento.getFullYear() : undefined;

            // if (num_parcela === 1 && data_entrada) {
            //     if (processo) processos.push(processo);
            //     processo = { tipo, data_entrada, protocolo_ad, num_processo, cpf_cnpj, parcelas: [] }
            // }
            // if (processo && num_parcela && valor) processo.parcelas?.push({ num_parcela, status_quitacao, valor: valor || 0, vencimento, ano_pagamento });            
        }
        processo = undefined;
        for (const linha of linhasQuebraDPD) {
            const linhaParcela: any = linha;
            // console.log(linhaParcela);

            const data_entrada = linhaParcela[0] ? new Date(Date.UTC(0, 0, linhaParcela[0])) : undefined;
            const tipo = linhaParcela[1] ? linhaParcela[1] === "PDE" ? "PDE" : "COTA" : undefined;
            const protocolo_ad = linhaParcela[2] || undefined;
            const num_processo = linhaParcela[3] || undefined;
            const cpf_cnpj = linhaParcela[4] || undefined;

            const num_parcela = +linhaParcela[5];
            const vencimento = new Date(Date.UTC(0, 0, linhaParcela[6]));
            const valor = typeof linhaParcela[7] === "string" ? +linhaParcela[7].replace(".", "").replace(",", ".").replace("R$", "").trim() : linhaParcela[7];
            const ano_pagamento = linhaParcela[8] && linhaParcela[8] !== "" && linhaParcela[8] !== "N" && linhaParcela[8] !== "S" ? +linhaParcela[8] : vencimento ? vencimento.getFullYear() : undefined;
            const status_quitacao = (linhaParcela[9] && linhaParcela[9] !== "") ? linhaParcela[9].trim() === "Pago" || linhaParcela[9].trim() === "Quitado" : false;

            if (num_parcela === 1 && data_entrada) {
                if (processo) processos.push(processo);
                processo = { tipo, data_entrada, protocolo_ad, num_processo, cpf_cnpj, parcelas: [] }
            }
            if (processo && num_parcela && valor) processo.parcelas?.push({ num_parcela, status_quitacao, valor: valor || 0, vencimento, ano_pagamento });            
        }
        console.log(processos);
        if (processos.length > 0) {
            // console.log(processos);
            const { ok, error, data, status } = await CriarProcessos(processos);
            console.log({ ok, error, data, status });
        }
        // console.log(linhasEmPagamentoDPD);
    }

    function planilhaSEI(wb: xlsx.WorkBook) {
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const linhas = xlsx.utils.sheet_to_json(ws, { header: 1 });
        if (linhas.length <= 0) toast("Lista vazia.");
        console.log(linhas);
    }

    return <>
        <Form {...form}>
			<form
				className='p-6 md:p-8 dark:bg-muted bg-background rounded-lg'
				onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-6'>
					<div className='grid gap-2'>
						<FormField
							control={form.control}
							name='tipo'
							render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
											    className='dark:bg-background bg-muted'
                                            >
                                                <SelectValue placeholder="Tipo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="AD">Aprova Digital</SelectItem>
                                            <SelectItem value="SEI">SEI/Físico</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
							)}
						/>
					</div>
					<div className='grid gap-2'>
                        <FormItem>
                            <FormLabel>Arquivo</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    multiple={false}
                                    accept=".csv, .xls, .xlsx, .xlsm"
                                    className='dark:bg-background bg-muted'
                                    onChange={(event) => {
                                        if (event.target.files) {
                                            console.log()
                                            setArquivo(event.target.files[0]);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
					</div>
					<Button
						type='submit'
						className='w-full'>
						Enviar
					</Button>
				</div>
			</form>
		</Form>
    </>
}