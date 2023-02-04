import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '../shared/ResponseBody';
import { Invoice, Item } from '../shared/Invoice';
import URL_SERVICE from '../shared/helper';
import { Client } from '../shared/Client';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
    constructor(private httpClient: HttpClient) {}

    public createInvoice(invoice: Invoice): Observable<ResponseBody<Invoice>> {
        return this.httpClient.post<ResponseBody<Invoice>>(`${ URL_SERVICE }/invoices`, invoice);
    }

    public getInvoiceById(idInvoice: number): Observable<ResponseBody<Invoice>> {
        return this.httpClient.get<ResponseBody<Invoice>>(`${ URL_SERVICE }/invoices/${ idInvoice }`);
    }

    public deleteInvoiceById(idInvoice: number): Observable<ResponseBody<Invoice>> {
        return this.httpClient.delete<ResponseBody<Invoice>>(`${ URL_SERVICE }/invoices/${ idInvoice }`);
    }

    public setInvoiceClient(idInvoice: number, client: Client): Observable<ResponseBody<Invoice>> {
        return this.httpClient.patch<ResponseBody<Invoice>>(`${ URL_SERVICE }/invoices/${ idInvoice }/client`, client);
    }

    public setInvoiceItem(idInvoice: number, item: Item): Observable<ResponseBody<Invoice>> {
        return this.httpClient.patch<ResponseBody<Invoice>>(`${ URL_SERVICE }/invoices/${ idInvoice }/item`, item);
    }
}
