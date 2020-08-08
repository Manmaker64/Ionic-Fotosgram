import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService,
               private uiService: UiService ) {
    this.usuario = {};
  }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

  async actualizar( fActualizar: NgForm ) {
    if ( fActualizar.invalid ) {
      return;
    }
    const actualizado = await this.usuarioService.actualizarUsuario( this.usuario );

    if ( actualizado ) {
      // Toast con el mensaje actualizado
      this.uiService.presentToast('Perfil actualizado');
    } else {
      // Toast con el error
      this.uiService.presentToast('No se ha podido actualizar');
    }
  }
}