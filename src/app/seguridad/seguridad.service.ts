import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginData } from './login-data.model';
import { Usuario } from './usuario.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class SeguridadService {

  private token: string;
  baseUrl = environment.baseUrl;

  private usuario: Usuario | null;
  seguridadCambio = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  cargarUsuario() {
    const tokenBrowser = localStorage.getItem('token');

    if (!tokenBrowser) {
      return;
    }

    this.token = tokenBrowser;
    this.seguridadCambio.next(true);

    this.http.get<Usuario>(this.baseUrl + "usuario")
      .subscribe(response => {
        console.log(response);

        this.token = response.token;
        this.usuario = {
          usuarioId: response.usuarioId,
          username: response.username,
          nombre: response.nombre,
          apellido: response.apellido,
          email: response.email,
          password: '',
          token: response.token
        };

        localStorage.setItem('token', response.token);
        this.seguridadCambio.next(true);
      });
  }

  obtenerToken(): string {
    return this.token;
  }

  registrar(usr: Usuario) {

    this.http.post<Usuario>(this.baseUrl + "usuario/registrar", usr)
      .subscribe(response => {
        this.token = response.token;
        this.usuario = {
          usuarioId: response.usuarioId,
          username: response.username,
          nombre: response.nombre,
          apellido: response.apellido,
          email: response.email,
          password: '',
          token: response.token
        };

        localStorage.setItem('token', response.token);
        this.seguridadCambio.next(true);
        this.router.navigate(['/'])
      });
  }

  login(loginData: LoginData): void {
    this.http.post<Usuario>(this.baseUrl + "usuario/login", loginData)
      .subscribe(response => {
        console.log(response);

        this.token = response.token;
        this.usuario = {
          usuarioId: response.usuarioId,
          username: response.username,
          nombre: response.nombre,
          apellido: response.apellido,
          email: response.email,
          password: '',
          token: response.token
        };

        localStorage.setItem('token', response.token);
        this.seguridadCambio.next(true);
        this.router.navigate(['/'])
      });
  }

  logout() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  onSession() {
    return this.token != null;
  }
}
