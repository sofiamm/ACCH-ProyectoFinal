import { Usuario } from '../models/usuario.model';
import { Curso } from '../models/curso.model';

export class Validaciones {
    validarTelefono(telefono: string) {
        return /[0-9]{8}/gm.exec(telefono) && telefono.length == 8;
    }

    validarMultipleStrings(valor: string) {
        return /[a-zA-Z]{2,}\s[a-zA-Z]{2,}/gm.exec(valor);
    }

    validarCorreo(correo: string) {
        return /^\S+@\S+\.\S+$/gm.exec(correo);
    }

    validarDatosUsuario(usuario: Usuario) {
        if (usuario.nombre == null || usuario.nombre == '') {
            return 'El nombre no es valido';
        } else if (usuario.apellido == null || usuario.apellido == '' || !this.validarMultipleStrings(usuario.apellido)) {
            return 'El apellido no es valido';
        } else if (usuario.telefono == null || usuario.telefono == '' || !this.validarTelefono(usuario.telefono)) {
            return 'El teléfono no es valido';
        } else if (usuario.correoElectronico == null || usuario.correoElectronico == '' || !this.validarCorreo(usuario.correoElectronico)) {
            return 'El correo electrónico no es valido';
        } else if (usuario.contrasena.length == null || usuario.contrasena == '') {
            return 'La contraseña no es valido';
        } else if (usuario.rol == null || usuario.rol == '') {
            return 'El rol no es valido';
        }
        return '';
    }

    validarDatosCurso(curso: Curso) {
        if (curso.nombre == null || curso.nombre == '') {
            return 'El nombre no es valido';
        } else if (curso.descripcion == null || curso.descripcion == '' || !this.validarMultipleStrings(curso.descripcion)) {
            return 'La descripción no es valida';
        } else if (curso.evaluacion == null || curso.evaluacion == '') {
            return 'La evaluación no es valida';
        }
        return '';
    }
}