import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geofence } from '@ionic-native/geofence';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  appMenu = [
    { title: 'Logout', url: '/', icon: 'add' }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      Geofence.initialize().then(
        () => {
          console.log('Geofence Plugin Ready');
          // this.addGeofences();
        },
        (err) => console.log(err)
      );
      this.splashScreen.hide();
    });
  }
}
