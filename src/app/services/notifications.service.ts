import { ActivatedRoute, ParamMap } from '@angular/router';
import { interval, Subscription, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Howl } from 'howler';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { UserNotification } from '../interfaces/user_notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  
  public newNotificationAlertActive: boolean = false;
  public hasNotifications = new Subject<boolean>();
  public newNotifications = new Subject<boolean>();
  public idConversation: number | null = null;

  private intervalTime = interval(5000);//interval(120000);
  private intervalSubscription!: Subscription;
  private user!: User;

  public notificationsList: UserNotification[] = [];


  constructor(
    private authService: AuthService,
    private http: HttpClient, 
    private route: ActivatedRoute,
    ) {     
      this.user = authService.user;
      this.hasNotifications.next(false);
      this.newNotifications.next(false);
      this.authService.authOkSubject.subscribe(ok => { 
        if(ok){
          this.refreshNotifications()  
          if(!this.intervalSubscription || this.intervalSubscription.closed){
            this.intervalSubscription = this.intervalTime.subscribe(() => this.refreshNotifications());
          }
        }
        else{
          this.hasNotifications.next(false);
          this.newNotifications.next(false);
          this.intervalSubscription.unsubscribe();
          this.newNotificationAlertActive = false;
        }
    });
  }

  playAudioNotification(){
    const sound = new Howl({
      src: ['/assets/sounds/marioCoin.mp3']
    });
    sound.play();
  }
  refreshNotifications(){

    //if(!this.authService.auth.ok) this.intervalSubscription.unsubscribe();

    if(!this.intervalSubscription || this.intervalSubscription.closed){

      this.intervalSubscription = this.intervalTime.subscribe(() => this.refreshNotifications());

    }

      const URLService = environment.baseUrl + "/api/notification/are-there-news";
    
      let headers = new HttpHeaders();
      headers = headers.append('Accept', 'application/json');
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
  
      this.http.get<UserNotification[]>(URLService,{ headers }).subscribe(
        {
          next: resp => {
            console.log(resp);
            
            let notifications = resp;
            
            if(this.idConversation){
              notifications = notifications.filter( not => { 
                if(not.conversation_id == this.idConversation){
                  this.deleteNotification(not.id);
                }
                return not.conversation_id != this.idConversation 
              })
            }
            
            
            let news =  notifications.filter(not => {return !not.seen});
            
            if(notifications.length > 0){
              this.hasNotifications.next(true);
            }
            else{
              this.hasNotifications.next(false);
              this.newNotifications.next(false);
            }
            
            if(notifications.length > this.notificationsList.length){
              if(news.length > 0){
                this.playAudioNotification();
                this.notificationsList = notifications;
                this.newNotificationAlertActive = true;
              }
              this.newNotifications.next(true);
            }

          },
          error: error => console.log(error)
        }
      );
  }
  
  getHasNotifications(): Subject<boolean>{
    return this.hasNotifications;
  }

  getNewNotifications(): Subject<boolean>{
    return this.newNotifications;
  }

  getAllUserNotifications(){
    const URLService = environment.baseUrl + "/api/notification/all-of-user";
    
      let headers = new HttpHeaders();
      headers = headers.append('Accept', 'application/json');
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
  
      return this.http.get<UserNotification[]>(URLService,{ headers })
  }

  deleteAllNotifications(){
    
    const URLService = environment.baseUrl + "/api/notification/delete-all-notifications";
    
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
    
    this.http.delete<any>(URLService,{ headers }).subscribe();

    this.notificationsList = [];

  }

  deleteNotification(id:number){
    const URLService = environment.baseUrl + "/api/notification/delete-notification/" + id;
    
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${this.getToken()}`);

    this.http.delete<any>(URLService,{ headers }).subscribe();
    
    this.notificationsList = this.notificationsList.filter(not => {return not.id != id});
  
  }
  
  ngOnDestroy() {
    //this.intervalSubscription.unsubscribe();
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }
}
