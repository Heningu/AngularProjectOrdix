import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Template} from "./template";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, name: 'Dr Nice', status: "X", startd: "2014-09-29", endd: "2015-01-29" },
      { id: 12, name: 'Narco', status: "X", startd: "2014-09-29", endd: "2015-01-29" },
      { id: 13, name: 'Bombasto', status: "X", startd: "2014-09-29", endd: "2015-01-29" },
      { id: 14, name: 'Celeritas', status: "X", startd: "2014-09-29", endd: "2015-01-29" },
      { id: 15, name: 'Magneta', status: "X", startd: "2014-09-29", endd: "2015-01-29" },
      { id: 16, name: 'RubberMan', status: "X", startd: "2014-09-29", endd: "2015-01-29" },
      { id: 17, name: 'Dynama', status: "X", startd: "2014-09-29", endd: "2015-01-29" },
      { id: 18, name: 'Dr IQ', status: "X", startd: "2014-09-29", endd: "2015-01-29" },
      { id: 19, name: 'Magma', status: "X", startd: "2014-09-29", endd: "2015-01-29" },
      { id: 20, name: 'Tornado', status: "X", startd: "2014-09-29", endd: "2015-01-29" }
    ];
    return {users};
  }



  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(users: Template[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
