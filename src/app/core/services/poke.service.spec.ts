import { TestBed } from '@angular/core/testing';

import { PokeService } from './poke.service';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { ListQueryResponse } from '../models/http/list-query.response';
import { PokemonListQueryResponse } from '../models/entities/pokemon-list-query.response';

const fakePokemonData: ListQueryResponse<PokemonListQueryResponse> = {
  next: null,
  previous: null,
  count: 3,
  results: [
    {
      url: 'fake/url/1',
      name: 'FakePoKemon1',
    },
    {
      url: 'fake/url/2',
      name: 'FakePoKemon2',
    },
    {
      url: 'fake/url/3',
      name: 'FakePoKemon3',
    },
  ],
};

describe('PokeService', () => {
  let pokeService: PokeService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', {
      get: of(fakePokemonData),
    });
    TestBed.configureTestingModule({
      providers: [PokeService, { provide: ApiService, useValue: spy }],
    });

    pokeService = TestBed.get(PokeService);
    apiServiceSpy = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(pokeService).toBeTruthy();
  });

  it('returns the whole response body without modifying it on getAllPkmns', () => {
    const offset = 0,
      size = fakePokemonData.results.length;
    const expectedUrl = pokeService.getAllPokemonsUrl(offset, size);
    pokeService.getAllPkmns(offset, size).subscribe((res) => {
      expect(res).toEqual(fakePokemonData);
      expect(apiServiceSpy.get).toHaveBeenCalledWith(expectedUrl);
    });
  });
});
