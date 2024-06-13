import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pasarela-pagos',
  standalone: true,
  imports: [
    HeaderComponent,
    MatDividerModule,
    MatIcon
  ],
  templateUrl: './pasarela-pagos.component.html',
  styleUrl: './pasarela-pagos.component.scss'
})
export class PasarelaPagosComponent {
  uploadProgress$!: Observable<number>;
  downloadURL$!: Observable<string>;

  private storage: Storage = inject(Storage);

  onFileSelected(event: any) {
    const archivoSeleccionado: File = event.target.files[0];
    this.uploadFile(archivoSeleccionado);
  }

  async uploadFile(file: File) {
    const filePath = 'Bouchers/${file.name}';
    const fileRef = ref(this.storage, filePath);
    const uploadFile = uploadBytesResumable(fileRef, file);

    uploadFile.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Progreso de la carga:', progress);
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      },
      async () => {
        console.log("el archivo se subio exitosamente!");
        const url = await getDownloadURL(fileRef);
        console.log("url del archivo: ", url)
      }
    )
  }
}