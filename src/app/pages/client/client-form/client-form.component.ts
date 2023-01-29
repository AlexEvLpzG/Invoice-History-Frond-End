import { Component, OnInit } from '@angular/core';
import { Client, clientInitialState } from "../../../shared/Client";
import Region from "../../../shared/Region";
import { ClientService } from "../../../service/client.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RegionService } from "../../../service/region.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
})
export class ClientFormComponent implements OnInit {
    public client: Client = clientInitialState;
    public title: string = "Create User";
    public regions: Region[] = [];

    constructor(
        private clientService: ClientService,
        private regionService: RegionService,
        private route: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.getInfoClient();
        this.getListRegion();
    }

    private getInfoClient() {
        this.activatedRoute.params.subscribe(( params ) => {
            if (params[ 'id' ]) {
                this.title = 'Update Client';
                this.clientService.getClientById(params[ 'id' ])
                    .subscribe({
                        next: ( response ) => {
                            this.client = response.data as Client;
                            this.client.region = this.client.region || { id: 0, name: '' }
                        }, error: () => {
                            Swal.fire(
                                'Error',
                                'Error Found Client',
                                'error'
                            ).then();
                            this.route.navigate(['/client-list']).then();
                        }
                    });
            }
        });
    }

    private getListRegion() {
        this.regionService.getAllRegions().subscribe(( response ) => {
            this.regions = response.data as Region[];
        });
    }

    public saveClient(): void {
        this.clientService.createClient(this.client)
            .subscribe({
                next: ( response ) => {
                    Swal.fire(
                        response.message,
                        `Client ${response.data.name} successfully Created`,
                        'success'
                    ).then();
                    this.route.navigate(['/client-list']).then();
                },
                error: () => {
                    Swal.fire(
                        'Error',
                        'Error Check Inputs filed',
                        'error'
                    ).then();
                }
            });
    }

    public updateClient(): void {
        if (this.client && this.client.id != 0) {
            Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success mr-2',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            }).fire({
                title: 'Are you sure?',
                text: `Are you sure you want to update the customer ${this.client.name} ${this.client.lastName}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Update!',
                cancelButtonText: '¡No, Update!'
            }).then(( result ) => {
                if( result.isConfirmed ){
                    this.clientService.updateClientById( this.client ).subscribe({
                        next: (response) => {
                            Swal.fire(
                                response.message,
                                `Client ${response.data.name} successfully updated`,
                                'success'
                            ).then();
                            this.route.navigate(['/client-list']).then();
                        },
                        error: () => {
                            Swal.fire(
                                'Error',
                                'Error Update the Client',
                                'error'
                            ).then();
                        }
                    });
                }
            });
        }
    }
}
