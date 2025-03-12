/** @format */

export enum ITipoProcesso {
	PDE,
	COTA,
}

export type IParcela = {
	id?: string;
	num_parcela: number;
	valor: number;
	vencimento: Date;
	data_quitacao?: Date;
	ano_pagamento?: number;
	status_quitacao: boolean;
	cpf_cnpj?: string;
};

export type IProcesso = {
	id?: string;
	tipo?: string;
	codigo?: string;
	num_processo: string;
	protocolo_ad?: string;
	data_entrada?: Date;
	parcelas?: IParcela[];
};

export interface IRespostaProcesso {
	ok: boolean;
	error: string | null;
	data: IProcessosPaginado | IProcesso[] | null;
	status: number;
}

export interface IProcessosPaginado {
	total: number
	pagina: number
	limite: number
	data?: IProcesso[]
}
