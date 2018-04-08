import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import {ShareModule} from '../../common/share.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    ShareModule,
    RouterModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
