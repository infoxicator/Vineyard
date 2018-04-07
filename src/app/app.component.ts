import { Component, ViewChild} from '@angular/core';
import { App, Platform, NavController, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { TalksPage } from '../pages/talks/talks'
import { EventDetailPage } from '../pages/event-detail/event-detail'
import { PlayerModal } from '../pages/modal/player-modal'

import { ImgCacheService } from '../global/img-cache';
import { OneSignal } from '@ionic-native/onesignal';


@Component({
  template: `<ion-nav #myNav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild('myNav') navCtrl: NavController
  rootPage = TabsPage;

  constructor(platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, 
    imgCacheService: ImgCacheService, private oneSignal: OneSignal, public modalCtrl: ModalController,
    private app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(platform.is('android')){
        statusBar.styleLightContent();
        statusBar.backgroundColorByHexString('#1976D2'); // set status bar to blue
      }else{
        statusBar.styleDefault();
      }
      splashScreen.hide();
      imgCacheService.initImgCache()
      .subscribe((v) => console.log('init'), () => console.log('fail init'));
      platform.registerBackButtonAction(() => {
      let nav = app.getActiveNavs()[0];
      let activeView = nav.getActive();

      if(activeView != null){
        if(nav.canGoBack())
          nav.pop();
        else if (typeof activeView.instance.backButtonAction === 'function')
          activeView.instance.backButtonAction();
        else
          nav.parent.select(0); // goes to the first tab
      }
    });
      
    });
    
  }
}
