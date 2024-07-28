import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpolyeeService } from '../../Services/empolyee.service';
@Component({
  selector: 'app-sohwdata',
  standalone: true,
  imports: [HttpClientModule,RouterModule,CommonModule,FormsModule],
  providers:[EmpolyeeService],
  templateUrl: './sohwdata.component.html',
  styleUrl: './sohwdata.component.css'
})
export class SohwdataComponent  implements OnInit{
  empolyee:any=[

  ];
constructor(private Empolyee:EmpolyeeService){}
  ngOnInit(): void {
    this.Empolyee.GetallAEmpolyee().subscribe({
    next:(data)=>{
       this.empolyee=data;
       console.log(data)
      
    },
    error:(err)=>{console.log( err)}

   })
  
   
  }
  
  loodaddressbook(){
    this.Empolyee.GetallAEmpolyee().subscribe({
      next:(data)=>{
         this.empolyee=data;
         
  
      },
      error:(err)=>{console.log( err)}
  
     })
  }
  deleteAddressbook(id:any){
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
        this.Empolyee.deleteEmpolyee(id).subscribe({
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
