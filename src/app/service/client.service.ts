import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import URL_SERVICE from "../shared/helper";
import {ResponseBody} from "../shared/ResponseBody";
import { Client } from "../shared/Client";
import Region from "../shared/Region";

@Injectable({ providedIn: 'root' })
export class ClientService {
    constructor(private httpClient: HttpClient) { }

    public createClient(client: Client): Observable<ResponseBody<Client>> {
        return this.httpClient.post<ResponseBody<Client>>(`${ URL_SERVICE }/clients`, client);
    }

    public getAllClients(page: number): Observable<any> {
        return this.httpClient.get<any>(`${ URL_SERVICE }/clients/page/${ page }`);
    }

    public getClientById(idClient: number): Observable<ResponseBody<Client>> {
        return this.httpClient.get<ResponseBody<Client>>(`${ URL_SERVICE }/clients/${ idClient }`);
    }

    public updateClientById(client: Client): Observable<ResponseBody<Client>> {
        return this.httpClient.put<ResponseBody<Client>>(`${ URL_SERVICE }/clients/${ client.id }`, client);
    }

    public deleteClientById(idClient: number): Observable<ResponseBody<Client>> {
        return this.httpClient.delete<ResponseBody<Client>>(`${ URL_SERVICE }/clients/${ idClient }`);
    }
}
