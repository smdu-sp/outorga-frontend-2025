/** @format */
'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { DesativarUsuario } from '@/services/usuario/server-functions/desativar';
import { Loader2, UserRoundX } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function ModalDelete({ id }: { id: string }) {
	const [isPending, startTransition] = useTransition();

	async function handleDelete(id: string) {
		const resp = await DesativarUsuario(id);
		if (!resp.ok) {
			console.log(resp);
			toast.error('Algo deu errado', { description: resp.error });
		} else {
			toast.success('Usuário Deletado com sucesso', {
				description: resp.status,
			});
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'icon'}
					variant={'outline'}
					className='hover:bg-destructive  cursor-pointer hover:text-white group transition-all ease-linear duration-200'>
					<UserRoundX
						size={24}
						className='text-destructive dark:text-white group-hover:text-white group'
					/>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Excluir Usuário</DialogTitle>
				</DialogHeader>
				<p>Tem certeza que deseja remover esse usuário?</p>
				<DialogFooter>
					<div className='flex gap-2'>
						<DialogClose asChild>
							<Button variant={'outline'}>Voltar</Button>
						</DialogClose>
						<Button
							disabled={isPending}
							onClick={() =>
								startTransition(() => {
									handleDelete(id);
								})
							}
							type='submit'
							variant={'destructive'}>
							{isPending ? (
								<>
									Deletar <Loader2 className='animate-spin' />
								</>
							) : (
								<>Deletar</>
							)}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
