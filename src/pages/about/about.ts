import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {HomeService} from '../home/home.service'
import { NavController } from 'ionic-angular';
import {ChurchPage} from '../church/church'
import {NewsPage} from '../news/news'


@Component({
  selector: 'page-about',
  providers: [HomeService],
  templateUrl: 'about.html'
})
export class AboutPage {
  pages : Array<string>;
  newsCategory : any;
  grid: Array<Array<string>>; //array of arrays
  newsLoaded: boolean;
  gridLoaded: boolean;
  constructor(public navCtrl: NavController, private homeService:HomeService, storage: Storage) {
    //this.loader.present();
    this.homeService.getCategory(5)
     .subscribe(newsCategory => {this.newsCategory = newsCategory;
       this.newsLoaded = true;
        }, error =>{storage.get('newsCategory').then((newsCategory) => {
                         this.newsLoaded = true;
                         this.newsCategory = newsCategory;
                        })
        });
    this.homeService.getPagesByParent(35)
     .subscribe(pages => {this.grid = this.homeService.createGrid(pages);       
        }, error =>{storage.get('pages').then((pages) => {
                         this.grid = this.homeService.createGrid(pages);                         
                        })
        });  
  }
  
   pageTapped(event, churchPage){
    this.navCtrl.push(ChurchPage, {
      churchPage: churchPage
    })
  }
   newsTapped(event, newsCategory){
    this.navCtrl.push(NewsPage, {
      newsCategory: newsCategory
    })
  }

}
