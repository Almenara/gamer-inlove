import { Component, Input, OnInit } from '@angular/core';
import { RankingGames } from 'src/app/interfaces/ranking_games';

@Component({
  selector: 'app-top-gallery',
  templateUrl: './top-gallery.component.html',
  styleUrls: ['./top-gallery.component.scss']
})
export class TopGalleryComponent implements OnInit{
  
  @Input() title: string = "";
  @Input() rankingGames!: RankingGames[];
  
  public indexGame: number = 0;

  constructor(){
  }
  ngOnInit(): void {
    console.log(this.rankingGames)
  }
  prev(){
    console.log('prev');
  }
  next(){
    console.log('next');
  }
}
