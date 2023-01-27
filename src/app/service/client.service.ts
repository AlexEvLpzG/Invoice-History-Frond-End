import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import URL_SERVICE from "../shared/helper";
import {ResponseBody} from "../shared/ResponseBody";
import Client from "../shared/Client";

@Injectable({ providedIn: 'root' })
export class ClientService {
    constructor(private httpClient: HttpClient) { }

    public getAllClients(page: number): Observable<any> {
        return this.httpClient.get<any>(`${ URL_SERVICE }/clients/page/${ page }`);
    }

    public deleteClientById(idClient: number): Observable<ResponseBody<Client>> {
        return this.httpClient.delete<ResponseBody<Client>>(`${ URL_SERVICE }/clients/${ idClient }`);
    }
}
