import { Injectable } from '@angular/core';
import { Template } from "./template";
import { Observable, of } from 'rxjs';
import { NotificationsService } from "./notifications.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {

  private userUrl = 'http://127.0.0.1:8000/REST-Endpunkt/projekte/';  // URL to web api !!!!
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**/////////////////////////////////////////*/
  /** GET users from the server                       <- !!! USER API */
  getUsers(): Observable<Template[]> {
    return this.http.get<Template[]>(this.userUrl).pipe(
      tap(_ => this.log('fetched all users')),
      catchError(this.handleError<Template[]>('getUsers', []))
    );
  }
  // 404 with no user
  getUser(prj_nr: number): Observable<Template[]> {
    const url = `${this.userUrl}nr/${prj_nr}`;
   // console.log(prj_nr)
    return this.http.get<Template[]>(url).pipe(
      tap(_ => this.log(`fetched prj_nr=${prj_nr}`)),
      catchError(this.handleError<Template[]>(`getUser prj_nr=${prj_nr}`))
    );
  }

  getUserName(name: string): Observable<Template> {
    const url = `${this.userUrl}/${name}`;
    return this.http.get<Template>(url).pipe(
      tap(_ => this.log(`fetched the user name=${name}`)),
      catchError(this.handleError<Template>(`getUser name=${name}`))
    );
  }
  // Unnötiger Code, kann entfernt werden
  addUser(user: Template): Observable<Template> {
    return this.http.post<Template>(this.userUrl, user, this.httpOptions).pipe(
      tap((newUser: Template) => this.log(`added hero w/ prj_nr=${newUser.prj_nr}`)),
      catchError(this.handleError<Template>('addHero'))
    );
  }
  // Unnötiger Code, kann entfernt werden
  deleteUser(prj_nr: number): Observable<Template> {
    const url = `${this.userUrl}/${prj_nr}`;

    return this.http.delete<Template>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero prj_nr=${prj_nr}`)),
      catchError(this.handleError<Template>('deleteHero'))
    );
  }

  /* Suchfunktion!!! */
  searchUser(term: string): Observable<Template[]> {
    if (!term.trim()) {
      // Zeige nichts an bei leerer Eingabe
      return of([]);
    }
    return this.http.get<Template[]>(`${this.userUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`Found users with "${term}"`) :
        this.log(`Couldn't find users with "${term}"`)),
      catchError(this.handleError<Template[]>('searchUsers', []))
    );
  }

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService) { }

  // Unnötiger Code, kann entfernt werden
  updateUser(user: Template): Observable<any> {
    return this.http.put(this.userUrl, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero prj_nr=${user.prj_nr}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Unnötiger Code, kann entfernt werden
  private log(message: string) {
    this.notificationService.add(`HeroService: ${message}`);
  }
}
