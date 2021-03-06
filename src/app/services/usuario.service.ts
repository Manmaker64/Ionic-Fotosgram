import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

import { environment } from '../../environments/environment';
import { Token, Usuario, UsuarioToken } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private token: string;
  private usuario: Usuario;

  constructor( private http: HttpClient,
               private storage: Storage,
               private navCtrl: NavController ) {
    this.token = null;
    this.usuario = {};
  }

  login( email: string, password: string ) {
    const data = { email, password };

    return new Promise( resolve => {
      this.http.post<Token>(`${ URL }/user/login`, data)
          .subscribe( resp => {
            if ( resp.ok ) {
              this.guardarToken( resp.token );
              resolve(true);
            } else {
              this.token = null;
              this.storage.clear();
              resolve(false);
            }
          });
    });
  }

  logout() {
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot( '/login', { animated: true } );
  }

  registro( usuario: Usuario ) {
    return new Promise( resolve => {
      this.http.post<Token>(`${ URL }/user/create`, usuario)
          .subscribe( async resp => {
            if ( resp.ok ) {
              await this.guardarToken( resp.token );
              resolve(true);
            } else {
              this.token = null;
              this.storage.clear();
              resolve(false);
            }
          });
    });
  }

  async guardarToken( token: string ) {
    this.token = token;
    await this.storage.set( 'token', token );

    await this.validaToken();
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {
    await this.cargarToken();

    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    } else {
      return new Promise<boolean>( resolve => {
        const headers = new HttpHeaders({
          'x-token': this.token
        });

        this.http.get<UsuarioToken>(`${ URL }/user/`, { headers })
            .subscribe( resp => {
              if ( resp.ok ) {
                this.usuario = resp.usuario;
                resolve( true );
              } else {
                this.navCtrl.navigateRoot('/login');
                resolve( false );
              }
            });
      });
    }
  }

  getUsuario() {
    if ( !this.usuario._id ) {
      this.validaToken();
    }
    return { ...this.usuario };
  }

  getToken() {
    return this.token;
  }

  actualizarUsuario( usuario: Usuario ) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise( resolve => {
      this.http.put<Token>(`${ URL }/user/update`, usuario, { headers })
          .subscribe( resp => {
            if ( resp.ok ) {
              this.guardarToken( resp.token );
              resolve(true);
            } else {
              resolve(false);
            }
          });
    });
  }
}
