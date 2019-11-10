import { NgModule } from '@angular/core';

import { PaginatorComponent } from './paginator/paginator.component';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
    PaginatorComponent,
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [CommonModule],
})
export class ComponentsModule {
}