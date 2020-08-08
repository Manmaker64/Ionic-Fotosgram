import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Avatar, Login, Usuario } from '../../interfaces/interfaces';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild( 'slidePrincipal', {static: true} ) slides: IonSlides;

  public loginUser: Login;
  public registerUser: Usuario;

  constructor( private usuarioService: UsuarioService,
               private navCtrl: NavController,
               private uiService: UiService ) {
    this.loginUser = {
      email: 'test1@test.com',
      password: '123456'
    };

    this.registerUser = {
      email: 'test',
      password: '123456',
      nombre: 'Test',
      avatar: 'av-1.png'
    };
  }

  ngOnInit() {
    this.slides.lockSwipes( true );
  }

  async login( fLogin: NgForm ) {
    if ( fLogin.invalid ) {
      return;
    }
    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
      // Navegar al tabs
      this.navCtrl.navigateRoot( 'main/tabs/tab1', { animated: true } );
    } else {
      // Mostrar alerta de usuario y contraseña incorrectos
      this.uiService.alertaInformatica( 'Usuario/Contaseña incorrectos' );
    }
  }

  async registro( fRegistro: NgForm ) {
    if ( fRegistro.invalid ) {
      return;
    }
    const valido = await this.usuarioService.registro( this.registerUser );

    if ( valido ) {
      // Navegar al tabs
      this.mostrarLogin();
    } else {
      // Mostrar alerta de usuario y contraseña incorrectos
      this.uiService.alertaInformatica( 'Ese correo electrónico ya existe' );
    }
  }

  mostrarLogin() {
    this.slides.lockSwipes( false );
    this.slides.slideTo(0);
    this.slides.lockSwipes( true );
  }

  mostrarRegistro() {
    this.slides.lockSwipes( false );
    this.slides.slideTo(1);
    this.slides.lockSwipes( true );
  }
}
