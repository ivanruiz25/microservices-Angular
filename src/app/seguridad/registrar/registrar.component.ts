import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private seguridadUsuario: SeguridadService) { }

  ngOnInit(): void {
  }

  registrarUsuario(f: NgForm) {
    this.seguridadUsuario.registrar({
      email: f.value.email,
      password: f.value.password,
      nombre: f.value.nombre,
      apellido: f.value.apellido,
      username: f.value.usuario,
      token: '',
      usuarioId: ''
    });
  }
}
