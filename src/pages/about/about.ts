import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {HomeService} from '../home/home.service'
import { NavController } from 'ionic-angular';
import {ChurchPage} from '../church/church'
import {NewsPage} from '../news/news'
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-about',
  providers: [HomeService],
  templateUrl: 'about.html'
})
export class AboutPage {
  public loader = this.loadingCtrl.create();
  pages : Array<string>;
  newsCategory : any;
  grid: Array<Array<string>>; //array of arrays
  constructor(public navCtrl: NavController, private homeService:HomeService, public loadingCtrl: LoadingController,
  storage: Storage) {
    //this.loader.present();
    this.homeService.getCategory(5)
     .subscribe(newsCategory => {this.newsCategory = newsCategory;
        }, error =>{storage.get('newsCategory').then((newsCategory) => {
                         this.newsCategory = newsCategory;
                        })
        });
    this.homeService.getPagesByParent(35)
     .subscribe(pages => {this.createGrid(pages);
        }, error =>{storage.get('pages').then((pages) => {
                         this.createGrid(pages);
                        })
        });  
  }
  createGrid(pagesArray){
    this.grid = Array(Math.ceil(pagesArray.length/2));
       let rowNum = 0; //counter to iterate over the rows in the grid
       for (let i = 0; i < pagesArray.length; i += 2) { //iterate images
         this.grid[rowNum] = Array(2); //declare two elements per row
         if (pagesArray[i]) { //check file 
           this.grid[rowNum][0] = pagesArray[i] //insert image
         }
         if (pagesArray[i + 1]) { //repeat for the second image
           this.grid[rowNum][1] = pagesArray[i + 1]
         }
         rowNum++; //go on to the next row
       }
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
