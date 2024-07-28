import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JoptitleServiceService } from '../../Services/joptitle-service.service';

@Component({
  selector: 'app-addjoptitle',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule,HttpClientModule,CommonModule],
  providers:[JoptitleServiceService],
  templateUrl: './addjoptitle.component.html',
  styleUrl: './addjoptitle.component.css'
})
export class AddjoptitleComponent {
joptitle:any={
  name:""
}
  
  constructor(private jop:JoptitleServiceService){}
  form=new FormGroup({
    depart:new FormControl(null,[Validators.required,Validators.minLength(3)])
  })
  get deptvaild(){
    return  this.form.controls["depart"].valid}

    isSettingsFormValid(){
      if(this.form.valid){
        this.senddate()
      }
      else{
        this.form.markAllAsTouched();
      }
    }
    senddate(){
this.jop.AddJobTitle(this.joptitle).subscribe(
  (response) => {
    console.log('Course published:', response);}
)
      console.log(this.joptitle)
    }
}
