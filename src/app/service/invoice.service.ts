import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseBody} from "../shared/ResponseBody";
import {Invoice} from "../shared/Invoice";
import URL_SERVICE from "../shared/helper";

@Injectable({ providedIn: 'root' })
export class InvoiceService {
    constructor(private httpClient: HttpClient) { }

    public getInvoiceById(idInvoice: number): Observable<ResponseBody<Invoice>> {
        return this.httpClient.get<ResponseBody<Invoice>>(`${ URL_SERVICE }/invoices/${ idInvoice }`);
    }
}
