import { Component } from '@angular/core';
import Client from "../../../shared/Client";
import Region from "../../../shared/Region";
import { ClientService } from "../../../service/client.service";
import { ActivatedRoute, Router } from "@angular/router";
import client from "../../../shared/Client";
import { ResponseError } from "../../../shared/ResponseError";
import { RegionService } from "../../../service/region.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
})
export class ClientFormComponent {
    public client: Client = { id: 0, name: '', lastName: '', email:'', photo:'', createAt: '', region: { id: 0, name: '' } };
    public title: string = "Create User";
    public errorList?: ResponseError<Error[]>;
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
                    .subscribe(( response ) => {
                        this.client = response.data as client;
                        this.client.region = this.client.region || { id: 0, name: '' }
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
                next: () => {
                    if (this.client.region.id != 0) {
                        this.clientService.setRegionToClient(this.client.id, this.client.region)
                            .subscribe();
                    }
                    this.route.navigate(['/client-list']);
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
                            if (this.client.region.id !== 0) {
                                this.clientService.setRegionToClient(response.data.id, this.client.region).subscribe();
                            }
                            Swal.fire(
                                response.message,
                                `Client ${response.data.name} successfully updated`,
                                'success'
                            ).then();
                            this.route.navigate(['/client-list']);
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
