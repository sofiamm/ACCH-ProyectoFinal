import Swal from 'sweetalert2';

export class Notificaciones {

    showSuccessNotificacion(msg: string) {
        Swal.fire({
            title: msg,
            icon: "success"
        });
    }
    
    showErrorNotificacion(msg: string) {
        Swal.fire({
            title: msg,
            icon: "error"
        });
    }

    showWarningNotificacion(msg: string) {
        Swal.fire({
            title: msg,
            icon: "warning"
        });
    }

    showInfoNotificacion(msg: string) {
        Swal.fire({
            title: msg,
            icon: "info"
        });
    }

    showConfirmacion(msg: string, type: string, callback: any) {
        let btnColor = 'btn btn-outline-' + type + ' px-4';
        Swal.fire({
            title: '¿Estás seguro?',
            text: msg,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
            buttonsStyling: false,
            customClass: {
              confirmButton: btnColor,
              cancelButton: 'btn btn-outline-secondary ms-2 px-4',
          }
          }).then((result) => {
            if (result.isConfirmed) {
              callback();
            }
          });
    }
}