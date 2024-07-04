import { Usuario } from "./usuario.model";

export interface Curso {
    id?: string;
    nombre: string;
    descripcion: string;
    evaluacion: string;
    imagen: string;
    instructor?: Usuario;
  }
  