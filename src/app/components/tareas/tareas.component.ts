import { Component } from '@angular/core';
import { Tarea } from 'src/app/models/tarea';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  listaTarea:Tarea[]=[];
  nombreTarea:string="";

  constructor(private storage:StorageService){
    this.listaTarea = storage.getData();
  }
  agregarTarea() {
    // const tarea : Tarea = {
      // nombre:this.nombreTarea, //Este valor está siendo recibido desde el input gracias al TwoWayBinding [(ngModel)] (model)
      // estado:false
    // }
    if(this.nombreTarea){
      const tarea:Tarea = new Tarea(this.nombreTarea,false) //Otra forma de decir lo mismo que en const tarea
      this.storage.saveData(tarea);
      // this.listaTarea.push(tarea);
      this.listaTarea = this.storage.getData();
      this.nombreTarea = "";
      console.log(tarea);
    }
  }
}
