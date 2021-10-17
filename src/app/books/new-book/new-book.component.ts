import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { empty, Subscription } from 'rxjs';
import { Autor } from 'src/app/autores/autor.model';
import { AutoresService } from 'src/app/autores/autores.service';
import { Books } from '../books.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit, OnDestroy {
  autorId: string;
  autorText: string;
  fechaPublicacion: string;

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  autores: Autor[] = [];
  autorSubcription: Subscription;

  constructor(
    private bookService: BooksService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService
  ) {}

  ngOnInit(): void {
    this.autoresService.obtenerAutores();
    this.autorSubcription = this.autoresService
      .obtenerActualListener()
      .subscribe((autores: Autor[]) => {
        this.autores = autores;
      });
  }

  ngOnDestroy(): void {
    this.autorSubcription.unsubscribe();
  }

  guardarLibro(form: NgForm) {
    if (form.valid) {
      const libroRequest: Books = {
        id: '',
        titulo: form.value.titulo,
        descripcion: form.value.descripcion,
        precio: parseInt(form.value.precio),
        fechaPublicacion: new Date(this.fechaPublicacion),
        autor: {
          id: this.autorId,
          nombreCompleto: this.autorText,
        },
      };

      this.bookService.guardarLibro(libroRequest);
      this.autorSubcription = this.bookService.guardarLibroListener().subscribe(() => {
        this.dialogRef.closeAll();
      });
    }
  }

  selected(event: MatSelectChange) {
    this.autorText = (event.source.selected as MatOption).viewValue;
  }
}
