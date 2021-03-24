import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'addNewItem',component:AddNewItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
