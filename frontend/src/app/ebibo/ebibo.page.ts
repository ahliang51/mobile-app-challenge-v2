import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Geofence } from '@ionic-native/geofence';

@Component({
  selector: 'app-ebibo',
  templateUrl: './ebibo.page.html',
  styleUrls: ['./ebibo.page.scss'],
})
export class EbiboPage implements OnInit {

  constructor(public geolocation: Geolocation,
    public platform: Platform,
  ) {
    this.platform.ready().then(() => {
      Geofence.initialize().then(
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      );
    });
  }

  ngOnInit() {



    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((resp) => {
      console.log(resp.coords.latitude + ' ' + resp.coords.longitude);

      const geofence = {
        id: 'Chong Pang Camp',
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude,
        radius: 50,
        transitionType: 1,
      };

      Geofence.addOrUpdate(geofence).then(
        () => console.log('Geofence added'),
        (err) => console.log(err)
      );

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
