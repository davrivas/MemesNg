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
    errorMessage: string;

    private isBusy: boolean;
    private isNot200Code: boolean;

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

    get hasMemes(): boolean {
        return !this.isBusy && this.memes && this.memes.length !== 0;
    }

    get hasNotMemes(): boolean {
        return !this.isBusy && this.memes && this.memes.length === 0 && !this.isNot200Code;
    }

    get isLoading(): boolean {
        return this.isBusy;
    }

    get hasLoaded(): boolean {
        return !this.isBusy;
    }

    get hasFailed(): boolean {
        return !this.isBusy && this.isNot200Code;
    }

    constructor(private service: MemesService) {
        this.isBusy = true;
        this.isNot200Code = false;
    }

    ngOnInit(): void {
        this.service.getMemes().subscribe(
            (result: MemeApi) => {
                this.allMemes = result.data.memes;
                this.memes = this.allMemes;
                this.isBusy = !this.isBusy;
            },
            error => {
                this.errorMessage = error.message;
                this.isNot200Code = !this.isNot200Code;
                this.isBusy = !this.isBusy;
            }
        );
    }

    private performFilter(filter: string): Meme[] {
        filter = filter.toLocaleLowerCase();
        return this.allMemes.filter((meme: Meme) => meme.name.toLocaleLowerCase().indexOf(filter) !== -1);
    }

}
