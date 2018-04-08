import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AlertComponent} from './alert/alert.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LeftAsideComponent} from './left-aside/left-aside.component';
import {MenuItemComponent} from './left-aside/menu-item/menu-item.component';
import {RightAsideComponent} from './right-aside/right-aside.component';
import {FormsModule} from '@angular/forms';
import { ContentHeaderComponent } from './content-header/content-header.component';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    LeftAsideComponent,
    MenuItemComponent,
    RightAsideComponent,
    ContentHeaderComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    LeftAsideComponent,
    MenuItemComponent,
    RightAsideComponent,
    ContentHeaderComponent
  ]
})

export class ShareModule {}
