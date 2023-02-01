import {Component, OnInit} from '@angular/core';
import { Client, clientInitialState } from "../../../shared/Client";
import {ClientService} from "../../../service/client.service";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { calculateTotal, Invoice } from "../../../shared/Invoice";

@Component({
    selector: 'app-client-info',
    templateUrl: './client-info.component.html'
})
export class ClientInfoComponent implements OnInit {
    public client: Client = clientInitialState;

    constructor(
       private clientService: ClientService,
       private route: Router,
       private activatedRoute: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.getInfoClient();
    }

    private getInfoClient(): void {
        this.activatedRoute.params.subscribe(( params ) => {
            if (params[ 'id' ]) {
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

    public getTotal(invoice: Invoice): number{
        return calculateTotal(invoice);
    }
}
