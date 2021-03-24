import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ApiCallService } from './services/api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shopBridge';
  links = ['Dashboard', 'Add Item'];
  activeLink = this.links[0];
  background: ThemePalette = 'primary';
  type = 'new';
  itemID;
  constructor(private apiSrvc: ApiCallService) { }
  ngOnInit() {
  }
  public openEditItemForm(index) {
    this.activeLink = this.links[1];
    this.type = 'edit';
    this.itemID = index;
  }

  public highlightLink(link) {
    this.activeLink = link;
    this.type = 'new';
  }
}
