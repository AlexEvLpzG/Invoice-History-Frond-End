import { Component } from '@angular/core';
import Client from "../../../shared/Client";
import { ClientService } from "../../../service/client.service";
import { tap } from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html'
})
export class ClientListComponent {
    private page: number = 0;
    public clientList: Client[] = [];
    public paginator: any;

    constructor(
        private activateRoute: ActivatedRoute,
        private clientService: ClientService
    ) {}

    ngOnInit(): void {
        this.activateRoute.params.subscribe(( params ) => {
            this.page = params['page'] || this.page;
            this.clientService.getAllClients(this.page)
                .pipe(tap(( response ) => {
                    this.clientList = response.content as Client[];
                    this.paginator = response;
                }))
                .subscribe();
        });
    }
}
