import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})

export class LibrosComponent implements OnInit, OnDestroy {
  libros: string[] = [];
  private Librosubscription!: Subscription;

  constructor(private librosService : LibrosService) {}

  ngOnInit(): void {
    this.libros = this.librosService.ObtenerLibros();
    this.Librosubscription =
      this.librosService.librosSubject.subscribe(() => this.libros = this.librosService.ObtenerLibros());
  }

  ngOnDestroy(): void {
    this.Librosubscription.unsubscribe();
  }

  eliminarLibro(libro: string){}

  guardarLibro(f: any){
    if(f.valid) {
      this.librosService.AgregarLibro(f.value.libro);
    }
  }
}
