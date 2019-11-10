import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { ListQueryResponse } from '../models/http/list-query.response';
import { PokemonListQueryResponse } from '../models/entities/pokemon-list-query.response';
import { cacheResult } from '../operators/rx/cache-result';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private readonly getAllpkmnsUrl;

  constructor(private http: ApiService) {
    this.getAllpkmnsUrl = 'pokemon?offset=0&limit=807';
  }

  getAllPkmns() {
    return this.http
    .get<ListQueryResponse<PokemonListQueryResponse>>(this.getAllpkmnsUrl)
    .pipe(
      map((resp) => {
        return resp.results;
      }),
       cacheResult(),
    );
  }

  getPokemon(pokename: string){
    return this.http.get('pokemon/'+pokename).pipe(
      map((resp) => {
        return resp;
      }),
       cacheResult(),
    );
  }

}
