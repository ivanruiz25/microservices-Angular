import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioNombre: string = '';
  usuarios: string[] = ['Iván', 'Abel', 'Victor'];
  visible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.visible = true, 3000)
  }

  onAgregarUsuario() {
    this.usuarios.push(this.usuarioNombre);
    this.usuarioNombre = '';
  }
}
