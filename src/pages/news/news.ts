import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import {HomeService} from '../home/home.service'
import {NewspostPage} from '../newspost/newspost'

/*
  Generated class for the News page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news',
  providers: [HomeService],
  templateUrl: 'news.html'
})
export class NewsPage {
 newsCategory:any;
 news:any;
 newsLoaded: boolean;
  constructor(public navCtrl: NavController,  private navParams: NavParams, private homeService:HomeService,
  storage: Storage) {
      this.newsCategory = navParams.get('newsCategory');
       this.homeService.getPostsByCategory(this.newsCategory.id)
       .subscribe(news => {this.news = news;
         this.newsLoaded = true;
        }, error =>{storage.get('postsByCategory').then((news) => {
                         this.news = news;
                         this.newsLoaded = true;
                        })
        });
  }
   postTapped(event, newsPost){
   this.navCtrl.push(NewspostPage, {
      newsPost: newsPost})
      }
}
