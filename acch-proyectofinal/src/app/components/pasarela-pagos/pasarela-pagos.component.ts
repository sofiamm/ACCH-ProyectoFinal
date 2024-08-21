import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';
import { HeaderComponent } from '../header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Notificaciones } from '../../util/notificaciones.component';
import { ReciboService } from '../../services/recibo.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Recibo } from '../../models/recibo.model';
import { Validaciones } from '../../util/validaciones.component';
import e from 'express';
import { firstValueFrom } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-pasarela-pagos',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    MatDividerModule,
    MatIcon,
    CommonModule
  ],
  templateUrl: './pasarela-pagos.component.html',
  styleUrl: './pasarela-pagos.component.scss'
})
export class PasarelaPagosComponent {
  user = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario') || '') : null;
  usrId = this.user.id;
  cursos: Curso[] = [];
  notificaciones = new Notificaciones();
  buyForm: FormGroup;
  validaciones = new Validaciones();

  @ViewChild('curso') cursoSelect!: ElementRef;
  @ViewChild('material') materialSelect!: ElementRef;
  @ViewChild('terminos') confirmation!: ElementRef;

  constructor(
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private reciboService: ReciboService
  ) {

    this.loadNotRegisteredCourses();

    this.buyForm = new FormGroup({
      id: new FormControl(''),
      usrNombre: new FormControl(''),
      usrCorreo: new FormControl(''),
      usrTelefono: new FormControl(''),
      curso: new FormControl(''),
      material: new FormControl(''),
      comprobanteImg: new FormControl(''),
      monto: new FormControl('')
    });
  }

  async loadNotRegisteredCourses() {
    try {
      this.cursoService.getCourses().subscribe(async cursos => {
        const allCourses = this.cursoService.getCourses();
        const userData = await this.usuarioService.getUserId(this.usrId);
        const cursosInscritos = userData?.cursos_inscritos || [];
        this.cursos = (await firstValueFrom(allCourses)).filter(curso =>
          !cursosInscritos.some(inscrito =>
            inscrito.id === curso.id &&
            inscrito.nombre === curso.nombre &&
            inscrito.imagen === curso.imagen
          )
        );
        this.buyForm.get('monto')?.setValue(this.cursos[0].precio);
      });
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  }

  //Agrega un registro de compra en la tabla de contable
  async buyCourse(): Promise<void> {
    let exists = await this.invoiceExists();
    if (exists) {
      this.notificaciones.showErrorNotificacion('Este número de comprobante ya existe');
      return;
    }
    if (this.confirmation.nativeElement.checked) {
      const invoiceObj = this.formToInvoice();
      let valid = this.validaciones.validarPago(invoiceObj);
      if (valid === '') {
        try {
          this.notificaciones.showLoadingNotificacion('Procesando...');
          invoiceObj.comprobanteImg = await this.uploadInvoice(invoiceObj.id);
          if (invoiceObj.comprobanteImg !== null) {
            await this.reciboService.createInvoice(invoiceObj);
            this.notificaciones.closeLoadingNotificacion();
            this.notificaciones.showSuccessNotificacion('Compra realizada con éxito', () => {
              document.location = '/lista-cursos';
            });
          } else {
            this.notificaciones.showErrorNotificacion('Debe seleccionar un archivo antes de subirlo.');
          }
        } catch (error) {
          this.notificaciones.showErrorNotificacion('Ocurrió un error al realizar la compra');
        }
      } else {
        this.notificaciones.showErrorNotificacion(valid);
      }
    } else {
      this.notificaciones.showErrorNotificacion('Debe aceptar los términos y condiciones');
    }
  }

  //Revisar que el recibo ya exista
  async invoiceExists(): Promise<boolean> {
    let id = this.buyForm.get('id')?.value.toString();
    let exists = await this.reciboService.getInvoiceId(id);
    return exists ? true : false;
  }

  // Sube el comprobante a Firebase Storage
  async uploadInvoice(courseId: string): Promise<string> {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      try {
        return await this.reciboService.uploadInvoice(this.usrId, courseId, file);
      } catch (error) {
        throw error;
      }
    } else {
      return '';
    }
  }

  //Al seleccionar un curso, carga el precio
  loadPrice(): void {
    const courseElement = this.cursoSelect.nativeElement;
    const courseId = courseElement.options[courseElement.selectedIndex].value;
    const course = this.cursos.find(curso => curso.id === courseId);
    this.buyForm.get('monto')?.setValue(course?.precio);
  }

  // Convierte el formulario a un objeto de tipo Recibo
  formToInvoice(): Recibo {
    const courseElement = this.cursoSelect.nativeElement;
    const courseName = courseElement.options[courseElement.selectedIndex].text;
    const materialElement = this.materialSelect.nativeElement;
    const materialId = materialElement.options[materialElement.selectedIndex].value;
    const invoiceObj: Recibo = {
      id: this.buyForm.get('id')?.value,
      usrNombre: this.user.nombre + ' ' + this.user.apellido,
      usrCorreo: this.user.correoElectronico,
      usrTelefono: this.buyForm.get('usrTelefono')?.value,
      curso: courseName,
      material: materialId,
      comprobanteImg: '',
      monto: this.buyForm.get('monto')?.value,
      estado: 'Pendiente',
    }
    return invoiceObj;
  }
}
