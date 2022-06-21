export interface UsuarioResponse{
    ok: Boolean,
    msg: String,
    data?: Usuario[]
}
export interface Usuario {
    nombre: String,
    paterno: String,
    materno: String,
    correo: String,
    rol: String,
    estado: Boolean,
    google: Boolean,
    aud_estado: Number,
    aud_fecha: Date,
    aud_usuario: String,
    uid: String
}