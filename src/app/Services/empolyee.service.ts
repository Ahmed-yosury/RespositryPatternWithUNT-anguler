import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empolyee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmpolyeeService {
  private readonly DB_url="https://localhost:44323/api/Employee"

  constructor( private myclint:HttpClient) { }
  GetallAEmpolyee(){
    return this.myclint.get(`${this.DB_url}`)
  }
  GetEmpolyeeByid(id:any){
    return this.myclint.get(`${this.DB_url}/${id}`)
     } 
  createEmpolyee(Empolyee:Empolyee){
      return this.myclint.post<Empolyee>(this.DB_url,Empolyee)
    }

    updateEmpolyee( id:any,Empolyee:Empolyee){
      return this.myclint.put<Empolyee>(`${this.DB_url}/${id}`,Empolyee)
    }  
    deleteEmpolyee(id:any){
      return this.myclint.delete(`${this.DB_url}/${id}`)
    }
}
