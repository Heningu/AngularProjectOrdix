import { Component, OnInit } from '@angular/core';
import { NotificationsService } from "../notifications.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public notificationService: NotificationsService) {}

  ngOnInit() {
  }

}
