import { Component, OnInit, Input } from '@angular/core';
import { Template } from "../template";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from "../user.service";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {
  user$: Template[] = [];     // Kein Standart User





  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location

  ) {
    //this.route.params.subscribe( params => console.log('Test', params['prj_nr']) );
  }

  ngOnInit(): void {
    //if (this.getUser())
    this.route.params.subscribe( params => this.getUser( params['prj_nr']) );


  }


  getUser(prj_nr: number): void {

    console.log('Test', prj_nr)
  //  const prj_nr = Number(this.route.snapshot.paramMap.get('prj_nr'));      // Nutzt den User aus der "Route" (url)

    this.userService.getUser(prj_nr)
      .subscribe(user => {
       this.user$ = user;
        console.log(user);
      });
  }


  /*goBack() {
    this.location.back();
  }
  save(): void {
    if (this.user) {
      this.userService.updateUser(this.user)
        .subscribe(() => this.goBack());
    }
  }*/
}
