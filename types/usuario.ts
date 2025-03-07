/** @format */

export interface IUsuario {
	id: string;
	nome: string;
	login: string;
	email: string;
	permissao: 'USR' | 'DEV' | 'ADM' | 'SUP';
	avatar?: string;
	status: boolean;
	ultimologin: Date;
	criadoEm: Date;
	atualizadoEm?: Date;
}

export interface ICreateUsuario {
	nome: string;
	email: string;
	login: string;
	permissao: 'USR' | 'DEV' | 'ADM' | 'SUP';
}

export interface IUpdateUsuario {
	id?: string;
	permissao?: 'USR' | 'DEV' | 'ADM' | 'SUP';
	status?: boolean;
}

export interface IPaginadoUsuario {
	data: IUsuario[];
	total: number;
	pagina: number;
	limite: number;
}

export interface IRespostaUsuario {
	ok: boolean;
	error: string | null;
	data: IUsuario | IPaginadoUsuario | null;
	status: number;
}

export interface IUsuarioSession {
	sub: string
	nome: string
	login: string
	email: string
	permissao: string
	status: number,
	avatar?: string
	iat: number,
	exp: number
}
