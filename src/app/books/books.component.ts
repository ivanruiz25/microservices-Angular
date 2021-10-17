import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Books } from './books.model';
import { BooksService } from './books.service';
import { NewBookComponent } from './new-book/new-book.component';
import { Subscription } from 'rxjs';
import { PaginationBook } from './paginationBook.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, OnDestroy, AfterViewInit {
  booksList: Books[] = [];
  displayedColumns = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();

  @ViewChild(MatSort) orden: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;

  private bookSubscription: Subscription;

  totalLibros: number = 0;
  paginaLibro: number = 2;
  paginaCombo = [1, 2, 5, 10];
  paginaActual = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue: any = null;

  timeout: any = null;

  constructor(private booksService: BooksService, private Dialog: MatDialog) {}

  ngOnInit(): void {
    this.booksService.obtenerLibros(
      this.paginaLibro,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );

    this.bookSubscription = this.booksService
      .obtenerActualListener()
      .subscribe((pagination: PaginationBook) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalLibros = pagination.totalRows;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.orden;
    this.dataSource.paginator = this.paginacion;
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

  paginador(event: PageEvent): void {
    this.paginaLibro = event.pageSize;
    this.paginaActual = event.pageIndex + 1;

    this.booksService.obtenerLibros(
      this.paginaLibro,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  ordenarColumna(event: any): void {
    this.sort = event.active;
    this.sortDirection = event.direction;

    this.booksService.obtenerLibros(
      this.paginaLibro,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  hacerFiltro(event: any): void {
    const $this = this;
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (event.code != 13) {
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value,
        };

        $this.filterValue = filterValueLocal;

        $this.booksService.obtenerLibros(
          $this.paginaLibro,
          $this.paginaActual,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );
      }
    }, 1000);
  }

  abrirDialog(): void {
    const dialogRef = this.Dialog.open(NewBookComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.booksService.obtenerLibros(
        this.paginaLibro,
        this.paginaActual,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
    });
  }
}
