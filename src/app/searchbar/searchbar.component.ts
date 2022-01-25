import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Template } from "../template";
import { UserService } from "../user.service";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: [ './searchbar.component.css' ]
})
export class SearchbarComponent implements OnInit {
  users$!: Observable<Template[]>;
  private searchTerms = new Subject<string>();
  // Push a search term into the observable stream.
  search(term: string): void {                         // | term: number ?? Wie suche ich nach einer ID in der Suchbar mit der search Funktion? NYG
    this.searchTerms.next(term);
  }

  constructor(private heroService: UserService) {}



  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),                        // wait 300ms


      distinctUntilChanged(),                           // ignore new term if same as previous term

      switchMap((term: string) => this.heroService.searchUser(term)),
    );
  }
}
