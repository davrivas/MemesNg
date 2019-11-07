import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MemeModule } from './components/memes/meme.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        MemeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
