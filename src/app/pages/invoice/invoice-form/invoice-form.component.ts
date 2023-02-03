import { Component, OnInit } from '@angular/core';
import {Invoice, invoiceInitialState, Item, Product} from '../../../shared/Invoice';
import {flatMap, map, Observable, switchMap} from 'rxjs';
import { ClientService } from '../../../service/client.service';
import { InvoiceService } from '../../../service/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../shared/Client';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {FormControl} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ResponseBody} from "../../../shared/ResponseBody";

@Component({
      selector: 'app-invoice-form',
      templateUrl: './invoice-form.component.html',
})
export class InvoiceFormComponent implements OnInit {
    public title: string = 'New Invoice';
    public invoice: Invoice = invoiceInitialState;
    public filterProduct?: Observable<Product[]>;
    public autocompleteControl = new FormControl();

    constructor(
        private clientService: ClientService,
        private invoiceService: InvoiceService,
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.activatedRoute.params.subscribe(( params ) => {
            this.clientService.getClientById(params['idClient'])
                .subscribe(( response ) => this.invoice.client = response.data );
        });

        this.filterProduct = this.autocompleteControl.valueChanges
            .pipe(
                map(( value ) => typeof value === 'string' ? value : value.name),
                switchMap(( value: string ) => value ? this._filterProduct( value ): [])
            );
    }

    public _filterProduct(value: string): Observable<Product[]> {
        return this.productService.filterProduct(value.toLowerCase());
    }

    public showName(product?: Product): string | undefined {
        return product ? product.name : undefined;
    }

    selectProduct(event: MatAutocompleteSelectedEvent): void {
        let product = event.option.value as Product;

        this.autocompleteControl.setValue('');
        event.option.focus();
        event.option.deselect();
    }
}
