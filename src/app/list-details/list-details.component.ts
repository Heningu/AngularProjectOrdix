import { Component, OnInit, Input } from '@angular/core';
import { Template } from "../template";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from "../user.service";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {
  user: Template | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  goBack() {
    this.location.back();
  }
  save(): void {
    if (this.user) {
      this.userService.updateUser(this.user)
        .subscribe(() => this.goBack());
    }
  }
}
