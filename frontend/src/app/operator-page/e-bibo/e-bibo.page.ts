import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, Events, LoadingController, ToastController } from '@ionic/angular';
import { Geofence } from '@ionic-native/geofence';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { EBiboService } from 'src/app/services/e-bibo.service';
import { Storage } from '@ionic/storage';


declare var google;
declare var circle;

@Component({
  selector: 'app-ebibo',
  templateUrl: './e-bibo.page.html',
  styleUrls: ['./e-bibo.page.scss'],
})
export class EbiboPage implements OnInit {

  faMapMarkerAlt = faMapMarkerAlt;
  showMapMarker = false;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address: string;
  circle: any;
  radius = 50;
  haveBookIn: boolean;
  userId;


  constructor(public geolocation: Geolocation,
    public platform: Platform,
    public events: Events,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public eBiboService: EBiboService,
    public storage: Storage
  ) {
    this.platform.ready().then(() => {

      Geofence.initialize().then(
        () => {
          console.log('Geofence Plugin Ready');
          // this.addGeofences();
        },
        (err) => console.log(err)
      );
    });
  }

  addGeofences(latitude, longitude) {
    const geofence = {
      id: 'Chong Pang Camp',
      latitude: latitude,
      longitude: longitude,
      radius: this.radius,
      transitionType: 1,
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

  }

  ngOnInit() {
    this.loadMap();
    this.storage.get('userId').then(userId => {
      this.userId = userId;
      this.eBiboService.checkBiboStatus({ userId: userId }).subscribe(result => {
        console.log(result)
        if (result.bookOutDateTime) {
          this.haveBookIn = false;
        } else {
          this.haveBookIn = true;
        }
      })
    })
  }

  loadMap() {
    this.presentLoading();
    this.geolocation.getCurrentPosition().then((resp) => {
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('tilesloaded', () => {
        this.addGeofences(resp.coords.latitude, resp.coords.longitude);
        this.loadingController.dismiss();
        this.showMapMarker = true;
      });

      this.circle = new google.maps.Circle({
        center: latLng,
        map: this.map,
        radius: this.radius,
        strokeColor: 'red',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'red',
        clickable: true,
      });

      this.geolocation.watchPosition().subscribe(position => {
        console.log(position)

        const updatedLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const updatedMapOptions = {
          center: updatedLatLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, updatedMapOptions);
        this.circle = new google.maps.Circle({
          center: updatedLatLng,
          map: this.map,
          radius: 50,
          strokeColor: 'red',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: 'red',
          clickable: true,
        });
      })

    }).catch((error) => {
      this.loadingController.dismiss();
      console.log('Error getting location', error);
    });
  }


  bookIn() {
    this.presentLoading();
    this.eBiboService.bookIn({ userId: this.userId }).subscribe(result => {
      console.log(result)
      this.loadingController.dismiss();
      if (result) {
        this.presentToast('You have booked in!');
        this.haveBookIn = true;
      }
    })
  }

  bookOut() {
    this.presentLoading();
    this.eBiboService.bookOut({ userId: this.userId }).subscribe(result => {
      console.log(result)
      this.loadingController.dismiss();
      if (result) {
        this.presentToast('You have booked out!');
        this.haveBookIn = false;
      }
    })
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
    });
    await loading.present();
  }
}
