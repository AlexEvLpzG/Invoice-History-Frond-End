import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from "./component/footer/footer.component";
import {RouterModule, Routes} from "@angular/router";
import { ClientListComponent } from './pages/client/client-list/client-list.component';

const routes: Routes = [
    {path: 'client-list', component: ClientListComponent},
]

@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      ClientListComponent
    ],
    imports: [
      BrowserModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
