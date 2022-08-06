import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ville } from '../common/ville';


@Injectable({
  providedIn: 'root'
})
export class VilleService {

  private villeUrl = 'http://localhost:8080/api/test/all/villes';

  constructor(private httpClient: HttpClient) { }

  getAllVilles(): Observable<Ville[]> {

    return this.httpClient.get<Ville[]>(this.villeUrl+'/');
  }

  getVille(id: number): Observable<Ville> {

    return this.httpClient.get<any>(this.villeUrl+'/'+id)
    
  }
}
