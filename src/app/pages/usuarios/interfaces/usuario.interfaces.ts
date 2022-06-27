export interface UsuarioResponse{
    ok: boolean,
    msg: string,
    data?: Usuario[]
}
export interface Usuario {
    nombre: string,
    paterno: string,
    materno: string,
    correo: string,
    rol: Rol,
    estado: boolean,
    google: boolean,
    password: string,
    aud_estado: Number,
    aud_fecha: Date,
    aud_usuario: string,
    uid: string
}

interface Rol{
    _id: string,
    nombre: string
}