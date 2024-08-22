import { Comentario } from "./comentario.model";

export interface Video {
    id?: string;
    duracion: string;
    url: string;
    comentarios: Comentario[];
    descripcion: string;
}