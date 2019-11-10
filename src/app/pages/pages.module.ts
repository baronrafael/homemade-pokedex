import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [PagesComponent, DashboardComponent, PokemonDetailsComponent],
  imports: [CommonModule, SharedModule, PagesRoutingModule, ComponentsModule],
})
export class PagesModule {}
