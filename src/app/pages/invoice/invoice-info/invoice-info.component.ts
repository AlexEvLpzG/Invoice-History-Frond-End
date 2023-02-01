import { Component, OnInit } from '@angular/core';
import { calculateTotal, Invoice, invoiceInitialState, Item } from "../../../shared/Invoice";
import { InvoiceService } from "../../../service/invoice.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-invoice-info',
    templateUrl: './invoice-info.component.html',
})
export class InvoiceInfoComponent implements OnInit {
    public title: string = 'Invoice';
    public invoice: Invoice = invoiceInitialState;

    constructor(
        private invoiceService: InvoiceService,
        private activatedRoute: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.activatedRoute.params.subscribe(( params ) => {
               this.invoiceService.getInvoiceById(params['idInvoice'])
                   .subscribe(( invoice => this.invoice = invoice.data as Invoice ));
        });
    }

    public calculateAmount(item: Item): number {
        return item.quantity * item.product.price;
    }

    public getTotal(invoice: Invoice): number{
        return calculateTotal(invoice);
    }
}
