import { Injectable } from '@angular/core';
import { Autor } from './autor.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  baseUrl = environment.baseUrl;

  private AutoresLista: Autor[];
  private AutoresSubject = new Subject<Autor[]>();

  constructor(private http: HttpClient) {}

  obtenerAutores() {
    this.http.get<Autor[]>(this.baseUrl + 'autor').subscribe((data) => {
      this.AutoresLista = data;
      this.AutoresSubject.next([...this.AutoresLista]);
    });
  }

  obtenerActualListener() {
    return this.AutoresSubject.asObservable();
  }
}
