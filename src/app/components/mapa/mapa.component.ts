import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, AfterViewInit {

  @Input() coords: string;
  @ViewChild('mapa') mapa: any;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.cargarMapas();
  }

  cargarMapas() {
    // Instanciar mapbox para asignarle el token
    const mapbox = ( mapboxgl as typeof mapboxgl );
    mapbox.accessToken = environment.apiKeyMapbox;

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    // Crear instancia del mapa
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: 15
    });

    // Añadir marcador
    new mapboxgl.Marker()
      .setLngLat( [ lng, lat ] )
      .addTo( map );
  }
}
