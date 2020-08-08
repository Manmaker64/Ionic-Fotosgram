import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Avatar } from '../../interfaces/interfaces';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSelected = new EventEmitter<string>();
  @Input() avatarActual = 'av-1.png';

  public avatarSlide = { slidesPerView: 3.5 };
  public avatars: Avatar[];

  constructor() {
    this.avatars = [
      {
        img: 'av-1.png',
        seleccionado: true
      },
      {
        img: 'av-2.png',
        seleccionado: false
      },
      {
        img: 'av-3.png',
        seleccionado: false
      },
      {
        img: 'av-4.png',
        seleccionado: false
      },
      {
        img: 'av-5.png',
        seleccionado: false
      },
      {
        img: 'av-6.png',
        seleccionado: false
      },
      {
        img: 'av-7.png',
        seleccionado: false
      },
      {
        img: 'av-8.png',
        seleccionado: false
      },
    ];
  }

  ngOnInit() {
    // Pongo todos los avatars a falso
    this.avatars.forEach( av => av.seleccionado = false );

    // Pongo a true el avatar seleccionado
    for ( const avatar of this.avatars ) {
      if ( avatar.img === this.avatarActual ) {
        avatar.seleccionado = true;
        break;
      }
    }
  }

  seleccionarAvatar( avatar: Avatar ) {
    // Todos los avatars se quitan su seleccion
    this.avatars.forEach( av => av.seleccionado = false );
    // Activar Avatar seleccionado
    avatar.seleccionado = true;

    this.avatarSelected.emit( avatar.img );
  }
}
