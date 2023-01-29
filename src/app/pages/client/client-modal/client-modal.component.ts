import {Component, Input, OnInit} from '@angular/core';
import { ModalService } from "../../../service/modal.service";
import { Client, clientInitialState } from "../../../shared/Client";

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css']
})
export class ClientModalComponent implements OnInit{
    @Input() client: Client = clientInitialState;
    public title: string = "Information Client"
    public selectedPhoto?: File;
    public progress: number = 0;

    constructor(
        public modalService: ModalService
    ) {}

    public ngOnInit(): void {}
}
