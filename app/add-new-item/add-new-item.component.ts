import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';
import { ApiCallService } from '../services/api-call.service';
import { CommonDataService } from '../services/common-data.service';

@Component({
  selector: 'add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit {

  addItemForm: FormGroup;
  crntList;
  editItem_ID;
  itemType;
  message = ''
  @Input() set type(value) {
    this.itemType = value;
    this.patchFormData();
  }

  @Input() set itemID(value) {
    this.editItem_ID = value;
    this.patchFormData();
  }

  constructor(private fb: FormBuilder, private cmnDataSrvc: CommonDataService, private apiSrvc: ApiCallService) {
    this.addItemForm = this.fb.group({
      'name': [null, [Validators.required, Validators.maxLength(40)]],
      'description': [null, [Validators.required, Validators.maxLength(200)]],
      'price': [null, Validators.required],
    });

    this.cmnDataSrvc.updated_inventory_list$.subscribe(list => {
      this.crntList = list;
    });
  }

  public hasError(controlName, errorName) {
    return this.addItemForm.controls[controlName].hasError(errorName);
  }

  //to get data from api when modify is clicked
  public patchFormData() {
    if (this.itemType == 'edit' && this.editItem_ID != undefined) {
      for (var i = 0; i < this.crntList.length; i++) {
        if (this.editItem_ID == i) {
          this.addItemForm.patchValue(
            {
              name: this.crntList[i].name,
              description: this.crntList[i].description,
              price: this.crntList[i].price,
            },

          );
        }
      }
    }
  }

  ngOnInit(): void {

  }

//handles submit req for both edit/add new
  onSubmit(form) {
    if (this.itemType != 'edit') {
      this.apiSrvc.addItem(this.addItemForm.value).subscribe(list => {
        this.cmnDataSrvc.update_list(list);
        this.addItemForm.reset();
        this.message = "Added successfully"
      });
    }
    else {
      for (var i = 0; i < this.crntList.length; i++) {
        if (this.editItem_ID == i) {
          this.apiSrvc.deleteItem(i).subscribe(list => {
            this.cmnDataSrvc.update_list(list);
          });
          this.apiSrvc.addItem(this.addItemForm.value).subscribe(list => {
            this.cmnDataSrvc.update_list(list);
            this.addItemForm.reset();
            this.message = "Updated successfully"
          });
        }
      }
    }
  }
  public onCancel() {
    this.addItemForm.reset();
  }
}
