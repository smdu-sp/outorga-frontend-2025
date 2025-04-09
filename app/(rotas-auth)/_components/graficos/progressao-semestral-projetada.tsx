/** @format */

'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
const chartData = [
	{ month: 'January', desktop: 186 },
	{ month: 'February', desktop: 305 },
	{ month: 'March', desktop: 237 },
	{ month: 'April', desktop: 73 },
	{ month: 'May', desktop: 209 },
	{ month: 'June', desktop: 214 },
];

const chartConfig = {
	desktop: {
		label: 'Valor Projetado',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export default function ProgressaoSemestralProjetada() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Progressão Projetada</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className='max-h-60 w-full'
					config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									hideLabel
									indicator='line'
									className='w-40'
								/>
							}
						/>
						<Bar
							dataKey='desktop'
							fill='var(--color-desktop)'
							radius={8}>
							<LabelList
								position='top'
								offset={12}
								className='fill-foreground'
								fontSize={12}
								formatter={(val: number) =>
									val.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'brl',
									})
								}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
