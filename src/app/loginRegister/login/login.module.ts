import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {ShareModule} from '../../common/share.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    ShareModule,
    RouterModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
