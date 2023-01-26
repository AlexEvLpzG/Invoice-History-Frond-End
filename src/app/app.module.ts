import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from "./component/footer/footer.component";
import { ClientListComponent } from './pages/client/client-list/client-list.component';
import { PaginatorComponent } from './component/paginator/paginator.component';

const routes: Routes = [
    {path: 'client-list', component: ClientListComponent},
    {path: 'client-list/page/:page', component: ClientListComponent},
]

@NgModule({
    declarations: [
          AppComponent,
          HeaderComponent,
          FooterComponent,
          ClientListComponent,
          PaginatorComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
