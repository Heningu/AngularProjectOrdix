import { Component, OnInit } from '@angular/core';
import { Template } from "../template";
import { UserService } from "../user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  users: Template[] = [];
  list = ['Project ORDIX'] // Name für Typewriter


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }
}
