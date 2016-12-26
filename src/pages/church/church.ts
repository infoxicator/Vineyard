import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Church page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-church',
  templateUrl: 'church.html'
})
export class ChurchPage {
     churchPage:any;
 constructor(public navCtrl: NavController,  private navParams: NavParams) {
      this.churchPage = navParams.get('churchPage');
      console.log(this.churchPage);
  }

  ionViewDidLoad() {
    console.log('Hello ChurchPage Page');
  }

}
