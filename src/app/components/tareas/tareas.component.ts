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
  //nuevos añadidos para poder editar las tareas que ya se han añadido previamente
  tareaActual?: Tarea;
  indiceActual: number = 0;

  constructor(private storage:StorageService){
    this.listaTarea = storage.getData();
  }
ngOnInit():void{
  this.listaTarea=this.storage.getData();
  this.reiniciarValores();
}

  agregarTarea() {
    // const tarea : Tarea = {
      // nombre:this.nombreTarea, //Este valor está siendo recibido desde el input gracias al TwoWayBinding [(ngModel)] (model)
      // estado:false
    // }
    //INICIO COMENTARIO---esto es lo que teníamos antes, cuando no se podían editar las tareas ---
    // if(this.nombreTarea){
    //   const tarea:Tarea = new Tarea(this.nombreTarea,false) //Otra forma de decir lo mismo que en const tarea
    //   this.storage.saveData(this.listaTarea,tarea);
    //   // this.listaTarea.push(tarea);
    //   this.listaTarea = this.storage.getData();
    //   this.nombreTarea = "";
    //   console.log(tarea);
    // }
    //FIN COMENTARIO---esto es lo que teníamos antes, cuando no se podían editar las tareas ---
    
    //INICIO COMENTARIO---esto es el nuevo código condicional dentro del método agregarTarea() que usaremos para poder editar las tareas ---
    if (this.nombreTarea) {
      let estadoActual:boolean = (this.tareaActual) ? this.tareaActual['_estado'] : false;
      const tarea: Tarea = new Tarea(this.nombreTarea, estadoActual);
      if (!this.tareaActual) this.storage.saveData(this.listaTarea, tarea);
      else {
        this.listaTarea[this.indiceActual] = tarea;
        this.storage.saveData(this.listaTarea);
      }
      this.listaTarea = this.storage.getData();
      this.ngOnInit();
    }
  }
  eliminarTarea(index:number){
    this.listaTarea.splice(index,1);
    this.storage.saveData(this.listaTarea);
  }
  modificarTarea(index:number){
    this.listaTarea[index]["_estado"] = !this.listaTarea[index]["_estado"];
    this.storage.saveData(this.listaTarea);
  }
  editarTarea(index: number) {
    this.nombreTarea = this.listaTarea[index]["_nombre"];
    this.indiceActual = index;
    this.tareaActual = new Tarea(this.nombreTarea, this.listaTarea[index]["_estado"]);
  }
  // eliminarTodos(){
  //   this.listaTarea = [];
  //   localStorage.setItem('tareas', JSON.stringify(this.listaTarea));
  // }
  reiniciarValores() {
    this.indiceActual = 0;
    this.nombreTarea = "";
    this.tareaActual = undefined;
  }

}

//Para editar una tarea creamos  x  y creamos un método para subir la tarea editada al input...