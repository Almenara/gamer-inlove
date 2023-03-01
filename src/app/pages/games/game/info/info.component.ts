import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';

import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';
import { ModalsService } from 'src/app/services/modals.service';

import { UserGame } from 'src/app/interfaces/user_game';
import { User } from 'src/app/interfaces/user';
import { GameData, GameSold } from 'src/app/interfaces/game_data';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  public gameData!: GameData;
  public minPrice: number | undefined = 0; 
  public averagePrice: number = 0; 
  public maxPrice: number = 0;
  public lastSoldPrice: number = 0;
  public forSaleCheaperPrice: number = 0;
  public totalForSale: number = 0;
  public lastSold: GameSold | undefined;

  public gameForSale!: UserGame[];

  public want: number | undefined = 0; 
  public have: number | undefined = 0; 

  public user!: User;
  public avatarURL:string = environment.baseUrl + environment.avatarPath;

  @ViewChild('loader', {static: false}) private loader!: ElementRef<HTMLDivElement>;
  public loadingMoreContent:boolean = false;
  public nextPageUrl:string = "";

  constructor(
    private gameService: GamesService,
    private authService: AuthService,
    private modalsService: ModalsService
    ){
    this.gameData = this.gameService.gameData;
    this.gameForSale = this.gameService.gameData.games_for_sale.data;
    this.nextPageUrl = this.gameService.gameData.games_for_sale.next_page_url;
    this.loadingMoreContent = this.nextPageUrl ? true: false;
    this.user = this.authService.user;

    this.gameService.gameDataSubject.subscribe(resp => {
      this.gameForSale = resp.games_for_sale.data;
      this.nextPageUrl = resp.games_for_sale.next_page_url;
      this.loadingMoreContent = this.nextPageUrl ? true: false;
      this.gameData = resp;
      this.caculateGameStats();
  
    });
    this.caculateGameStats();
  }

  caculateGameStats(){
    this.want = 0;
    this.have = 0;

    this.minPrice = 0; 
    this.averagePrice = 0; 
    this.maxPrice = 0;
    this.lastSoldPrice = 0;
    this.forSaleCheaperPrice = 0;
    this.totalForSale = 0;
    
    this.lastSold = undefined;

    if(this.gameData.stats){
      
      this.want = this.gameData.stats.wishlist;
      this.have = this.gameData.stats.collection.length;

      if(this.gameData.stats.sold.length){
        this.minPrice = this.gameData.stats.sold.reduce((prev, curr) => {
          return (prev.price < curr.price) ? prev : curr
        }).price;
        this.maxPrice = this.gameData.stats.sold.reduce((prev, curr) => {
          return (prev.price > curr.price) ? prev : curr
        }).price;
        this.averagePrice = this.gameData.stats.sold.reduce((acc, curr) => {
          return acc + curr.price
        },0)/this.gameData.stats.sold.length;
        this.lastSold = this.gameData.stats.sold.reduce((prev, curr) => {
            return (prev.updated_at > curr.updated_at) ? prev : curr;
        });

      }

      if(this.gameData.stats.collection && this.gameData.stats.collection.length > 0){

        let forSale = this.gameData.stats.collection.filter((game) => {return game.for_sale == 1});
        this.totalForSale = forSale.length;
        
        if(forSale.length > 0){
          this.forSaleCheaperPrice = forSale.reduce((prev, curr) => {
            return (prev.price < curr.price) ? prev : curr;
          }).price;

        }
      }
    }
  }

  openContactModal(userGame:UserGame){
    userGame.game = this.gameData.game;
    this.modalsService.openModal('contact', userGame);
  }
  
  openLoginModal(){
    this.modalsService.openModal('log-in');
  }

  openAddressModal(){
    this.modalsService.openModal('address');
  }

  nextPage(){
    this.loadingMoreContent = false;
    if(this.nextPageUrl && this.nextPageUrl != ""){
      this.gameService.getNextPageGamesForSale(this.nextPageUrl).subscribe(resp => {
        {
          resp.games_for_sale.data.map((game: any) => this.gameForSale.push(game));
          this.nextPageUrl = resp.games_for_sale.next_page_url
          
          if(this.nextPageUrl) 
            this.loadingMoreContent = true;
        }
      })
    }
  }

  @HostListener('document:scroll', ['$event'])
  loadNextPage(event: Event):void {
    if (this.loader && this.loadingMoreContent){
      let rect = this.loader.nativeElement.getBoundingClientRect();
      let topShown = rect.top <= window.innerHeight;
      if(topShown) this.nextPage();
    }
  }
}
