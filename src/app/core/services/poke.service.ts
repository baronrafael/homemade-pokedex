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
  constructor(private http: ApiService) {}

  getAllPokemonsUrl = (offset, size) =>
    `pokemon?offset=${offset}&limit=${size}`;

  getAllPkmns(offset: number, size: number) {
    const url = this.getAllPokemonsUrl(offset, size);
    return this.http.get<ListQueryResponse<PokemonListQueryResponse>>(url).pipe(
      map((resp) => {
        return resp;
      }),
      cacheResult(),
    );
  }

  getPokemon(pokename: string) {
    return this.http.get('pokemon/' + pokename).pipe(
      map((resp) => {
        return resp;
      }),
      cacheResult(),
    );
  }
}
