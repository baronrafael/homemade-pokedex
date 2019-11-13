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

  constructor(
    private router: Router,
    private pokeService: PokeService
  )
  { }

  pokemons: PokemonListQueryResponse[];
  filteredPokemons: any[] = [];

  _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredPokemons = this.listFilter ? this.doFilter(this.listFilter) : this.pokemons;
  }

  doFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.pokemons.filter((pokemon: any) =>
    pokemon.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  

  ngOnInit() {
    this.getAllPkmns();
  }

  goToPkmnDetails(){
    this.router.navigate(['/pages/pokemon-details']);
  }

  getAllPkmns() {
    this.pokeService.getAllPkmns().subscribe(
      (res) => {
        this.pokemons = res;
        this.getPokmnsPics();
        this.filteredPokemons = this.pokemons;
        this.listFilter = '';
      },
      (err) => {
        console.log(err);
      },
    );
  }
  getPokmnsPics(){
    for(let i = 0; i < this.pokemons.length; i++){
      //this.pokemonsPic.push('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ i +'.png');
      this.pokemons[i].number = i + 1;
      if(i < 649){
        if(this.pokemons[i].name == 'darmanitan-standard'){
          this.pokemons[i].name = 'darmanitan-standard-mode';
        }
        this.pokemons[i].sprite = 'https://img.pokemondb.net/sprites/black-white/anim/normal/'+ this.pokemons[i].name +'.gif';
      }
      else{
        let j = i+1;
        this.pokemons[i].sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ j +'.png';
      }
    }
  }

  selectPkmn(item){
    localStorage.setItem('pokemon', JSON.stringify(item));
    this.goToPkmnDetails();
  }
}
