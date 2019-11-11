import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeService } from 'src/app/core/services/poke.service';
import { PokemonListQueryResponse } from '../../core/models/entities/pokemon-list-query.response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pokemons: PokemonListQueryResponse[];
  pokemonsPic: string[];

  private pokemonPage: number;
  private pokemonPageSize: number;
  private totalPokemons: number;

  constructor(private router: Router, private pokeService: PokeService) {
    this.pokemonPage = 1;
    this.pokemonPageSize = 10;
  }

  ngOnInit() {
    this.getAllPkmns();
  }

  goToPkmnDetails() {
    this.router.navigate(['/pages/pokemon-details']);
  }

  getAllPkmns() {
    const offset = (this.pokemonPage - 1) * this.pokemonPageSize;
    this.pokeService.getAllPkmns(offset, this.pokemonPageSize).subscribe(
      (res) => {
        this.pokemons = res['results'];
        this.totalPokemons = res['count'];
        this.getPokmnsPics();
      },
      (err) => {
        console.log(err);
      },
    );
  }
  getPokmnsPics() {
    this.pokemonsPic = [];
    for (let i = 0; i < this.pokemons.length; i++) {
      //this.pokemonsPic.push('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ i +'.png');
      if (i < 649) {
        if (this.pokemons[i].name == 'darmanitan-standard') {
          this.pokemons[i].name = 'darmanitan-standard-mode';
        }
        this.pokemonsPic.push(
          'https://img.pokemondb.net/sprites/black-white/anim/normal/' +
            this.pokemons[i].name +
            '.gif',
        );
      } else {
        let j = i + 1;
        this.pokemonsPic.push(
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
            j +
            '.png',
        );
      }
    }
  }

  selectPkmn(item) {
    localStorage.setItem('pokemon', JSON.stringify(item));
    this.goToPkmnDetails();
  }

  onPageChange(newPage: number) {
    this.pokemonPage = newPage;
    this.pokemons = [];
    this.getAllPkmns();
  }

  getPokeId(url: string): string {
    const pokemonUrlSections = url.split('/');
    // We substract 2 instead of 1 because the url ends with '/'
    // So the last element (-1) happens to be an empty string.
    const pokemonId = pokemonUrlSections[pokemonUrlSections.length - 2];
    return pokemonId;
  }
}
