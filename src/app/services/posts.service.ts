import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, PostBasic, Post, PostNew } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public paginaPost: number;
  public nuevoPost: EventEmitter<Post>;

  constructor( private http: HttpClient,
               private usuarioService: UsuarioService,
               // tslint:disable-next-line: deprecation
               private fileTransfer: FileTransfer ) {
    this.paginaPost = 0;
    this.nuevoPost = new EventEmitter<Post>();
  }

  getPosts( pull: boolean = false ) {
    if ( pull ) {
      this.paginaPost = 0;
    }
    this.paginaPost ++;
    return this.http.get<RespuestaPosts>(`${ URL }/posts/?pagina=${ this.paginaPost }`);
  }

  crearPost( postBasic: PostBasic ) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.getToken()
    });

    return new Promise( resolve => {
      this.http.post<PostNew>( `${ URL }/posts`, postBasic, { headers } )
          .subscribe( resp => {
            this.nuevoPost.emit( resp.post );
            resolve(true);
          });
    });

  }

  subirImagen( img: string ) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.getToken()
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, `${ URL }/posts/upload`, options )
      .then( data => {
        console.log(data);
      })
      .catch( err => {
        console.log( 'Error en la carga', err );
      });
  }
}
