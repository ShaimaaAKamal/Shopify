// import { isPlatformBrowser } from '@angular/common';
// import {Component,Inject,Input,PLATFORM_ID,TemplateRef,ViewChild
//   ,ChangeDetectorRef,OnInit,AfterViewInit,OnDestroy, ElementRef, NgZone, HostListener} from '@angular/core';
// import {  SelectionType } from '@swimlane/ngx-datatable';
// import { CommonService } from '../../../Services/Common/common.service';

// @Component({
//   selector: 'app-table-data',
//   templateUrl: './table-data.component.html',
//   styleUrls: ['./table-data.component.scss'],
//   standalone: false,
//   host: {
//     'ngSkipHydration': 'true'
//   }
// })
// export class TableDataComponent implements OnInit, AfterViewInit, OnDestroy {
//   @ViewChild('checkbox', { static: true }) checkboxTemplate!: TemplateRef<any>;
//   @ViewChild('tableContainer', { static: true }) tableContainer!: ElementRef;
//   @ViewChild('table', { static: false }) table: any;
//   @Input() rows: any[] = [];
//   private resizeDebounceTimer: any;
//   @Input() columns: any[] = [];
//   displayedColumns: any[] = [];
//   tableVisible = true;
//   resizeCounter = 0;
//   page = 0;
//   selectionType = SelectionType.checkbox;
//   selected: any[] = [];
//   filteredRows: any[] = [];
//   isBrowser = false;
//   rowHeight: number = 48;
//   headerHeight: number = 56;
//   footerHeight: number = 48;
//  isResizing = false;
//   currentScreenWidth!: number;
//   readonly MOBILE_BREAKPOINT = 768;
//   readonly TABLET_BREAKPOINT = 1024;

//   @HostListener('window:resize', [])
//     onWindowResize(): void {
//       this.handleResize();
//     }
//   constructor(
//     @Inject(PLATFORM_ID) private platformId: Object,
//     private cdRef: ChangeDetectorRef,
//     private __CommonService:CommonService,
//   ) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//     this.__CommonService.isCollapse.subscribe({
//       next:() => this.handleResize()
//     })
//   }

//   ngOnInit(): void {
//     this.filteredRows = [...this.rows];
//     if (this.isBrowser) {
//       this.currentScreenWidth = window.innerWidth;
//       this.setupColumns();
//     } else {
//       this.displayedColumns = this.columns.filter(col => col.visible !== false);
//     }
//   }

//   ngAfterViewInit(): void {
//     if (this.isBrowser && this.displayedColumns.length > 0 && this.checkboxTemplate) {
//       const checkboxColumn = this.displayedColumns.find(col => col.isCheckboxColumn);
//       if (checkboxColumn) {
//         checkboxColumn.cellTemplate = this.checkboxTemplate;
//       }
//       this.cdRef.detectChanges();
//     }
//   }

//   identityFn = (item: any): string => {
//     if (item?.id) return `id_${item.id}`;
//     if (item?._id) return `id_${item._id}`;

//     if (item?.$$uid) return `uid_${item.$$uid}`;

//     return `obj_${(item && typeof item === 'object') ?
//       Object.values(item).join('_') :
//       String(item)}`;
//   };

//   private handleResize = () => {
//     if (!this.isBrowser) return;

//     this.isResizing = true;
//     clearTimeout(this.resizeDebounceTimer);

//     // Hide the table immediately
//     this.tableVisible = false;

//     this.resizeDebounceTimer = setTimeout(() => {
//       // Update screen width and recalculate columns
//       this.currentScreenWidth = window.innerWidth;
//       this.setupColumns();

//       // Force change detection to ensure removal has completed
//       this.cdRef.detectChanges();

//       // Wait a bit to ensure the table is fully removed from DOM
//       setTimeout(() => {
//         // Increment counter to force recreation with different value
//         this.resizeCounter++;

//         // Show the table again
//         this.tableVisible = true;
//         this.isResizing = false;

//         // Force change detection again
//         this.cdRef.detectChanges();
//       }, 100);
//     }, 200);
//   };

//   private setupColumns(): void {
//     if (!this.columns.length) return;

//     const checkboxColumn = this.columns.find(col => col.isCheckboxColumn);
//     if (checkboxColumn && this.checkboxTemplate) {
//       checkboxColumn.cellTemplate = this.checkboxTemplate;
//     }

//     // Filter other columns based on visibility
//     const otherColumns = this.columns.filter(col => !col.isCheckboxColumn);

//     if (this.currentScreenWidth < this.MOBILE_BREAKPOINT) {
//       this.displayedColumns = [
//         checkboxColumn,
//         ...otherColumns.filter(col => col.mobileVisible !== false).slice(0, 2)
//       ];
//     }
//     else if (this.currentScreenWidth < this.TABLET_BREAKPOINT) {
//       this.displayedColumns = [
//         checkboxColumn,
//         ...otherColumns.filter(col => col.tabletVisible !== false).slice(0, 4)
//       ];
//     }
//     else {
//       this.displayedColumns = [...this.columns];
//     }
//   }

