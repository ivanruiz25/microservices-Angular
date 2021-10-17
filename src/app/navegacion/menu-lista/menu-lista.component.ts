import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter<void>();

  estadoUsuario: boolean;
  usuarioSubcription: Subscription;

  constructor(private seguridadService: SeguridadService) { }

  ngOnInit(): void {
    this.usuarioSubcription =
      this.seguridadService.seguridadCambio.subscribe(status => this.estadoUsuario = status);
  }

  onCerrarMenu() {
    this.menuToggle.emit();
  }

  logout(){
    this.onCerrarMenu();
    this.seguridadService.logout();
  }

  ngOnDestroy() {
    this.usuarioSubcription.unsubscribe();
  }
}
