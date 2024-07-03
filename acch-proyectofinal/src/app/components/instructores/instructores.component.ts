import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstructorModel } from '../../models/instructor.model';
import { HeaderComponent } from '../header/header.component';
import { BannerComponent } from '../banner/banner.component';



@Component({
  selector: 'app-instructores',
  standalone: true,
  imports: [CommonModule, FormsModule,HeaderComponent,BannerComponent],
  templateUrl: './instructores.component.html',
  styleUrl: './instructores.component.scss'
})
export class InstructoresComponent {
  InstructorModelArray: InstructorModel[] = [
    {id: 1, name:"Dyla", curso: "INSA"},
    {id: 2, name:"Dyla", curso: "INSA"},
    {id: 3, name:"Dyla", curso: "INSA"},

  ];

  titulo: string = 'Intructores';
  contenido: string = 'Informacion de los instructores';

  selectedInstructorModel: InstructorModel = new InstructorModel();

  openForEdit(instructor : InstructorModel) {
    this.selectedInstructorModel = instructor;
  }

  add0rEdit() {
    if(this.selectedInstructorModel.id === 0){
      this.selectedInstructorModel.id = this.InstructorModelArray.length + 1;
      this.InstructorModelArray.push(this.selectedInstructorModel);
    }
    this.selectedInstructorModel = new InstructorModel();
  }

  delete(){
    if(confirm('Está seguro que desea eliminarlo?')){
      this.InstructorModelArray = this.InstructorModelArray.filter(x => x != this.selectedInstructorModel)
      this.selectedInstructorModel = new InstructorModel();
    }
  }

}
