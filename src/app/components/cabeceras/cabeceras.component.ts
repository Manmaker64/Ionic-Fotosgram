import { Component, OnInit, Input } from '@angular/core';
import { PostBasic } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cabeceras',
  templateUrl: './cabeceras.component.html',
  styleUrls: ['./cabeceras.component.scss'],
})
export class CabecerasComponent implements OnInit {

  @Input() titulo: string;
  @Input() post: PostBasic;
  @Input() cargandoGeo: boolean;
  @Input() tempImages: string[];

  constructor( private postsService: PostsService,
               private usuarioService: UsuarioService,
               private route: Router ) { }

  ngOnInit() {}

  logout() {
    this.postsService.paginaPost = 0;
    this.usuarioService.logout();
  }

  async crearPost() {
    const creado = await this.postsService.crearPost( this.post );
    if ( !creado ) {
      return;
    } else {
      this.reiniciarPost();
      this.route.navigateByUrl('/main/tabs/tab1');
    }
  }

  reiniciarPost() {
    this.post = {
      mensaje: '',
      coords: null,
      position: false
    };
    this.tempImages = [];
  }
}
