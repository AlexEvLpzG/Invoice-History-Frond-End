import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import URL_SERVICE from "../shared/helper";
import {ResponseBody} from "../shared/ResponseBody";
import Region from "../shared/Region";

@Injectable({ providedIn: 'root' })
export class RegionService {
    constructor(private httpClient: HttpClient) { }

    public getAllRegions(): Observable<ResponseBody<Region[]>> {
        return this.httpClient.get<ResponseBody<Region[]>>(`${ URL_SERVICE }/regions`);
    }
}
