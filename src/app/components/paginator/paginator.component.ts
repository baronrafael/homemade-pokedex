import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pokedex-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() rows: number;
  @Input() totalRecords: number;

  @Output() onPageChanged: EventEmitter<number>;

  private totalPages: number;
  private selectedPage: number;
  private renderedPages: number[];

  constructor() {
    this.onPageChanged = new EventEmitter<number>();
  }

  ngOnInit() {
    this.selectedPage = 1;
    this.totalPages = this.totalRecords / this.rows;
    if (this.totalRecords % this.rows != 0) {
      this.totalPages += 1;
    }
    const maximumNumberOfPages = this.totalPages < 6 ? this.totalPages : 6;
    this.renderedPages = Array.from(
      Array(maximumNumberOfPages),
      (_, x) => x + 1,
    );
  }

  updateRenderedPages() {
    // The reason why we compute an offset is because
    // we want the selected page to be located in the middle.
    // So basically if there are 6 pages displayed, and
    // we select the fourth page it'll rotate (aka substract)
    // the renderedPages array one to the left (aka substract one to its elements).
    // Since the offset will be 3 -> (6/2).
    // So 4(page) - 3(offset) = 1 (to the left).
    const selectedPageOffset = this.renderedPages.length / 2;
    const selectedPageIndex =
      this.renderedPages.findIndex((x) => x == this.selectedPage) + 1;
    let rotation = selectedPageIndex - selectedPageOffset;
    // In case of 'rotation' holding a value that
    // added or subtracted to the elements of the array
    // exceeds the valid range of pages,
    // we need to recompute it using its own value as an offset.
    if (this.renderedPages[0] + rotation <= 0) {
      rotation -= this.renderedPages[0] + rotation - 1;
    } else if (
      this.renderedPages[this.renderedPages.length - 1] + rotation >
      this.totalPages
    ) {
      rotation -=
        this.renderedPages[this.renderedPages.length - 1] +
        rotation -
        this.totalPages;
    }
    this.renderedPages = this.renderedPages.map((x) => x + rotation);
  }

  updateActualPage(page) {
    if (page <= 0 || page > this.totalPages) {
      return;
    }
    this.selectedPage = page;
    this.onPageChanged.emit(this.selectedPage);
    this.updateRenderedPages();
  }
}
