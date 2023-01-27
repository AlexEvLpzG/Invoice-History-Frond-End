import { Component } from '@angular/core';
import Client from "../../../shared/Client";
import Swal from 'sweetalert2';
import { ClientService } from "../../../service/client.service";
import { tap } from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ResponseBody} from "../../../shared/ResponseBody";

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

    public ngOnInit(): void {
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

    public deleteClient(client: Client): void {
        Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        }).fire({
            title: 'Are you sure?',
            text: `Are you sure you want to remove the customer ${client.name} ${client.lastName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete!',
            cancelButtonText: '¡No, delete!'
        }).then(( result ) => {
            if( result.isConfirmed ){
                this.clientService.deleteClientById( client.id ).subscribe({
                    next: (response) => {
                        this.ngOnInit();
                        Swal.fire(
                            response.message,
                            `Client ${response.data.name} successfully removed`,
                            'success'
                        ).then();
                    },
                    error: () => {
                        Swal.fire(
                            'Error',
                            'Error deleting the Client',
                            'error'
                        ).then();
                    }
                });
            }
        });
    }
}
