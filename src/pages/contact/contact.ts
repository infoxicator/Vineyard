import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Ng2MapComponent } from 'ng2-map';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {
   Ng2MapComponent['apiUrl'] = 'https://maps.google.com/maps/api/js?key=AIzaSyAREiBD0jH1edwsi-pRAnoytslyOAojRqY';
  }

}
