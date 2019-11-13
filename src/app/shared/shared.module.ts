import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, FlexLayoutModule],
  exports: [FormsModule, FlexLayoutModule],
})
export class SharedModule {}
