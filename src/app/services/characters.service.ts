import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Character } from '../models/chacrater.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  url = "https://rickandmortyapi.com/api/character";

  constructor(    private http: HttpClient,) { }


  getAllCharcters(){
    return this.http.get<any>(this.url);
  }
}
