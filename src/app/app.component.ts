import { Component } from '@angular/core';
import Author from "./shared/global.types";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'Welcome to Invoice History';
    public author: Author = {
        name: 'Alexis',
        lastName: 'López Gómez',
        tagName: 'AlexiSkyline'
    };
    date: string = '1/25/2023'
}
