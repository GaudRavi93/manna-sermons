import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/models/user';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public user: IUser;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.fetchData();
  }

  public updateAcc() {
    this.userService.updateUserData(this.user).subscribe();

  }

  private fetchData() {
    this.userService.getUserData().subscribe(res => {
      this.user = res;
    });
  }

}
