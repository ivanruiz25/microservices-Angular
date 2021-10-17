import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LibrosService {

  librosSubject = new Subject();
  private libros = ['Libro', 'Revista', 'Periodico']

  constructor() { }

  AgregarLibro(libro: string) {
    this.libros.push(libro)
    this.librosSubject.next();
  }

  ObtenerLibros(){
    return [...this.libros];
  }

  EliminarLibro(libro: string) {
    this.libros = this.libros.filter(x => x !== libro);
    this.librosSubject.next();
  }
}
