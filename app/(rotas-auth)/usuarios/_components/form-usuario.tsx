/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { FetchBuscarNovo } from '@/services/usuario/query-functions/buscar-novo';
import { AtualizarUsuario } from '@/services/usuario/server-functions/atualizar';
import { CriarUsuario } from '@/services/usuario/server-functions/criar';
import { IUsuario } from '@/types/usuario';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchemaUsuario = z.object({
	nome: z.string(),
	login: z.string(),
	email: z.string().email(),
	permissao: z.enum(['USR', 'DEV', 'ADM', 'SUP']),
	avatar: z.string().optional(),
});

const formSchema = z.object({
	login: z.string(),
});

interface FormUsuarioProps {
	isUpdating: boolean;
	user?: Partial<IUsuario>;
}

export default function FormUsuario({ isUpdating, user }: FormUsuarioProps) {
	const [isPending, startTransition] = useTransition();
	const formUsuario = useForm<z.infer<typeof formSchemaUsuario>>({
		resolver: zodResolver(formSchemaUsuario),
		defaultValues: {
			email: user?.email || '',
			login: user?.login || '',
			nome: user?.nome || '',
			permissao: user?.permissao || 'USR',
			avatar: user?.avatar || '',
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			login: '',
		},
	});

	const { data: session, update } = useSession();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const token = session?.access_token;
		if (!token) {
			toast.error('Não autorizado');
			return;
		}
		const { login } = values;
		const resp = await FetchBuscarNovo(login, token);

		if (resp.error) {
			toast.error('Algo deu errado', { description: resp.error });
		}

		if (resp.ok) {
			toast.success('Usuário encontrado', { description: resp.data.nome });
			formUsuario.setValue('nome', resp.data.nome);
			formUsuario.setValue('email', resp.data.email);
			formUsuario.setValue('login', resp.data.login);
			console.log(resp.data);
		}
	}

	async function onSubmitUser(values: z.infer<typeof formSchemaUsuario>) {
		startTransition(async () => {
			if (isUpdating && user?.id && values?.permissao) {
				const permissao = values.permissao;
				const avatar = values.avatar;

				const resp = await AtualizarUsuario(user?.id, {
					permissao: permissao,
					avatar: avatar,
				});

				if (resp.error) {
					toast.error('Algo deu errado', { description: resp.error });
				}

				if (resp.ok) {
					await update({
						...session,
						usuario: {
							...session?.usuario,
							avatar: avatar,
						},
					});

					toast.success('Usuário Atualizado', { description: resp.status });
				}
			} else {
				const { email, login, nome, permissao } = values;
				const resp = await CriarUsuario({ email, login, nome, permissao });
				if (resp.error) {
					toast.error('Algo deu errado', { description: resp.error });
				}
				if (resp.ok) {
					toast.success('Usuário Criado', { description: resp.status });
				}
				console.log(JSON.stringify(resp));
			}
		});
	}

	return (
		<>
			{!isUpdating && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className=' flex items-end gap-2 w-full mb-5'>
						<FormField
							control={form.control}
							name='login'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Login de rede</FormLabel>
									<FormControl>
										<Input
											placeholder='Login do usuário'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							disabled={form.formState.isLoading || !form.formState.isValid}
							type='submit'>
							{form.formState.isLoading || form.formState.isSubmitting ? (
								<>
									Buscar <Loader2 className='animate-spin' />
								</>
							) : (
								<>
									Buscar <ArrowRight />
								</>
							)}
						</Button>
					</form>
				</Form>
			)}

			<Form {...formUsuario}>
				<form
					onSubmit={formUsuario.handleSubmit(onSubmitUser)}
					className='space-y-4'>
					<FormField
						control={formUsuario.control}
						name='avatar'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Avatar</FormLabel>
								<FormDescription>Insira a URL do seu avatar</FormDescription>
								<FormControl>
									<Input
										placeholder='URL de avatar'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={formUsuario.control}
						name='login'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Login de rede</FormLabel>
								<FormControl>
									<Input
										disabled
										placeholder='Login do usuário'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={formUsuario.control}
						name='nome'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input
										disabled
										placeholder='Nome do usuário'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={formUsuario.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input
										disabled
										type='email'
										placeholder='E-mail do usuário'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={formUsuario.control}
						name='permissao'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Permissão</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Selecione a permissão' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='USR'>Usuário</SelectItem>
										<SelectItem value='DEV'>Desenvolvedor</SelectItem>
										<SelectItem value='ADM'>Administrador</SelectItem>
										<SelectItem value='SUP'>Super Administrador</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<div className='flex gap-2 items-center justify-end'>
						<DialogClose asChild>
							<Button variant={'outline'}>Voltar</Button>
						</DialogClose>
						<Button
							disabled={isPending}
							type='submit'>
							{isUpdating ? (
								<>
									Atualizar {isPending && <Loader2 className='animate-spin' />}
								</>
							) : (
								<>
									Adicionar {isPending && <Loader2 className='animate-spin' />}
								</>
							)}
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
