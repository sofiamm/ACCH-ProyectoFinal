import { Usuario } from "./usuario.model";
import { Video } from "./video.model";

export interface Curso {
  id?: string;
  nombre: string;
  descripcion: string;
  evaluacion: string;
  imagen: string;
  instructor?: Usuario;
  videos?: Video[];
}
