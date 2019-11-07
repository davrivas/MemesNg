import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MemeApi } from '../models/MemeApi';

@Injectable({
    providedIn: 'root'
})
export class MemesService {
    private readonly url: string = 'https://api.imgflip.com/get_memes';

    constructor(private http: HttpClient) { }

    getMemes(): Observable<MemeApi> {
        return this.http.get<MemeApi>(this.url);
    }
}
