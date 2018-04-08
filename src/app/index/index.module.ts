import { NgModule } from '@angular/core';
import { IndexComponent } from './index.component';
import {ShareModule} from '../common/share.module';
import {SubPageModule} from '../subpage/sub-page.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    ShareModule,
    SubPageModule,
    RouterModule
  ],
  declarations: [IndexComponent]
})
export class IndexModule { }
