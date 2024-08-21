import { Usuario } from '../models/usuario.model';
import { Curso } from '../models/curso.model';
import { UsuarioService } from '../services/usuario.service';
import { CursoService } from '../services/curso.service';
import { Recibo } from '../models/recibo.model';

export class Validaciones {
    validarTelefono(telefono: string) {
        return /[0-9]{8}/gm.exec(telefono) && telefono.length == 8;
    }

    validarComprobante(id: string) {
        return /[0-9]{5,}/gm.exec(id);
    }

    validarMultipleStrings(valor: string) {
        return /[a-zA-Z]{2,}\s[a-zA-Z]{2,}/gm.exec(valor);
    }

    validarCorreo(correo: string) {
        return /^\S+@\S+\.\S+$/gm.exec(correo);
    }

    validarDatosUsuario(usuario: Usuario) {
        if (usuario.nombre == null || usuario.nombre == '') {
            return 'El nombre no es válido';
        } else if (usuario.apellido == null || usuario.apellido == '' || !this.validarMultipleStrings(usuario.apellido)) {
            return 'Debe incluir los dos apellidos';
        } else if (usuario.telefono == null || usuario.telefono == '' || !this.validarTelefono(usuario.telefono)) {
            return 'El teléfono no cumple con el formato correcto';
        } else if (usuario.correoElectronico == null || usuario.correoElectronico == '' || !this.validarCorreo(usuario.correoElectronico)) {
            return 'El correo electrónico no es válido';
        } else if (!usuario.cuentaGoogle && usuario.contrasena == null || usuario.contrasena == '') {
            return 'La contraseña no cumple con al menos 8 caracteres';
        } else if (usuario.rol == null || usuario.rol == '') {
            return 'El rol no es válido';
        }
        return '';
    }

    validarDatosCurso(curso: Curso) {
        if (curso.nombre == null || curso.nombre == '') {
            return 'El nombre no es válido';
        } else if (curso.descripcion == null || curso.descripcion == '' || !this.validarMultipleStrings(curso.descripcion)) {
            return 'La descripción no es valida';
        } else if (curso.evaluacion == null || curso.evaluacion == '') {
            return 'La evaluación no es valida';
        } else if (curso.precio == null || typeof curso.precio == 'undefined' || curso.precio < 0) {
            return 'El precio no es válido';
        }
        return '';
    }

    validarPago(invoice: Recibo) {
        if (invoice.usrTelefono == null || invoice.usrTelefono == '') {
            return 'Por favor, ingresar el número de teléfono que realizó el sinpe';
        } else if (!this.validarTelefono(invoice.usrTelefono)) {
            return 'El número de teléfono no tiene un formato válido';
        } else if (invoice.id == null || invoice.id == '') {
            return 'Por favor, ingresar el número del comprobante de pago';
        } else if (!this.validarComprobante(invoice.id)) {
            return 'El número del comprobante no tiene un formato válido';
        }
        return '';
    }
}