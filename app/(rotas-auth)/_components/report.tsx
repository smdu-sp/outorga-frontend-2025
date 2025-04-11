/** @format */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const formatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
});

export default function Report({ processosTotal, totalRecebido, totalReceber }: { processosTotal?: number; totalRecebido?: number; totalReceber?: number }) {
	const data = [
		{ name: 'Total de Procesos', value: processosTotal || 0 },
		{ name: 'Valor Recebido', value: formatter.format(totalRecebido || 0) },
		{ name: 'Valor à Receber', value: formatter.format(totalReceber || 0) },
	];
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
			{data.map((item, index) => {
				return (
					<Card
						key={index}
						className='dark:bg-muted'>
						<CardHeader>
							<CardTitle className='text-xl font-bold'>{item.value}</CardTitle>
						</CardHeader>
						<CardContent>{item.name}</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
