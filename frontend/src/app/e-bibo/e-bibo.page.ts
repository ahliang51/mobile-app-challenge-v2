import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, Events } from '@ionic/angular';
import { Geofence } from '@ionic-native/geofence';

@Component({
  selector: 'app-ebibo',
  templateUrl: './e-bibo.page.html',
  styleUrls: ['./e-bibo.page.scss'],
})
export class EbiboPage implements OnInit {

  constructor(public geolocation: Geolocation,
    public platform: Platform,
    public events: Events,
  ) {
    this.platform.ready().then(() => {
      Geofence.initialize().then(
        () => {
          console.log('Geofence Plugin Ready');
          this.addGeofences();
        },
        (err) => console.log(err)
      );
    });
  }

  addGeofences() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude + ' ' + resp.coords.longitude);

      const geofence = {
        id: 'Chong Pang Camp',
        latitude: 1.4308558,
        longitude: 103.8261545,
        radius: 100,
        transitionType: 3,
        notification: {
          id: 1,
          title: 'Chong Pang Camp',
          text: 'You are near CPC.',
          openAppOnClick: true
        }
      };

      Geofence.addOrUpdate(geofence).then(
        () => console.log('Geofence added'),
        (err) => console.log(err)
      );

      // tslint:disable-next-line:no-shadowed-variable
      Geofence.onTransitionReceived().subscribe(resp => {
        this.events.publish('transition:recieved');
        console.log(resp);
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ngOnInit() {

  }

}
