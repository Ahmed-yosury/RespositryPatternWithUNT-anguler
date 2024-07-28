import { Component } from '@angular/core';
import { JoptitleServiceService } from '../../Services/joptitle-service.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-joptitle',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,RouterModule],
  providers:[JoptitleServiceService],
  templateUrl: './joptitle.component.html',
  styleUrl: './joptitle.component.css'
})
export class JoptitleComponent {
constructor(private jop:JoptitleServiceService){}
  departments:any;
loading: boolean = true;

  ngOnInit(): void {
    this.jop.GRtallJobTitle().subscribe({
      next:(data)=>{
this.departments=data
      this.loading=false
      console.log(this.loading)
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }
  loodaddressbook(){
    this.jop.GRtallJobTitle().subscribe({
      next:(data)=>{
this.departments=data
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  deleteDepartment(id:any){
    this.confirmDelete(id)
      }

      confirmDelete(id:any){
        const swalWithBootstrapButtons=Swal.mixin({
          customClass:{
            confirmButton: "btn btn-success customBtn",
            cancelButton: "btn btn-danger customBtn",
            icon: 'myCustomIcon',
            title: 'myCustomTitle'
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Are You Sure!",
          icon: "warning",
          width: '450px',
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        }).then((result)=>{
          if(result.isConfirmed){
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              icon: "success",
              width: '450px',
            });
            this.jop.DeleteJobTitle(id).subscribe({
             next:(date)=>{
              console.log("deleted successfully",date);
              this.loodaddressbook();
    
             },
             error:(err)=>{
              console.error("Error deleting ")
             }
            })
            
          }
          else if( result.dismiss === Swal.DismissReason.cancel){
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              icon: "error",
              width: '450px',
            });
          }
        })
      }

}
