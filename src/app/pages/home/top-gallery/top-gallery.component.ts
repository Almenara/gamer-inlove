import { Component, Input, OnInit, ViewChild, ElementRef, HostListener, ComponentFactoryResolver } from '@angular/core';
import { RankingGames } from 'src/app/interfaces/ranking_games';

@Component({
  selector: 'app-top-gallery',
  templateUrl: './top-gallery.component.html',
  styleUrls: ['./top-gallery.component.scss']
})
export class TopGalleryComponent implements OnInit{
  
  @Input() title: string = "";
  @Input() rankingGames!: RankingGames[];
  
  @ViewChild('gallery') gallery!: ElementRef;
  @ViewChild('nextButton') nextButton!: ElementRef;
  @ViewChild('prevButton') prevButton!: ElementRef;

  public galleryElementWidth: number = 0;

  public galleryTotalWidth: number = 0;

  public indexGame: number = 0;

  public currentElement: number = 0;

  public currentScroll: number = 0;

  constructor(){
  }
  ngOnInit(): void {
    
  }
  ngAfterViewInit() {  
    this.getGalleryElementwidth();
  }
  prev(){
    let gallery = this.gallery.nativeElement as HTMLElement;
    this.currentElement --;
    gallery.scrollLeft = this.galleryElementWidth * this.currentElement;
  }
  next(){
    let gallery = this.gallery.nativeElement as HTMLElement;
    this.currentElement ++;
    gallery.scrollLeft = this.galleryElementWidth * this.currentElement;
  }
  getGalleryElementwidth(){
    let gallery = this.gallery.nativeElement as HTMLElement;
    let galleryElement = gallery.children[0] as HTMLElement;
    let nextButton = this.nextButton.nativeElement as HTMLElement;
    let prevButton = this.prevButton.nativeElement as HTMLElement;
    this.galleryElementWidth = galleryElement.offsetWidth + 20;
    this.galleryTotalWidth = this.galleryElementWidth * gallery.children.length;
    gallery.addEventListener('scroll', () => {
      this.currentScroll = gallery.scrollLeft;
      if(this.currentScroll == (this.galleryTotalWidth - (gallery.offsetWidth - 40)) || this.galleryTotalWidth < gallery.offsetWidth)
        nextButton.classList.add('disabled');
      else
        nextButton.classList.remove('disabled');

      if(this.currentScroll == 0 || this.currentElement == 0)
        prevButton.classList.add('disabled');
      else
        prevButton.classList.remove('disabled');

    }, false)
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getGalleryElementwidth();
    let gallery = this.gallery.nativeElement as HTMLElement;
    this.currentScroll = this.galleryElementWidth * this.currentElement;
    gallery.scrollLeft = this.currentScroll;
  }
}
