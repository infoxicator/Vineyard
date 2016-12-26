import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {HomeService} from '../home/home.service'

/*
  Generated class for the MediaCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-media-category',
   providers: [HomeService],
  templateUrl: 'media-category.html'
})
export class MediaCategoryPage {
  category: any;
  videos = [];
  nextPageUri: any;
  loaded = false;

  constructor(public navCtrl: NavController, private navParams: NavParams, private homeService:HomeService) {
      this.category = navParams.get('category');
      this.homeService.getVideosByCategory(this.category.uri)
      .then(videos => {this.videos = videos.data;
      this.nextPageUri = videos.paging.next;  
      });
  }
   loadMoreVideos(infiniteScroll) {
     //console.log(infiniteScroll);
    console.log('Begin async operation');
    if(this.nextPageUri){
       this.homeService.getMoreVideos(this.nextPageUri)
      .then(moreVideos =>   {console.log(moreVideos); 
        for (let i = 0; i < moreVideos.data.length; i++) {
        this.videos.push(moreVideos.data[i]);
      }
     this.nextPageUri = moreVideos.paging.next;  })

      .then(next => {console.log(this.videos);
        console.log(this.nextPageUri);})
      .then(done => infiniteScroll.complete());
    }else{
      infiniteScroll.complete();
    }
   
  }

  ionViewDidLoad() {
     setTimeout(() => {
       this.loaded = true;
     }, 400);
    console.log('Hello MediaCategoryPage Page');         
  }

}
