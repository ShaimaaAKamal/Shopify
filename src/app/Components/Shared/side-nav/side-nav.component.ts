import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavItem } from '../../../Interfaces/nav-item';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-side-nav',
  standalone: false,
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  private platformId = inject(PLATFORM_ID); // Injecting PLATFORM_ID directly
  // isCollapsed:boolean = false;
    isCollapsed!:boolean;

  personImage:string="person.jpg";
  salesPersonName:string='Ahmed Kamal'
  sectionOneNavItems:NavItem[] = [
    { name: 'Home', icon: 'fa-solid fa-house' },
    { name: 'Products', icon: 'fa-solid fa-tags' },
    { name: 'Orders', icon: 'fa-solid fa-credit-card' },
    { name: 'Customers', icon: 'fa-solid fa-users' },
    { name: 'Discounts', icon: 'fa-solid fa-percent' },
    { name: 'Reports', icon: 'fa-solid fa-chart-simple' },
  ];

  sectionTwoNavItems:NavItem[] = [
    { name: 'Settings', icon: 'fa-solid fa-gear' },
    { name: 'Arabic', icon: 'fa-solid fa-globe' },
    { name: 'Return_Order', icon: 'fa-solid fa-right-left' },
    { name: 'End_Day', icon: 'fa-solid fa-rectangle-xmark' },
    { name: 'Hold_Orders', icon: "fa-solid fa-hourglass-start" },
  ];

  @HostListener('window:resize')
  onResize() {
    this.setIsCollapsed();
  }

  constructor(private __CommonService:CommonService){
    this.__CommonService.isCollapse.subscribe({
      next:isCollapse => this.isCollapsed=isCollapse
    })
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setIsCollapsed();
      window.addEventListener('resize', this.setIsCollapsed.bind(this));
    }
  }

  private setIsCollapsed() {
    if (isPlatformBrowser(this.platformId)) {
      if(window.innerWidth < 768)
      // this.isCollapsed = true;
    this.__CommonService.isCollapse.next(true);
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed ;
    this.__CommonService.isCollapse.next(this.isCollapsed);
    this.setIsCollapsed();
  }
}
