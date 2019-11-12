import { PaginatorComponent } from './paginator.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('computes renderedPages and totalPages properly', () => {
    const tests = [
      {
        rows: 10,
        totalRecords: 200,
        preselectedPage: 1,
        expectedTotalPages: 20, // totalRecords divided by rows.
        expectedRenderedPages: [1, 2, 3, 4, 5, 6],
      },
      {
        rows: 10,
        totalRecords: 20,
        preselectedPage: 2,
        expectedTotalPages: 2,
        expectedRenderedPages: [1, 2],
      },
      {
        rows: 10,
        totalRecords: 21,
        preselectedPage: 1,
        expectedTotalPages: 3, // totalRecords % rows != 0 so we need to add 1.
        expectedRenderedPages: [1, 2, 3],
      },
    ];
    tests.forEach((test) => {
      component.rows = test.rows;
      component.totalRecords = test.totalRecords;
      component.preselectedPage = test.preselectedPage;
      fixture.detectChanges();
      // detectChanges doesn't trigger ngOnInit again
      // so we need to call it manually.
      // NOTE: There's probably a better way to do this.
      component.ngOnInit();
      expect(component.selectedPage).toEqual(test.preselectedPage);
      expect(component.totalPages).toEqual(test.expectedTotalPages);
      expect(component.renderedPages).toEqual(test.expectedRenderedPages);
    });
  });

  it('updates selectedPage on ngOnChanges hook fired', () => {
    const props = {
      rows: 10,
      totalRecords: 200,
      preselectedPage: 1,
      newPreselectedPage: 2,
    };
    component.rows = props.rows;
    component.totalRecords = props.totalRecords;
    component.preselectedPage = props.preselectedPage;
    component.ngOnChanges({
      preselectedPage: new SimpleChange(
        props.preselectedPage,
        props.newPreselectedPage,
        true,
      ),
    });
    fixture.detectChanges();
    expect(component.selectedPage).toEqual(props.newPreselectedPage);
  });

  it('updates selectedPage properly on updateActualPage fired', () => {
    const props = {
      rows: 10,
      totalRecords: 200,
    };
    const totalPages = props.totalRecords / props.rows;
    const tests = [
      {
        preselectedPage: 1,
        newSelectedPage: 2,
        expectedSelectedPage: 2,
      },
      {
        preselectedPage: 1,
        newSelectedPage: 0,
        expectedSelectedPage: 1,
      },
      {
        preselectedPage: 19,
        newSelectedPage: totalPages + 1,
        expectedSelectedPage: 19,
      },
    ];
    tests.forEach((test) => {
      component.rows = props.rows;
      component.totalRecords = props.totalRecords;
      component.preselectedPage = test.preselectedPage;
      fixture.detectChanges();
      component.ngOnInit();
      component.updateActualPage(test.newSelectedPage);
      expect(component.selectedPage).toEqual(test.expectedSelectedPage);
    });
  });

  it('emits onPageChanged value properly if page is between valid range', () => {
    const props = {
      rows: 10,
      totalRecords: 200,
      preselectedPage: 1,
    };
    const newSelectedPage = 5;
    const expectedPage = newSelectedPage;
    component.rows = props.rows;
    component.totalRecords = props.totalRecords;
    component.preselectedPage = props.preselectedPage;
    fixture.detectChanges();
    component.ngOnInit();
    component.onPageChanged.subscribe((page) => {
      expect(page).toEqual(expectedPage);
    });
    component.updateActualPage(newSelectedPage);
  });

  it('does not emit value on page changed fired if out of valid range', () => {
    const props = {
      rows: 10,
      totalRecords: 200,
      preselectedPage: 1,
    };
    const totalPages = props.totalRecords / props.rows;
    const tests = [
      {
        newPage: -1,
      },
      {
        newPage: totalPages + 1,
      },
    ];
    spyOn(component.onPageChanged, 'emit');
    tests.forEach((test) => {
      component.rows = props.rows;
      component.totalRecords = props.totalRecords;
      component.preselectedPage = props.preselectedPage;
      fixture.detectChanges();
      component.ngOnInit();
      component.updateActualPage(test.newPage);
      expect(component.onPageChanged.emit).not.toHaveBeenCalled();
    });
  });

  it('updates renderedPages array properly', () => {
    const props = {
      rows: 10,
      totalRecords: 200,
    };
    const tests = [
      {
        newSelectedPage: 2,
        initialRenderedPages: [1, 2, 3, 4, 5, 6],
        expectedRenderedPages: [1, 2, 3, 4, 5, 6],
      },
      {
        newSelectedPage: 6,
        initialRenderedPages: [1, 2, 3, 4, 5, 6],
        expectedRenderedPages: [4, 5, 6, 7, 8, 9],
      },
      {
        newSelectedPage: 19,
        initialRenderedPages: [15, 16, 17, 18, 19, 20],
        expectedRenderedPages: [15, 16, 17, 18, 19, 20],
      },
      {
        newSelectedPage: 15,
        initialRenderedPages: [15, 16, 17, 18, 19, 20],
        expectedRenderedPages: [13, 14, 15, 16, 17, 18],
      },
    ];
    tests.forEach((test) => {
      component.rows = props.rows;
      component.totalRecords = props.totalRecords;
      component.totalPages = props.totalRecords / props.rows;
      component.selectedPage = test.newSelectedPage;
      component.renderedPages = test.initialRenderedPages;
      fixture.detectChanges();
      component.updateRenderedPages();
      expect(component.renderedPages).toEqual(test.expectedRenderedPages);
    });
  });
});
