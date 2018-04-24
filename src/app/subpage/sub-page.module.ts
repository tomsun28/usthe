import {NgModule} from '@angular/core';
import { MenuManageComponent } from './resource/menu-manage/menu-manage.component';
import { RestApiManageComponent } from './resource/rest-api-manage/rest-api-manage.component';
import {ShareModule} from '../common/share.module';
import { MenuTreeItemComponent } from './resource/menu-manage/menu-tree-item/menu-tree-item.component';
import {BsDropdownModule, ModalModule, PaginationModule} from 'ngx-bootstrap';
import { RoleManageComponent } from './resource/role-manage/role-manage.component';
import { UserLogComponent } from './user/user-log/user-log.component';

@NgModule({
  imports: [
    ShareModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),

  ],
  declarations: [MenuManageComponent, RestApiManageComponent, MenuTreeItemComponent, RoleManageComponent, UserLogComponent ],
  exports: []

})

export class SubPageModule {}
