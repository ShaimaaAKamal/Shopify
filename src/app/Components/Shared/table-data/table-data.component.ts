import { isPlatformBrowser } from '@angular/common';
import {Component,Inject,Input,PLATFORM_ID,TemplateRef,ViewChild,ChangeDetectorRef,OnInit,AfterViewInit,OnDestroy, ElementRef} from '@angular/core';
import {  SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
  standalone: false,
  host: {
    'ngSkipHydration': 'true'
  }
})
export class TableDataComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('checkbox', { static: true }) checkboxTemplate!: TemplateRef<any>;
  @ViewChild('tableContainer', { static: true }) tableContainer!: ElementRef;

  @Input() rows: any[] = [];
  private resizeDebounceTimer: any;
  @Input() columns: any[] = [];
  displayedColumns: any[] = [];
  page = 0;
  selectionType = SelectionType.checkbox;
  selected: any[] = [];
  filteredRows: any[] = [];
  isBrowser = false;
  rowHeight: number = 48;
  headerHeight: number = 56;
  footerHeight: number = 48;
 isResizing = false;

  currentScreenWidth!: number; // Default desktop width
  readonly MOBILE_BREAKPOINT = 768;
  readonly TABLET_BREAKPOINT = 1024;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef,
    private el: ElementRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.filteredRows = [...this.rows];
    if (this.isBrowser) {
      this.currentScreenWidth = window.innerWidth;
      this.setupColumns();
      this.setupResizeListener();
    } else {
      this.displayedColumns = this.columns.filter(col => col.visible !== false);
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.displayedColumns.length > 0 && this.checkboxTemplate) {
      const checkboxColumn = this.displayedColumns.find(col => col.isCheckboxColumn);
      if (checkboxColumn) {
        checkboxColumn.cellTemplate = this.checkboxTemplate;
      }
      this.cdRef.detectChanges();
    }
  }

  identityFn = (item: any): string => {
    if (item?.id) return `id_${item.id}`;
    if (item?._id) return `id_${item._id}`;

    if (item?.$$uid) return `uid_${item.$$uid}`;

    return `obj_${(item && typeof item === 'object') ?
      Object.values(item).join('_') :
      String(item)}`;
  };

  private setupResizeListener(): void {
    if (this.isBrowser) {
      window.addEventListener('resize', this.handleResize);
    }
  }


private handleResize = () => {
  if (!this.isBrowser) return;

  this.isResizing = true;
  clearTimeout(this.resizeDebounceTimer);

  this.resizeDebounceTimer = setTimeout(() => {
    this.currentScreenWidth = window.innerWidth;
    this.setupColumns();
    this.safeTableRefresh();
    this.isResizing = false;
  }, 150);
}
  private safeTableRefresh() {
    this.filteredRows = [...this.filteredRows];
    this.cdRef.detectChanges();
  }

  private setupColumns(): void {
    if (!this.columns.length) return;

    const checkboxColumn = this.columns.find(col => col.isCheckboxColumn);
    if (checkboxColumn && this.checkboxTemplate) {
      checkboxColumn.cellTemplate = this.checkboxTemplate;
    }

    // Filter other columns based on visibility
    const otherColumns = this.columns.filter(col => !col.isCheckboxColumn);

    if (this.currentScreenWidth < this.MOBILE_BREAKPOINT) {
      this.displayedColumns = [
        checkboxColumn,
        ...otherColumns.filter(col => col.mobileVisible !== false).slice(0, 2)
      ];
    }
    else if (this.currentScreenWidth < this.TABLET_BREAKPOINT) {
      this.displayedColumns = [
        checkboxColumn,
        ...otherColumns.filter(col => col.tabletVisible !== false).slice(0, 4)
      ];
    }
    else {
      this.displayedColumns = [...this.columns];
    }
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    this.filteredRows = (this.rows || []).filter(row => {
      return row && Object.values(row).some(value =>
        value?.toString().toLowerCase().includes(val)
      );
    });
      this.page = 0;
    this.cdRef.detectChanges();
  }

  onSelect(event: any) {
    this.selected = [...event.selected];
    console.log('Selected:', this.selected);
  }

  onPage(event: any) {
    this.page = event.offset;
  }
   ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.handleResize);
      clearTimeout(this.resizeDebounceTimer);
    }
  }

}

