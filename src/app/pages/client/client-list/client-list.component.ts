import { Component } from '@angular/core';
import Client from "../../../shared/Client";

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html'
})
export class ClientListComponent {
    public clientList: Client[] = [
        {
            id: 1,
            name: 'Alexis',
            lastName: 'López Gómez',
            createAt: '1/26/2023',
            email: 'ilegal_sprite@hotmail.com',
            photo: ''
        },
        {
            id: 1,
            name: 'Alexis',
            lastName: 'López Gómez',
            createAt: '1/26/2023',
            email: 'ilegal_sprite@hotmail.com',
            photo: ''
        },
        {
            id: 1,
            name: 'Alexis',
            lastName: 'López Gómez',
            createAt: '1/26/2023',
            email: 'ilegal_sprite@hotmail.com',
            photo: ''
        },
        {
            id: 1,
            name: 'Alexis',
            lastName: 'López Gómez',
            createAt: '1/26/2023',
            email: 'ilegal_sprite@hotmail.com',
            photo: ''
        }

    ];
}
