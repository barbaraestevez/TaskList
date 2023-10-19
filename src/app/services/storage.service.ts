import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  //Método con el que obtenemos los datos
  getData():Tarea[]{ //se pone Tarea en vez de string porque...
    const tareas = localStorage.getItem('tareas');
    return tareas ? JSON.parse(tareas) : [];
  }

  //Método con el que almacenamos los datos obtenidos
  saveData(tarea:Tarea):void{ //se pone Tarea en vez de string porque...
    const tareas = this.getData(); //En la constante tareas se va a almacenar los datos incluidos en getData
    tareas.push(tarea); // tareas es un array al que se le van a ir añadiendo los datos
    localStorage.setItem('tareas',JSON.stringify(tareas));
  }
}
