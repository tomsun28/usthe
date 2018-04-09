import {Component, OnInit, Pipe} from '@angular/core';
import {AlertEnum} from '../../../common/alert-enum.enum';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MenuTreeNode} from '../../../pojo/MenuTreeNode';
import {RoleVO} from '../../../pojo/RoleVO';
import {RoleService} from '../../../service/role.service';
import {ResponseVO} from '../../../pojo/ResponseVO';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.css']
})
export class RoleManageComponent implements OnInit {


  bsModalRef: BsModalRef;

  // app-alert info
  alert: AlertEnum = AlertEnum.DANGER;
  msg: string = '默认提示信息';
  // app-content-header info
  firstName: string = '资源管理';
  secondName: string = '角色管理';
  detail: string = '角色关联维护';

  // ----api----
  selectedRoleApi: any;
  apis: any[];
  // api-pagination info
  apiPageSize: number = 10;
  apiTotalItems: number;
  apiCurrentPage: number = 1;
  // api-modal info
  apiModalPageSize: number = 10;
  apiModalTotalItems: number;
  apiModalCurrentPage: number = 1;
  modalSelectedApi: any;


  // ----menu----
  selectedRoleMenu: any;
  menus: any[];
  // menu-pagination info
  menuPageSize: number = 10;
  menuTotalItems: number;
  menuCurrentPage: number = 1;
  // menu-modal info
  menuModalPageSize: number = 10;
  menuModalTotalItems: number;
  menuModalCurrentPage: number = 1;
  modalSelectedMenu: any;

  // ----user----
  selectedRoleUser: any;
  users: any[];
  // user-pagination info
  userPageSize: number = 10;
  userTotalItems: number;
  userCurrentPage: number = 1;
  // user-modal info
  userModalPageSize: number = 10;
  userModalTotalItems: number;
  userModalCurrentPage: number = 1;
  modalSelectedUser: any;

  // ----role----
  roles: any[];
  selectedRole: any;
  selectedLinkName: string = '选择角色关联模块';
  // role-modal-template info
  role: RoleVO = new RoleVO();
  modalFlag: number = 1;
  roleModalName: string = '添加角色';
  // role-pagination info
  rolePageSize: number = 10;
  roleTotalItems: number;
  roleCurrentPage: number = 1;


  constructor(private modalService: BsModalService, private roleService: RoleService) { }

  ngOnInit() {

    const role$ = this.roleService.getRoles(this.roleCurrentPage, this.rolePageSize).subscribe(
      data => {
        if (data.meta.code === 6666) {
          this.roles = data.data.data.list;
          this.roleTotalItems = data.data.data.total;
        } else {
          this.msg = '查询失败';
        }
        role$.unsubscribe();
      }
    );
  }



  // ---------------role-----------------------

  selectLinkName(linkName: string) {
    this.selectedLinkName = linkName;
  }

  selectRole(role: any) {
    this.selectedRole = role;
    if (this.selectedLinkName != null && this.selectedLinkName !== undefined && this.selectedRole.id) {
      if (this.selectedLinkName === '授权API') {
        this.getRoleApis(this.selectedRole.id, this.apiCurrentPage, this.apiPageSize);
      }
      if (this.selectedLinkName === '授权菜单') {
        this.getRoleMenus(this.selectedRole.id, this.menuCurrentPage, this.menuPageSize);
      }
      if (this.selectedLinkName === '关联用户') {
        this.getRoleUsers(this.selectedRole.id, this.userCurrentPage, this.userPageSize);
      }
    }
  }
  addRole(template: any) {
    this.modalFlag = 1;
    this.roleModalName = '添加角色';
    this.role = new RoleVO();
    this.bsModalRef = this.modalService.show(template);
  }
  editRole(template: any) {
    if (this.selectedRole === null || this.selectedRole === undefined) {
      this.msg = '请选择角色';
      return;
    } else {
      this.roleModalName = '修改角色';
      this.modalFlag = 2;
      this.role = this.selectedRole;
      this.bsModalRef = this.modalService.show(template);
    }
  }
  deleteRole() {
    if (this.selectedRole === null || this.selectedRole === undefined || !this.selectedRole.id) {
      this.msg = '请选择角色';
      return;
    } else {
      if (!confirm('确认删除?')) {
        return;
      }
      const deleteRole$ = this.roleService.deleteRole(this.selectedRole.id).subscribe(
        data => {
          if (data.meta.code === 6666) {
            this.msg = '删除成功';
            deleteRole$.unsubscribe();
            this.ngOnInit();
          } else {
            this.msg = '删除失败';
          }
        }
      );
    }
  }


