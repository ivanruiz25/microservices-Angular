import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter<void>();

  estadoUsuario: boolean;
  usuarioSubcription: Subscription;

  constructor(private seguridadSeguridad: SeguridadService) { }

  ngOnInit(): void {
    this.usuarioSubcription =
      this.seguridadSeguridad.seguridadCambio.subscribe(status => this.estadoUsuario = status);
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  logout() {
    this.seguridadSeguridad.logout();
  }

  ngOnDestroy() {
    this.usuarioSubcription.unsubscribe();
  }
}
