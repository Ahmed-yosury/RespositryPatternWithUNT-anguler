import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoptitleServiceService } from '../../Services/joptitle-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatejoptitle',
  standalone: true,
  imports: [HttpClientModule,CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule],
  providers:[JoptitleServiceService],
  templateUrl: './updatejoptitle.component.html',
  styleUrl: './updatejoptitle.component.css'
})
export class UpdatejoptitleComponent implements OnInit {
id=0;
joptitle:any;
constructor(  myaction:ActivatedRoute ,private jop:JoptitleServiceService){
  this.id=myaction.snapshot.params["id"]
  console.log(this.id)
}
  ngOnInit(): void {
this.jop.GetjoptitleByid(this.id).subscribe({
  next:(data)=>{
    this.joptitle=data
    console.log(data)
     console.log(this.joptitle)
    },error:(err)=>{
      console.error(err)
    }
})
  }
  updatedate(){
    var date={
    
      name:this.joptitle.name
    }
    this.jop.UpdateJobTitle(this.id,date).subscribe(res=>{
      console.log(res);
    })
  }


}
