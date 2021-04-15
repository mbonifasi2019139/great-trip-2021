import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapBoxGl from 'mapbox-gl';
import { Tourists_Places } from 'src/app/interfaces/interfaces';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-maptrack',
  templateUrl: './maptrack.component.html',
  styleUrls: ['./maptrack.component.scss'],
})
export class MaptrackComponent implements OnInit {

  mapaSeguimiento: mapBoxGl.Map;
  mapaSeguimiento2: mapBoxGl.Map;

  @Input() idTrip:string;

  constructor(private tripsService: TripsService) { }


  ngOnInit() {

    this.tripsService.getTouristsPlacesTrips(this.idTrip).subscribe(resp =>{
      console.log(resp);
        resp.touristsPlaces.forEach((tp: Tourists_Places)=>{
        let coord = tp.address.split(",");
        let lng = parseFloat(coord[0]);
        let lat = parseFloat(coord[1]);

        this.addMarker(lng,lat);
        this.addMarker2(lng,lat);
      })
    });

    (mapBoxGl as any).accessToken = environment.mapboxKey;
    this.mapaSeguimiento = new mapBoxGl.Map({
    container: 'mapa-puntos',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-89.6275726, 17.2246914 ], // starting position
    zoom: 6 // starting zoom
    });

    (mapBoxGl as any).accessToken = environment.mapboxKey;
    this.mapaSeguimiento2 = new mapBoxGl.Map({
    container: 'mapa-puntos-cerca',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-89.6275726, 17.2246914 ], // starting position
    zoom: 12.5 // starting zoom
    });
 
    /* this.mapaSeguimiento.on('load', function () {
    this.mapaSeguimiento.addSource('route', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [-89.6275726,17.2246914],
          [-89.6326522, 17.2237051]
        ]
      }
    }
    });

    this.mapaSeguimiento.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
    'line-join': 'round',
    'line-cap': 'round'
    },
    'paint': {
    'line-color': '#888',
    'line-width': 8
    }
    });
    });   */ 
  }

  addMarker(lng: number,lat: number){
    var marker = new mapBoxGl.Marker({
      draggable: false
      })
      .setLngLat([lng,lat])
      .addTo( this.mapaSeguimiento );
  }

  addMarker2(lng: number,lat: number){
    var marker = new mapBoxGl.Marker({
      draggable: false
      })
      .setLngLat([lng,lat])
      .addTo( this.mapaSeguimiento2 );
  }

}

