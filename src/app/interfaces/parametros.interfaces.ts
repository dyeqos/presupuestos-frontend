export interface parametroResponse {
    ok: boolean,
    msg: string,
    data?: parametro[]
}

export interface parametro {
    uid: string,
    tipo: string,
    nombre: string
}