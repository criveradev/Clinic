import { Component } from '@angular/core';
interface data {
  value: string;
}

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent {
  public selectedValue !: string;
  public firstName: string = '';
  public lastName: string = '';
  public mobile: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public birth: string = '';
  public gender: number = 1;
  public education: string = '';
  public designation: string = '';
  public address: string = '';

  constructor(){

  }
  ngOnInit(){
    
  }

}