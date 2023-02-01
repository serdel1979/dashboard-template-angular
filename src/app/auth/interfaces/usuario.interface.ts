export interface AuthResponse {
    Ok: boolean;
    Id?: string;
    Usuario?: string;
    Email?: string;
    Claims: boolean;
    Token?: string;
    Expiracion?:string;
}

export interface Usuario {
    Id?: string;
    Usuario: string;
    Password?: string;
}

export interface RegistroUsuario {
    Usuario: string;
    Email: string;
    Password?: string;
}