  submitRoleModal() {
    this.bsModalRef.hide();
    if (!this.check(this.role)) {
      return;
    }
    // 1 add
    if (this.modalFlag === 1) {
      const addRole$ = this.roleService.addRole(this.role).subscribe(
        data => {
          if (data.meta.code === 6666) {
            this.msg = '添加成功';
            addRole$.unsubscribe();
            this.ngOnInit();
          } else {
            this.msg = '添加失败';
            addRole$.unsubscribe();
          }
        }
      );
    }

    // 2 update
    if (this.modalFlag === 2) {
      const updateRole$ = this.roleService.updateRole(this.role).subscribe(
        data => {
          if (data.meta.code === 6666) {
            this.msg = '修改成功';
            updateRole$.unsubscribe();
            this.ngOnInit();
          } else {
            this.msg = '修改失败';
            updateRole$.unsubscribe();
          }
        }
      );
    }
  }

  rolePageChanged(event: any) {
    this.roleCurrentPage = event.page;
    this.ngOnInit();
  }

  check(role: RoleVO) {
    if (!role.code) {
      this.msg = '编码不能为空';
      return false;
    } else if (!role.name) {
      this.msg = '名称不能为空';
      return false;
    } else if (!role.status) {
      this.msg = '请选择状态';
      return false;
    }
    return true;
  }

  // ----------------api---------------------
  getRoleApis(roleId: number, currentPage: number, pageSize: number) {
    const roleApi$ = this.roleService.getApiByRoleId(roleId, currentPage, pageSize).subscribe(
      data => {
        if (data.meta.code === 6666) {
          this.apis = data.data.data.list;
          this.apiTotalItems = data.data.data.total;
          roleApi$.unsubscribe();
        } else {
          this.msg = '获取失败';
          roleApi$.unsubscribe();
        }
      }
    );
  }

  getRoleExtendApis(roleId: number, currentPage: number, pageSize: number) {
    const roleApi$ = this.roleService.getApiExtendByRoleId(roleId, currentPage, pageSize).subscribe(
      data => {
        if (data.meta.code === 6666) {
          this.apis = data.data.data.list;
          this.apiTotalItems = data.data.data.total;
          roleApi$.unsubscribe();
        } else {
          this.msg = '获取失败';
          roleApi$.unsubscribe();
        }
      }
    );
  }
  selectRoleApi(selectItem: any) {
    this.selectedRoleApi = selectItem;
  }
  addRoleApi(template: any) {
    this.bsModalRef = this.modalService.show(template);

  }

  deleteRoleApi() {

  }

  apiPageChanged(event: any) {
    this.apiCurrentPage = event.page;
    this.getRoleApis(this.selectedRole.id, this.apiCurrentPage, this.apiPageSize);
  }

  // ----------------------menu-------------------------
  getRoleMenus(roleId: number, currentPage: number, pageSize: number) {
    const roleMenu$ = this.roleService.getMenuByRoleId(roleId, currentPage, pageSize).subscribe(
      data => {
        if (data.meta.code === 6666) {
          this.menus = data.data.data.list;
          this.menuTotalItems = data.data.data.total;
          roleMenu$.unsubscribe();
        } else {
          this.msg = '获取失败';
          roleMenu$.unsubscribe();
        }
      }
    );
  }

  selectRoleMenu(selectItem: any) {
    this.selectedRoleMenu = selectItem;
  }
  addRoleMenu() {

  }

  deleteRoleMenu() {

  }

  menuPageChanged(event: any) {
    this.menuCurrentPage = event.page;
    this.getRoleMenus(this.selectedRole.id, this.menuCurrentPage, this.menuPageSize);
  }

  // ----------------------user--------------------
  getRoleUsers(roleId: number, currentPage: number, pageSize: number) {
    const roleUser$ = this.roleService.getUserByRoleId(roleId, currentPage, pageSize).subscribe(
      data => {
        if (data.meta.code === 6666) {
          this.users = data.data.data.list;
          this.userTotalItems = data.data.data.total;
          roleUser$.unsubscribe();
        } else {
          this.msg = '获取失败';
          roleUser$.unsubscribe();
        }
      }
    );
  }

  selectRoleUser(selectItem: any) {
    this.selectedRoleUser = selectItem;
  }
  addRoleUser() {

  }

  deleteRoleUser() {

  }

  userPageChanged(event: any) {
    this.userCurrentPage = event.page;
    this.getRoleUsers(this.selectedRole.id, this.userCurrentPage, this.userPageSize);
  }



  // ----------alert----------------
  reloadAlertMsg(msg_: string) {
    this.msg = msg_;
  }
}
