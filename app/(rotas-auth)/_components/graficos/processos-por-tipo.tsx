/** @format */

'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

export default function ProcessosPorTipo({ quantidadeTipo }: { quantidadeTipo?: { label: string; value: number }[] }) {
	const chartConfig = {
		value: {
			label: 'Quantidade de Processos por Receita',
			color: 'hsl(var(--chart-1))',
		},
	} satisfies ChartConfig;
	const chartData = quantidadeTipo ? 
		quantidadeTipo.map((item, index) => ({ label: item.label, value: item.value, fill: `hsl(var(--chart-${index + 1}))` })) : [];
	const total = quantidadeTipo?.reduce((acc, item) => acc + item.value, 0) || 0;
	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Processos por tipo de receita (PDE/COTA)</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[250px]'>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey='value'
							nameKey='label'
							innerRadius={70}
							outerRadius={100}
							strokeWidth={5}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor='middle'
												dominantBaseline='middle'>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className='fill-foreground text-3xl font-bold'>
													{total.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className='fill-muted-foreground'>
													Processos
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
