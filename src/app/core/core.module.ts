import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { PokeService } from './services/poke.service';

const CORE_PROVIDERS = [ApiService, PokeService];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [...CORE_PROVIDERS],
})
export class CoreModule {}
