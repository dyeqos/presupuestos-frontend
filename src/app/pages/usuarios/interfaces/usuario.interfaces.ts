export interface UsuarioResponse{
    ok: boolean,
    msg: string,
    data?: Usuario[]
}
export interface PerfilResponse{
    ok: boolean,
    msg: string,
    data?: Usuario
}
export interface Usuario {
    nombre: string,
    paterno: string,
    materno: string,
    correo: string,
    rol: Rol,
    estado?: boolean,
    google?: boolean,
    password?: string,
    uid?: string
}

interface Rol{
    _id: string,
    nombre: string
}