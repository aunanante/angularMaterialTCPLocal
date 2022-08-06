import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:8080/api/test/all/products';
  private productUrl1 = 'http://localhost:8080/api/test/all/categories_products';

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable< Product[]> {

    return this.httpClient.get< Product[]>(this.productUrl);
  }

  getProductById(id: number): Observable<Product> {

    return this.httpClient.get<any>(this.productUrl+'/'+id)
    
  }

  getProductByCategoryId(id: number): Observable<Product[]> {

    return this.httpClient.get<any>(this.productUrl1+'/'+id)
    
  }
}
