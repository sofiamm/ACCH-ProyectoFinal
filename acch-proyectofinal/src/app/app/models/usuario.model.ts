export interface Usuario {
  id?: string; // Identificador único del usuario (opcional, ya que Firebase proporciona su propio ID)
  nombre: string;
  apellido: string;
  telefono: string;
  correoElectronico: string;
  contrasena: string;
  rol: string;
  cursos_inscritos?: { id: string | undefined; nombre: string; imagen: string; }[];
  imagen?: string;
  cuentaGoogle?: boolean;
}