//   updateFilter(event: any): void {
//     this.selected=[];
//     const val = event.target.value.toLowerCase();
//     this.filteredRows = (this.rows || []).filter(row => {
//       return row && Object.values(row).some(value =>
//         value?.toString().toLowerCase().includes(val)
//       );
//     });
//       this.page = 0;
//     this.cdRef.detectChanges();
//   }

//   onSelect(event: any) {
//     this.selected = [...event.selected];
//     console.log('Selected:', this.selected);
//   }

//   onPage(event: any) {
//     this.page = event.offset;
//   }
//    ngOnDestroy(): void {
//     if (this.isBrowser) {
//       clearTimeout(this.resizeDebounceTimer);
//     }
//   }

// }

import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, TemplateRef, ViewChild,
  ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy, ElementRef, NgZone,
  HostListener} from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { CommonService } from '../../../Services/Common/common.service';

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
  @ViewChild('table', { static: false }) table: any;
  @Input() rows: any[] = [];
  private resizeDebounceTimer: any;
  @Input() columns: any[] = [];
  displayedColumns: any[] = [];
  tableVisible = true;
  resizeCounter = 0;
  page = 0;
  selectionType = SelectionType.checkbox;
  selected: any[] = [];
  filteredRows: any[] = [];
  isBrowser = false;
  rowHeight: number = 48;
  headerHeight: number = 56;
  footerHeight: number = 48;
  isResizing = false;
  currentScreenWidth!: number;
  tableHeight: string = '100%';
  private resizeObserver: ResizeObserver | null = null;
  readonly MOBILE_BREAKPOINT = 768;
  readonly TABLET_BREAKPOINT = 1024;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.handleResize();
    this.calculateTableHeight();
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef,
    private __CommonService: CommonService,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.__CommonService.isCollapse.subscribe({
      next: isCollapse => {
        this.handleResize();
        this.calculateTableHeight();
      }
    });
  }

  ngOnInit(): void {
    this.filteredRows = [...this.rows];
    if (this.isBrowser) {
      this.currentScreenWidth = window.innerWidth;
      this.setupColumns();
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
      this.setupResizeObserver();
      this.calculateTableHeight();
      this.cdRef.detectChanges();
    }
  }

  private setupResizeObserver(): void {
    if (this.isBrowser && 'ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => {
        this.ngZone.run(() => {
          this.calculateTableHeight();
        });
      });
      this.resizeObserver.observe(this.tableContainer.nativeElement);
    }
  }

  calculateTableHeight(): void {
    if (!this.isBrowser || !this.tableContainer) return;

    const container = this.tableContainer.nativeElement;
    const searchInput = container.querySelector('input');
    const searchInputHeight = searchInput ? searchInput.offsetHeight : 0;
    const marginBottom = 16; // mb-3 is approximately 16px
    const remainingHeight = container.offsetHeight - searchInputHeight - marginBottom;

    // Ensure minimum height
    const minHeight = 300; // Set your minimum height here
    this.tableHeight = `${Math.max(remainingHeight, minHeight)}px`;

    this.cdRef.detectChanges();
  }

  identityFn = (item: any): string => {
    if (item?.id) return `id_${item.id}`;
    if (item?._id) return `id_${item._id}`;
    if (item?.$$uid) return `uid_${item.$$uid}`;

    return `obj_${(item && typeof item === 'object') ?
      Object.values(item).join('_') :
      String(item)}`;
  };

  private handleResize = () => {
    if (!this.isBrowser) return;

    this.isResizing = true;
    clearTimeout(this.resizeDebounceTimer);

    // Hide the table immediately
    this.tableVisible = false;

    this.resizeDebounceTimer = setTimeout(() => {
      // Update screen width and recalculate columns
      this.currentScreenWidth = window.innerWidth;
      this.setupColumns();

      // Force change detection to ensure removal has completed
      this.cdRef.detectChanges();

      // Wait a bit to ensure the table is fully removed from DOM
      setTimeout(() => {
        // Increment counter to force recreation with different value
        this.resizeCounter++;

        // Show the table again
        this.tableVisible = true;
        this.isResizing = false;

        // Recalculate height after table is visible again
        this.calculateTableHeight();

        // Force change detection again
        this.cdRef.detectChanges();
      }, 100);
    }, 200);
  };

  private setupColumns(): void {
    if (!this.columns.length) return;

    const checkboxColumn = this.columns.find(col => col.isCheckboxColumn);
    if (checkboxColumn && this.checkboxTemplate) {
      checkboxColumn.cellTemplate = this.checkboxTemplate;
    }

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
    this.selected = [];
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
  }

  onPage(event: any) {
    this.page = event.offset;
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      clearTimeout(this.resizeDebounceTimer);
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    }
  }
}
