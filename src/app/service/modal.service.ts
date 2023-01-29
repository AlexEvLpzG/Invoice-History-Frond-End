import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
    public isOpen: boolean = false;
    public notifyUpload = new EventEmitter<any>();
    constructor() { }

    public openModal(): void {
        this.isOpen = true;
    }

    public closeModal(): void {
        this.isOpen = false;
    }
}
