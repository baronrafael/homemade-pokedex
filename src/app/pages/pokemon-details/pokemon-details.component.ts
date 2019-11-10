import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeService } from 'src/app/core/services/poke.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon: any;
  pokemonPic: string;

  constructor(
    private router: Router,
    private pokeService: PokeService
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('pokemon')){
      this.goToDashboard();
      return;
    }
    else{
      this.pokemon = JSON.parse(localStorage.getItem('pokemon'));
      this.getPkmnPic();
      console.log(this.pokemon);
      this.getPokemon();
    }
  }

  goToDashboard(){
    this.router.navigate(['']);
  }

  getPokemon(){
    this.pokeService.getPokemon(this.pokemon.name).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  getPkmnPic(){
    this.pokemonPic = 'https://img.pokemondb.net/sprites/black-white/anim/normal/'+ this.pokemon.name +'.gif'
  }

}
