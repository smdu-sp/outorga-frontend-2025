/** @format */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

export default function Report() {
	const data = [
		{ name: 'Total de Procesos', value: 3.958 },
		{ name: 'Valor Recebido', value: 'R$35.184.894,00' },
		{ name: 'Valor à Receber', value: 'R$95.632.547,00' },
		{ name: 'resolver', value: 0 },
	];
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
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
