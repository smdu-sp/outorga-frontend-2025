/** @format */

'use client';

import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from 'recharts';

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
		label: 'Valor Recebido',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export default function ValorRecebidoAno() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Valor Recebido</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className='max-h-60 w-full'
					config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 28,
							right: 28,
							top: 20,
						}}>
						<CartesianGrid vertical={false} />
						<defs>
							<linearGradient
								id='fillDesktop'
								x1='0'
								y1='0'
								x2='0'
								y2='1'>
								<stop
									offset='5%'
									stopColor='var(--color-desktop)'
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor='var(--color-desktop)'
									stopOpacity={0.2}
								/>
							</linearGradient>
						</defs>
						<XAxis
							dataKey='month'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									indicator='line'
									className='w-40'
								/>
							}
						/>

						<Area
							dataKey='desktop'
							type='natural'
							fill='url(#fillDesktop)'
							fillOpacity={0.4}
							stroke='var(--color-desktop)'>
							<LabelList
								position='top'
								offset={8}
								className='fill-foreground'
								fontSize={10}
								formatter={(val: number) =>
									val.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'brl',
									})
								}
							/>
						</Area>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
