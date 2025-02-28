/** @format */

export enum ITipoProcesso {
	PDE,
	COTA,
}

export type IParcela = {
	id: string;
	num_parcela: number;
	valor: number;
	vencimento: Date;
	data_quitacao?: Date;
	ano_pagamento?: number;
	status_quitacao: boolean;
};

export type IProcesso = {
	id: string;
	tipo?: ITipoProcesso;
	codigo: string;
	num_processo: string;
	protocolo_ad: string;
	cpf_cnpj: string;
	data_entrada: Date;
	parcelas: IParcela[];
};
