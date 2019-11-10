import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('pokemon')){
      this.goToDashboard();
      return;
    }
    else{
      this.pokemon = JSON.parse(localStorage.getItem('pokemon'));
      console.log(this.pokemon);
    }
  }

  goToDashboard(){
    this.router.navigate(['']);
  }

}
