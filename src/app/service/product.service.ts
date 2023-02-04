import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from "../shared/Invoice";
import URL_SERVICE from "../shared/helper";
import { Observable } from "rxjs";
import { ResponseBody } from "../shared/ResponseBody";

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private httpClient: HttpClient) {}

    public filterProduct(term: string): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${ URL_SERVICE }/products?term=${ term }`);
    }
}
