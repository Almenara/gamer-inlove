import { interval, Subscription, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { UserNotification } from '../interfaces/user_notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private intervalTime = interval(120000);
  public newNotificationAlertActive: boolean = false;
  public hasNotifications = new Subject<boolean>();
  public newNotifications = new Subject<boolean>();
  private intervalSubscription!: Subscription;
  private user!: User;

  public notificationsDataSubject = new Subject<Notification[]>();


  constructor(
    private authService: AuthService,
    private http: HttpClient, 
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

  refreshNotifications(){

    //if(!this.authService.auth.ok) this.intervalSubscription.unsubscribe();

    if(!this.intervalSubscription || this.intervalSubscription.closed){

      this.intervalSubscription = this.intervalTime.subscribe(() => this.refreshNotifications());

    }

    if(!this.newNotificationAlertActive){

      const URLService = environment.baseUrl + "/api/notification/are-there-news";
    
      let headers = new HttpHeaders();
      headers = headers.append('Acept', 'application/json');
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
  
      this.http.get<any>(URLService,{ headers }).subscribe(
        {
          next: resp => {
            if(resp.hasNotifications > 0){
              this.hasNotifications.next(true);
            }
            else{
              this.hasNotifications.next(false);
              this.newNotifications.next(false);
            }

            if(resp.newNotifications > 0){
              this.newNotificationAlertActive = true;
              this.newNotifications.next(true);
            }

          },
          error: error => console.log(error)
        }
      );
    }
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
      headers = headers.append('Acept', 'application/json');
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
  
      return this.http.get<UserNotification[]>(URLService,{ headers })
  }
  
  ngOnDestroy() {
    //this.intervalSubscription.unsubscribe();
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }
}
