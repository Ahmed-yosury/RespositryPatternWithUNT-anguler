import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobTitle } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class JoptitleServiceService {
  private readonly DB_url="https://localhost:44323/api/Jop"
;

  constructor(private myclient:HttpClient) { }
  GRtallJobTitle(){
    return this.myclient.get(this.DB_url)
  }
  AddJobTitle(joptitle:JobTitle){
return this.myclient.post<JobTitle>(this.DB_url,joptitle)
  }
  GetjoptitleByid(id:any){
    return this.myclient.get(`${this.DB_url}/${id}`)
     }
  UpdateJobTitle(id:any,joptitle:JobTitle){
  return this.myclient.put<JobTitle>(`${this.DB_url}/${id}`,joptitle)
  }
DeleteJobTitle(id:any){
 return  this.myclient.delete(`${this.DB_url}/${id}`)
}
}
