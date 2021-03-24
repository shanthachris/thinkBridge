import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiCallService } from './api-call.service';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  public inventory_list=[];

  private lists$ = new BehaviorSubject(this.inventory_list);
  public updated_inventory_list$ = this.lists$.asObservable();

  //get data from api service
  constructor(private apiSrvc : ApiCallService) {
    this.apiSrvc.getInventoryList().subscribe(list=>{
      this.update_list(list);
    });
   }

   //update list
  public update_list(list){
    this.lists$.next(list);
  }
}
