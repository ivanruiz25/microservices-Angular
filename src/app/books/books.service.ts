import { Books } from './books.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationBook } from './paginationBook.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl = environment.baseUrl;

  private BooksLista: Books[] = [];
  booksSubject = new Subject();

  paginationBooks: PaginationBook;
  booksPaginationSubject = new Subject<PaginationBook>();

  constructor(private http: HttpClient) {}

  obtenerLibros(
    paginaLibro: number,
    paginaActual: number,
    sort: string,
    sortDirection: string,
    filterValue: any
  ) {
    const request = {
      pageSize: paginaLibro,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue,
    };

    this.http
      .post<PaginationBook>(this.baseUrl + 'libro/pagination', request)
      .subscribe((response) => {
        this.paginationBooks = response;
        this.booksPaginationSubject.next(this.paginationBooks);
      });
  }

  obtenerActualListener() {
    return this.booksPaginationSubject.asObservable();
  }

  guardarLibro(book: Books) {
    this.http.post(this.baseUrl + 'libro', book).subscribe((response) => {
      this.booksSubject.next();
    });
  }

  guardarLibroListener() {
    return this.booksSubject.asObservable();
  }
}
