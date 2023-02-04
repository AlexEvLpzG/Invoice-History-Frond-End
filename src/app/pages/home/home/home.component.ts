import { Component } from '@angular/core';
import Author from "../../../shared/global.types";

@Component({
      selector: 'app-home',
      templateUrl: './home.component.html',
})
export class HomeComponent {
    public author: Author = {
        name: 'Alexis Evaristo',
        lastName: 'López Gómez',
        tagName: 'AlexiSkyline'
    }
}
