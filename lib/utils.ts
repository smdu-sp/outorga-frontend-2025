import { clsx, type ClassValue } from "clsx"
import { cp } from "fs";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validaCPF_CNPJ(cpf_cnpj: string) {
  const cpfs_invalidos = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'];
  const cnpjs_invalidos = ['00000000000000', '11111111111111', '22222222222222', '33333333333333', '44444444444444', '55555555555555', '66666666666666', '77777777777777', '88888888888888', '99999999999999'];
  const cpf_cnpjLimpo = cpf_cnpj.replace(/[^\d]+/g, "");
  if (cpf_cnpjLimpo.length !== 11 && cpf_cnpjLimpo.length !== 14) return false;
  if (cpf_cnpjLimpo.length === 11) {
    if (cpfs_invalidos.includes(cpf_cnpjLimpo)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) 
      soma += parseInt(cpf_cnpjLimpo[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf_cnpjLimpo[9])) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) 
      soma += parseInt(cpf_cnpjLimpo[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf_cnpjLimpo[10])) return false;
    return true; 
  }
  if (cpf_cnpjLimpo.length === 14) {
    if (cnpjs_invalidos.includes(cpf_cnpjLimpo)) return false;
    var b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ];
    for (var i = 0, n = 0; i < 12; n += +cpf_cnpjLimpo[i] * b[++i]);
    if(+cpf_cnpjLimpo[12] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
    for (var i = 0, n = 0; i <= 12; n += +cpf_cnpjLimpo[i] * b[i++]);
    if(+cpf_cnpjLimpo[13] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
    return true;
  }
  return false;
}
