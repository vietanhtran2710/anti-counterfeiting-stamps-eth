import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CreatorComponent } from './creator/creator.component';
import { LoginComponent } from './login/login.component';
import { ValidateComponent } from './validate/validate.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminComponent},
  {path: "creator", component: CreatorComponent},
  {path: "validate", component: ValidateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
