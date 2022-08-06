import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commerce } from '../common/commerce';


@Injectable({
  providedIn: 'root'
})
export class CommerceService {
  
  private commerceUrl = 'http://localhost:8080/api/test/all/commerces';
  private commerceUrl1 = 'http://localhost:8080/api/test/all/villes_commerces';

  constructor(private httpClient: HttpClient) { }

  getAllCommerces(): Observable<Commerce[]> {

    return this.httpClient.get<Commerce[]>(this.commerceUrl);
  }

  getCommerceById(id: number): Observable<Commerce> {

    return this.httpClient.get<any>(this.commerceUrl+'/'+id)
    
  }

  getCommerceByVilleId(id: number): Observable<Commerce[]> {

    return this.httpClient.get<any>(this.commerceUrl1+'/'+id)
    
  }
}
