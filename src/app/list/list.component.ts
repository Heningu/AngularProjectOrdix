import { Component, OnInit } from '@angular/core';
import { Template } from "../template";
import { UserService } from "../user.service";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: Template[] = [];

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({ name } as Template)
      .subscribe(user => {
        this.users.push(user);
      });
  }
  delete(user: Template): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.id).subscribe();
  }
}
