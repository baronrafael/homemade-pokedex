import { Component, OnInit } from '@angular/core';
import { PokeService } from 'src/app/core/services/poke.service';
import { PokemonListQueryResponse } from '../../core/models/entities/pokemon-list-query.response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private pokeService: PokeService) {}

  pokemons: PokemonListQueryResponse[];

  ngOnInit() {
    this.getAllPkmns();
  }

  getAllPkmns() {
    this.pokeService.getAllPkmns().subscribe(
      (res) => {
        this.pokemons = res;
      },
      (err) => {
        console.log(err);
      },
    );
  }
}
