import { Component, OnInit } from '@angular/core';
import { Meme } from './models/meme';
import { MemesService } from './services/MemesService';
import { MemeApi } from './models/MemeApi';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
    memes: Meme[];
    isBusy: boolean;

    private allMemes: Meme[];

    // tslint:disable-next-line: variable-name
    private _search: string;
    get search() {
        return this._search;
    }

    set search(value: string) {
        this._search = value;
        this.memes = this.search ? this.performFilter(this.search) : this.allMemes;
    }

    constructor(private service: MemesService) {
        this.isBusy = true;
    }

    ngOnInit(): void {
        this.service.getMemes().subscribe(
            (result: MemeApi) => {
                this.allMemes = result.data.memes;
                this.memes = this.allMemes;
                this.isBusy = !this.isBusy;
            },
            error => alert(`An error ocurred: ${error.message}`)
        );
    }

    private performFilter(filter: string): Meme[] {
        filter = filter.toLocaleLowerCase();
        return this.allMemes.filter((meme: Meme) => meme.name.toLocaleLowerCase().indexOf(filter) !== -1);
    }

}
