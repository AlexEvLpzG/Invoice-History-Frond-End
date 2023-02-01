import {Client, clientInitialState} from "./Client";

interface Product {
    id: number;
    name: number,
    price: number,
    createAt: string
}

interface Item {
    id: number;
    quantity: number;
    product: Product;
}

interface Invoice {
    id: number;
    description: string;
    observation: string,
    createAt: string,
    items: Item[],
    client: Client,
    total: number;
}

const calculateTotal = (invoice: Invoice): number => {
    invoice.total = 0;
    invoice.items.forEach(( item ) => {
        invoice.total += calculateAmount( item );
    });
    return invoice.total;
}

const calculateAmount = (item: Item): number => {
    return item.quantity * item.product.price;
}

const invoiceInitialState: Invoice = {
    id: 0,
    description: '',
    observation: '',
    createAt: '',
    items: [],
    client: clientInitialState,
    total: 0
}

export { Product, Item, Invoice, calculateTotal, calculateAmount, invoiceInitialState };
