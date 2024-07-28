import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmpolyeeService } from '../../Services/empolyee.service';
import { JoptitleServiceService } from '../../Services/joptitle-service.service';

@Component({
  selector: 'app-create-empolyee',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,HttpClientModule,CommonModule,FormsModule ,RouterModule],
  providers:[EmpolyeeService,JoptitleServiceService],
  templateUrl: './create-empolyee.component.html',
  styleUrl: './create-empolyee.component.css'
})
export class CreateEmpolyeeComponent implements OnInit {
  isDateOfBirthInvalid: boolean = false;
  JobTitle:any=[];
  Empolyee:any={
    Name:"",
    date:"",
    JopId:0,
    image:File
  }
  constructor(private jop:JoptitleServiceService, private emp:EmpolyeeService ){}
  ngOnInit(): void {
    this.jop.GRtallJobTitle().subscribe({
      next:(data)=>{
        this.JobTitle=data
        console.log(data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  changeimg:boolean=false;

  onJopSelected(event:any){
    this.changeimg=true;
    this.Empolyee.JopId=event.target.value
    console.log("selected",this.Empolyee.JopId)
  }
  form=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3)]), 
  
  })
  get namevaild(){
    return this.form.controls["name"].valid;
  }
  validateDateOfBirth() {

    const selectedDate = new Date(this.Empolyee.data);
    const currentDate = new Date();
    this.isDateOfBirthInvalid = selectedDate > currentDate;
    
    console.log(selectedDate)
     console.log(this.isDateOfBirthInvalid)
  }
  onFileSelected(event: any) {
    this.Empolyee.image=event.target.files[0];
  }
  senddate(){
    this.emp.createEmpolyee(this.Empolyee).subscribe(
      (response) => {
        console.log('Course published:', response);}
    )
    console.log(this.Empolyee)
  }
  isSettingsFormValid(){
    if(this.form.valid && this.Empolyee.JopId>0&& this.changeimg==true&&this.isDateOfBirthInvalid==false){
    this.senddate();
    }
    else{
      this.form.markAllAsTouched();
    }
  }


}
