import { Component, Input } from '@angular/core';
import { ModalService } from '../../../service/modal.service';
import { Client, clientInitialState } from '../../../shared/Client';
import Swal from 'sweetalert2';
import { ClientService } from '../../../service/client.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css']
})
export class ClientModalComponent {
    @Input() client: Client = clientInitialState;
    public title: string = 'Information Client'
    public selectedPhoto?: File | null;

    constructor(
        public modalService: ModalService,
        public clientService: ClientService
    ) {}

    public selectPhoto(event: any): void {
        this.selectedPhoto = event.target.files[0];

        if (this.selectedPhoto != null && this.selectedPhoto.type.indexOf('image') < 0) {
            Swal.fire( 'Error selecting image:', 'The file must be of type image', 'error').then();
            this.selectedPhoto = null;
        }
    }

    public uploadPhoto(): void {
        if (!this.selectedPhoto) {
            Swal.fire('Error upload:', 'You must select a photo', 'error').then();
        } else {
            this.clientService.uploadPhotoByClientId(this.client.id, this.selectedPhoto)
                .subscribe(( event ) => {
                   if (event.type === HttpEventType.Response) {
                       let response: any = event.body;
                       this.client = response.client as Client;
                       this.modalService.notifyUpload.emit( this.client );

                       Swal.fire(
                           'The photo has been uploaded successfully',
                           response.mensaje,
                           'success'
                       ).then();
                   }
                   this.closeModal();
                    window.location.reload();
                });
        }
    }

    public closeModal(): void {
        this.selectedPhoto = null;
        this.modalService.closeModal();
    }
}
