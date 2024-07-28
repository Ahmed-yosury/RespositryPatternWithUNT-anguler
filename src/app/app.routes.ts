import { Routes } from '@angular/router';
import { ErrorComponent } from './home/error/error.component';
import { DetilesComponent } from './home/detiles/detiles.component';
import { SohwdataComponent } from './home/sohwdata/sohwdata.component';
import { JoptitleComponent } from './home/joptitle/joptitle.component';
import { AddjoptitleComponent } from './home/addjoptitle/addjoptitle.component';
import { UpdatejoptitleComponent } from './home/updatejoptitle/updatejoptitle.component';
import { CreateEmpolyeeComponent } from './home/create-empolyee/create-empolyee.component';
export const routes: Routes = [
   
     {path:"",redirectTo:"Empolyee",pathMatch:"full"},
     {path:"Empolyee",component:SohwdataComponent},
    {path:"detiles/:id",component:DetilesComponent},
    {path:"create",component:CreateEmpolyeeComponent},
    {path:"joptitle",component:JoptitleComponent},
    {path:"createjoptitle",component:AddjoptitleComponent},
    {path:"updatejoptitle/:id",component:UpdatejoptitleComponent},
    
    {path:"**",component:ErrorComponent}
    



];
