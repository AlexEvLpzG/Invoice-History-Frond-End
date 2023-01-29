import {Component, OnInit} from '@angular/core';
import { Client, clientInitialState } from "../../../shared/Client";
import Swal from 'sweetalert2';
import { ClientService } from "../../../service/client.service";
import { tap } from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ModalService} from "../../../service/modal.service";

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
    private page: number = 0;
    public clientList: Client[] = [];
    public paginator: any;
    public selectedClient: Client = clientInitialState;

    constructor(
        private activateRoute: ActivatedRoute,
        private clientService: ClientService,
        private modalService: ModalService
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

        this.modalService.notifyUpload.subscribe(client => {
            this.clientList = this.clientList.map(originalClient => {
                if(client.id == originalClient.id)
                {
                    originalClient.photo = client.photo;
                }
                return originalClient;
            });
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

    public openModal(client: Client): void {
        this.selectedClient = client;
        this.modalService.openModal();
    }
}
