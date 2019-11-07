import { Component, OnInit, Input } from '@angular/core';
import { Meme } from './models/meme';
import { MemesService } from './services/MemesService';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
    private allMemes: Meme[];
    memes: Meme[];
    @Input() search: string;

    constructor(private service: MemesService, ) { }

    ngOnInit(): void {
        this.service.getMemes().subscribe(
            result => {
                this.allMemes = result.data.memes;
                this.memes = this.allMemes;
            },
            error => alert(`Error: ${error}`)
        );
    }
}
