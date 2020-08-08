import { Component } from '@angular/core';
import { PostBasic } from '../../interfaces/interfaces';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PostsService } from '../../services/posts.service';

declare const window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public tempImages: string[];
  public cargandoGeo: boolean;
  public post: PostBasic;

  constructor( private postsService: PostsService,
               private geolocation: Geolocation,
               private camera: Camera ) {
    this.tempImages = [];
    this.cargandoGeo = false;
    this.post = {
      mensaje: '',
      coords: null,
      position: false
    };
  }

  getGeo() {
    if ( !this.post.position ) {
      this.post.coords = null;
      return;
    } else {
      this.cargandoGeo = true;

      this.geolocation.getCurrentPosition()
        .then( resp => {
          this.cargandoGeo = false;
          const coords = `${ resp.coords.latitude },${ resp.coords.longitude }`;
          this.post.coords = coords;
        })
        .catch( error => {
          this.cargandoGeo = false;
          console.log('Error obteniendo Geolocalización', error);
        });
    }
  }

  camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen( options );
  }

  libreria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen( options );
  }

  procesarImagen( options: CameraOptions ) {
    this.camera.getPicture(options).then( imageData => {
      const img = window.Ionic.WebView.convertFileSrc( imageData );

      this.postsService.subirImagen( imageData );
      this.tempImages.push( img );
    }, (err) => {
      console.log( err );
    });
  }
}
