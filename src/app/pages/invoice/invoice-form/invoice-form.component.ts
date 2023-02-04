import { Component, OnInit } from '@angular/core';
import { calculateAmount, calculateTotal, Invoice, invoiceInitialState, Item, Product } from '../../../shared/Invoice';
import { ClientService } from '../../../service/client.service';
import { InvoiceService } from '../../../service/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import Swal from 'sweetalert2';

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

    public selectProduct(event: MatAutocompleteSelectedEvent): void {
        let product = event.option.value as Product;
        if (this.existItem(product.id)) {
            this.incrementAmount(product.id);
        } else {
            let newItem: Item = {
                id: 0,
                quantity: 1,
                product
            }
            this.invoice.items.push(newItem);
        }

        this.autocompleteControl.setValue('');
        event.option.focus();
        event.option.deselect();
    }

    public calAmount(item: Item): number {
        return calculateAmount(item);
    }

    public calTotal(invoice: Invoice): number {
        return calculateTotal(invoice);
    }

    public existItem(id: number): boolean {
        let exist = false;
        this.invoice.items.forEach((item: Item) => {
            if(id === item.product.id) {
                exist = true;
            }
        });
        return exist;
    }

    public incrementAmount(id: number): void {
        this.invoice.items = this.invoice.items.map(( item: Item ) => {
            if(id === item.product.id) {
                ++item.quantity;
            }
            return item;
        });
    }

    public updateQuantity(id: number, event: any): void {
        let quantity: number = event.target.value as number;
        if (quantity == 0) {
            return this.deleteItem(id);
        }

        this.invoice.items = this.invoice.items.map(( item: Item ) => {
            if (id == item.product.id) {
                item.quantity = quantity;
            }
            return item;
        });
    }

    public deleteItem(id: number): void {
        this.invoice.items = this.invoice.items
            .filter(( item: Item ) => item.product.id != id );
    }

    public createInvoice(invoiceForm: any): void {
        if (this.invoice.items.length == 0) {
            this.autocompleteControl.setErrors({ 'invalid': true });
        }

        if (invoiceForm.form.valid && this.invoice.items.length > 0) {
            this.invoiceService.createInvoice(this.invoice).subscribe({
                next: ( response ) => {
                    const id = response.data.id;
                    this.invoice.items.forEach(item => this.invoiceService.setInvoiceItem(id, item).subscribe());
                    this.invoiceService.setInvoiceClient(id, this.invoice.client).subscribe();
                    Swal.fire(this.title, `Invoice ${response.data.description} successfully Created`, 'success').then();
                    this.router.navigate(['/invoice-info', id]).then();
                }
            });
        }
    }
}
