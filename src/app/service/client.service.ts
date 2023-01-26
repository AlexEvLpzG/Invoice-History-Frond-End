import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import URL_SERVICE from "../shared/helper";

@Injectable({ providedIn: 'root' })
export class ClientService {
    constructor(private httpClient: HttpClient) { }

    public getAllClients(page: number): Observable<any> {
        return this.httpClient.get<any>(`${ URL_SERVICE }/clients/page/${ page }`);
    }
}
