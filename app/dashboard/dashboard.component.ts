import { Component, OnInit, Output,EventEmitter,ViewChild } from '@angular/core';
import { CommonDataService } from '../services/common-data.service';

import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Observable  } from 'rxjs';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  crntList;
  panelOpenState = false;
  totalRows;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() modifyItem = new EventEmitter();
  constructor(private cmnDataSrvc:CommonDataService,private apiSrvc:ApiCallService) { 
    this.cmnDataSrvc.updated_inventory_list$.subscribe(list=>{
      this.crntList = list;
      this.totalRows = list.length;
    });
  }

  ngOnInit(): void {
  }

  //function to call deleteitem api
  public deleteItem(index){
    this.apiSrvc.deleteItem(index).subscribe(list=>{
      this.cmnDataSrvc.update_list(list);
    })
  }

  //function executes when modify btn clicked
  public editItem(index){
    this.modifyItem.emit(index);
  }
}
