import { Component, OnInit, OnChanges, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  @Input() page: number;
  @Input() pageSize: number;
  @Input() collectionSize: number;

  public selectablePageSizes: number[] = [10, 30, 50];

  public pages: { page: number, active: boolean, hidden: boolean }[];
  public hasNext = false;
  public hasPrevious = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refresh();
  }

  private refresh(): void {
    if (!this.collectionSize || !this.pageSize) {
      this.pages = null;
    } else {
      const totalPages = this.totalPages();
      const pages = new Array(totalPages);
      let page = 0;
      let total = totalPages;
      const range = this.computeRange(totalPages);
      for (let index = 0; index < total; index++) {
        const active = this.isActive(page);
        const hidden = this.isHidden(page, totalPages, range);
        const optional = this.isOptional(page, totalPages);
        pages[index] = { page: page + 1, active, optional, hidden};

        // Spacers are only inserted right after the first page or right before the last
        if ((index === 1 && !this.isActive(page - 1) && !active) || (index === (total - 2)) && !this.isActive(page + 1) && !active) {
          pages.splice(index, 0, { optional: !hidden});
          index++;
          total++;
        }
        page++;
      }
      this.pages = pages;
      this.hasNext = this.computeHasNext();
      this.hasPrevious = this.computeHasPrevious();
    }
  }

  get start() {
    return (this.pageSize * this.page) + 1;
  }

  get end() {
    return Math.min(this.pageSize * (this.page + 1), this.collectionSize);
  }

  private totalPages(): number {
    return this.computeTotalPages(this.collectionSize, this.pageSize);
  }

  private computeTotalPages(collectionSize: number, pageSize: number): number {
    return Math.ceil(collectionSize / pageSize);
  }

  private isOptional(index: number, totalPages: number): boolean {
    return !(index === 0 || index === (totalPages - 1) || index === this.page);
  }

  private isActive(index: number): boolean {
    return this.page === index;
  }

  private computeRange(totalPages: number): number {
    const currentPage = this.page + 1;
    let range = 3; // always show -3 +3 from page

    // adjust ranges depending on whether the current page is at the edges
    if (currentPage - range < 1) {
      range += (-1 * (currentPage - range - 1));
    } else if (currentPage + range > totalPages ) {
      range += (currentPage + range - totalPages );
    }
    return range;
  }

  private isHidden(index: number, totalPages: number, range: number): boolean {

    if (totalPages > 10) {
      // always show the ends and the current page
      if (index === 0 || index === totalPages - 1 || this.page === index) {
        return false;
      }

      // always show pages within the range from the active page
      if (index <= this.page + range && index >= this.page - range) {
        return false;
      }

      return true;
    } else {
      return false;
    }
  }

  private computeHasPrevious() {
    return this.page !== 0;
  }

  private computeHasNext() {
    return (this.page + 1) !== this.totalPages();
  }

  onNext() {
    this.pageChange.emit(this.page + 1);
    return false;
  }

  onPrevious() {
    this.pageChange.emit(this.page - 1);
    return false;
  }

  onPage(index: number) {
    this.pageChange.emit(index);
    return false;
  }

  onPageSize(pageSize: string|number) {
    const start = this.start - 1;
    if (typeof pageSize === 'string') {
      pageSize = parseInt(pageSize, 10);
    }
    const page = Math.floor(start / pageSize);
    const total = this.computeTotalPages(this.collectionSize, pageSize);
    this.pageSize = pageSize;
    this.pageSizeChange.emit(pageSize);
    if (page <= total) {
      if (page !== this.page) {
        this.page = page;
        this.pageChange.emit(page);
      }
    } else {
      if (page !== total - 1) {
        this.page = total - 1;
        this.pageChange.emit(total - 1);
      }
    }
    return false;
  }
}
