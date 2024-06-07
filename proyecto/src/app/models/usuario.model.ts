export interface Usuario {
    id?: string; // Identificador único del usuario (opcional, ya que Firebase proporciona su propio ID)
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
  }
  