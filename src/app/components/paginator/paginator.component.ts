import {
  Component,
  Input,
  EventEmitter,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'pokedex-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() rows: number;
  @Input() totalRecords: number;
  @Input() preselectedPage: number = 1;

  @Output() onPageChanged: EventEmitter<number>;

  totalPages: number;
  selectedPage: number;
  renderedPages: number[];

  readonly MAX_PAGES_TO_DISPLAY: number = 6;

  constructor() {
    this.onPageChanged = new EventEmitter<number>();
    this.renderedPages = [];
  }

  ngOnInit() {
    this.selectedPage = this.preselectedPage;
    this.totalPages = Math.ceil(this.totalRecords / this.rows);
    const maximumNumberOfPages =
      this.totalPages < this.MAX_PAGES_TO_DISPLAY
        ? this.totalPages
        : this.MAX_PAGES_TO_DISPLAY;
    this.renderedPages = Array.from(
      Array(maximumNumberOfPages),
      (_, x) => x + 1,
    );
  }

  // This is done in order to sync multiple instances
  // of the same paginator within the same parent component,
  // so that if multiple paginators use
  // the same preselectedPage variable in the parent,
  // they're gonna sync properly. Otherwise, they will be independent
  // from one another.
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'preselectedPage') {
        this.selectedPage = changes[propName].currentValue;
        this.updateRenderedPages();
      }
    }
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
    // The reason for this is because if, for instance, the new selected page is 2 on index 0 (i.e. [2, 3, 4, 5, 6, 7]),
    // rotation will hold a value of -2, and if we substract that to all the elements, the first element will become 0.
    // And since that's not a valid page, we do a computation to make it -1. So that, the first element will be 1.
    // Same thing occurs for the last index. In essence, we do this to re-compute a valid rotation if necessary.
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
