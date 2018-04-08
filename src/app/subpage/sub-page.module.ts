import {NgModule} from '@angular/core';
import { MenuManageComponent } from './resource/menu-manage/menu-manage.component';
import { RestApiManageComponent } from './resource/rest-api-manage/rest-api-manage.component';
import {ShareModule} from '../common/share.module';
import {AmexioWidgetModule} from 'amexio-ng-extensions';
import { MenuTreeItemComponent } from './resource/menu-manage/menu-tree-item/menu-tree-item.component';
import {BsDropdownModule, ModalModule, PaginationModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    ShareModule,
    AmexioWidgetModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  declarations: [MenuManageComponent, RestApiManageComponent, MenuTreeItemComponent],
  exports: []

})

export class SubPageModule {}
