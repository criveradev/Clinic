import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { ListStaffComponent } from './list-staff/list-staff.component';

//Definimos las rutas y componentes que vamos a utilizar en este modulo.
const routes: Routes = [{
  path: '',
  component: StaffComponent,
  children: [
   {
    path: 'add-staff',
    component: AddStaffComponent
   },
   {
    path: 'list-staff/edit-staff/:id',
    component: EditStaffComponent
   },
   {
    path: 'list-staff',
    component: ListStaffComponent
   }       
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
