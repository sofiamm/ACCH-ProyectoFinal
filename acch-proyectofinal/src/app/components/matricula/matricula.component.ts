import { Component, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { BannerComponent } from '../banner/banner.component';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Notificaciones } from '../../util/notificaciones.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule, Columns, Config, DefaultConfig, APIDefinition, API } from 'ngx-easy-table';
import { Validaciones } from '../../util/validaciones.component';
import { AuthService } from '../../services/auth.service';
import { Recibo } from '../../models/recibo.model';
import { ReciboService } from '../../services/recibo.service';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [
    BannerComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    TableModule
  ],
  templateUrl: './matricula.component.html',
  styleUrl: './matricula.component.scss'
})
export class MatriculaComponent {
  validaciones = new Validaciones();
  notificaciones = new Notificaciones();
  public configuration!: Config;
  public columns!: Columns[];
  invoices: Recibo[] = [];

  @ViewChild('table') table!: APIDefinition;
  @ViewChild('imageTemplate', { static: true }) imageTemplate!: TemplateRef<any>;
  @ViewChild('actionTpl', { static: true }) actionTpl!: TemplateRef<any>;

  constructor(
    private reciboService: ReciboService,
    private usuarioService: UsuarioService,
    private courseService: CursoService,
    private authService: AuthService
  ) {
    this.reciboService.getInvoices().subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.tableLayout.striped = true;
    this.columns = [
      { key: 'id', title: '#' },
      { key: 'usrNombre', title: 'Usuario' },
      { key: 'usrCorreo', title: 'Correo Electrónico' },
      { key: 'usrTelefono', title: 'Teléfono' },
      { key: 'curso', title: 'Curso' },
      { key: 'material', title: 'Material' },
      { key: 'comprobanteImg', title: 'Comprobante', cellTemplate: this.imageTemplate, orderEnabled: false },
      { key: 'monto', title: 'Total' },
      { key: 'actions', title: 'Acciones', orderEnabled: false, cellTemplate: this.actionTpl }
    ]
  }

  onChange(event: Event): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: (event.target as HTMLInputElement).value,
    });
  }

  confirmRegistration(invoice: Recibo) {
    this.notificaciones.showConfirmacion(`Desea matricular al usuario ${invoice.usrNombre} en el curso ${invoice.curso} ?`, 'warning', () => {
      this.registerUserCourse(invoice);
    });
  }

  async registerUserCourse(invoice: Recibo) {
    let course = await this.courseService.getCourseByName(invoice.curso);
    if (course !== null) {
      await this.usuarioService.registerUserCourse(invoice.usrCorreo, course);
      await this.reciboService.acceptInvoice(invoice.id);
      this.notificaciones.showSuccessNotificacion('Curso matriculado exitosamente');
    }
  }
}
