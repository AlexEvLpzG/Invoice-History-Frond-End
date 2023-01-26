import { Component } from '@angular/core';
import Author from "../../shared/global.types";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    public author: Author = {
        name: 'Alexis',
        lastName: 'López Gómez',
        tagName: 'AlexiSkyline'
    };
}
