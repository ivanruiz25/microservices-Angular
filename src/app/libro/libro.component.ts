import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})

export class LibroComponent implements OnInit {

  @Input() Titulo: string = '';
  @Output() LibroClicked = new EventEmitter();

  constructor(private librosService : LibrosService) { }

  ngOnInit(): void {
  }

  onClicked() {
    this.librosService.EliminarLibro(this.Titulo);
  }

}
