import Region from './Region';
import { Invoice } from "./Invoice";

interface Client {
    id: number,
    name: string,
    lastName: string,
    createAt: string,
    email: string,
    photo: string,
    region: Region,
    invoiceList: Invoice[]
}

const clientInitialState: Client = { id: 0, name: '', lastName: '', email:'', photo:'', createAt: '', region: { id: 0, name: '' }, invoiceList: [] }

export { Client, clientInitialState };
