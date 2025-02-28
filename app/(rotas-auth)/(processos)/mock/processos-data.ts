/** @format */

import { IProcesso, ITipoProcesso } from '@/types/processo';

const processos: IProcesso[] = Array.from({ length: 25 }, (_, i) => ({
	id: `proc_${i + 1}`,
	tipo: i % 2 === 0 ? ITipoProcesso.PDE : ITipoProcesso.COTA,
	codigo: `COD-${i + 1}`,
	num_processo: `NP-${1000 + i}`,
	protocolo_ad: `PROTO-${2000 + i}`,
	cpf_cnpj: `000.000.000-0${i % 10}`,
	data_entrada: new Date(2024, 0, i + 1),
	parcelas: Array.from(
		{ length: Math.floor(Math.random() * 5) + 1 },
		(_, j) => ({
			id: `parc_${i + 1}_${j + 1}`,
			num_parcela: j + 1,
			valor: Math.random() * 1000 + 100,
			vencimento: new Date(),
			data_quitacao: new Date(),
			ano_pagamento: Math.random() > 0.5 ? 2024 : undefined,
			status_quitacao: Math.random() > 0.5 ? true : false,
		}),
	),
}));

export default processos;
