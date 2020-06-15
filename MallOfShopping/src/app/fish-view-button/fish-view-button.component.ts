import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BreadCrumbService} from "../bread-crumb/bread-crumb.service";

import {faFish} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-fish-view-button',
  templateUrl: './fish-view-button.component.html',
  styleUrls: ['./fish-view-button.component.css']
})
export class FishViewButtonComponent implements OnInit {

  faFish = faFish

  @Input() isDesktopDevice

  constructor(private readonly router: Router,
              private readonly breadCrumbService: BreadCrumbService) {
  }

  ngOnInit(): void {
  }

  loadFishViewPage() {
    this.router.navigate(['/grocery-list'], {queryParams: {groceryType: 'admin' + '/' + 'Fish'}})
    this.breadCrumbService.updateBreadCrumb([{label: 'Fish'}])
  }

}
