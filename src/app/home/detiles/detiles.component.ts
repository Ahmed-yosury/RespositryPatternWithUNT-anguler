import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JoptitleServiceService } from '../../Services/joptitle-service.service';
import { Observable, ReplaySubject } from 'rxjs';
import { EmpolyeeService } from '../../Services/empolyee.service';

@Component({
  selector: 'app-detiles',
  standalone: true,
  imports: [HttpClientModule,RouterModule,FormsModule,CommonModule,ReactiveFormsModule],
  providers:[EmpolyeeService,JoptitleServiceService],
  templateUrl: './detiles.component.html',
  styleUrl: './detiles.component.css'
})
export class DetilesComponent  implements OnInit{
  id=0;
  curentEmpolyee:any;
  isDateOfBirthInvalid: boolean = false;
  JobTitle:any=[];
  Empolyee:any={}
  loading: boolean = true;
constructor(myactive:ActivatedRoute,private emp:EmpolyeeService, private jop:JoptitleServiceService ){
  this.id=myactive.snapshot.params["id"];
}
  ngOnInit(): void {
    this.emp.GetEmpolyeeByid(this.id).subscribe({
      next:(data)=>{
        console.log(data)
        this.curentEmpolyee=data;
        this.loading=false;
      },
      error:(err)=>{console.log(err)}
    })
     this.jop.GRtallJobTitle().subscribe({
      next:(data)=>{
     this.JobTitle=data
      },
      error:(err)=>{
        console.log(err)
      }
  
     })
  }
 
  onJopSelected(event:any){
    this.changeimg=true;
    this.Empolyee.JopId=event.target.value
    console.log("selected",this.Empolyee.JopId)
  }
  form =new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3)]),
  })
  
  get namevaild(){
    return this.form.controls["name"].valid;
  }
  validateDateOfBirth() {

    const selectedDate = new Date(this.Empolyee.date);
    const currentDate = new Date();
    this.isDateOfBirthInvalid = selectedDate > currentDate;
    
    console.log(selectedDate)
     console.log(this.isDateOfBirthInvalid)
    
  }
changeimg:boolean=false;
  onFileSelected(event: any) {
this.changeimg=true;
    
      this.Empolyee.image = event.target.files[0];
     
    }
    
    isSettingsFormValid(){
      if(this.form.valid && this.Empolyee.JopId>0&& this.changeimg==true&&this.isDateOfBirthInvalid==false){
      this.senddate();
      }
      else{
        this.form.markAllAsTouched();
      }
    }
    senddate(){
     this.emp.updateEmpolyee(this.id,this.Empolyee).subscribe(
        (response) => {
          console.log('Course published:', response);}
      )
      
      console.log(this.Empolyee)
    }  
}
