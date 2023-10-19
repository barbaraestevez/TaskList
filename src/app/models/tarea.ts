//Creamos la clase Tarea
export class Tarea {
    //ESTOS SON LOS CAMPOS DE LA CLASE
  private _nombre: string; //Por convención, se utiliza un guión bajo delante del nombre para hacerlo privado
  private _estado: boolean = false;
  
  //CONSTRUCTOR
  constructor(nombre: string, estado: boolean) {
    this._nombre = nombre;
    this._estado = estado;
  }

  //MÉTODOS de acceso
  //Si no se pone nada delante de los métodos GET y SET, por defecto es público
  /*public*/ get nombre(): string {
    return this._nombre;
  }
  /*public*/ set nombre(value: string) {
    this._nombre = value;
  }
  /*public*/ get estado(): boolean {
    return this._estado;
  }
  /*public*/ set estado(value: boolean) {
    this._estado = value;
  }

}
