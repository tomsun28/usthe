import {Component, OnInit} from '@angular/core';
import {AlertEnum} from '../../../common/alert-enum.enum';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {RoleVO} from '../../../pojo/RoleVO';
import {RoleService} from '../../../service/role.service';

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
  // modal-page分页
  modalPageSize: number = 10;
  modalTotalItems: number;
  modalCurrentPage: number = 1;
  modalSelected: number = 1; // 1 api 2 menu 3 user

  // ----api----
  selectedRoleApi: any;
  apis: any[];
  // api-pagination info
  apiPageSize: number = 10;
  apiTotalItems: number;
  apiCurrentPage: number = 1;
  // api-modal info

  modalApis: any[];
  modalSelectedApi: any;


  // ----menu----
  selectedRoleMenu: any;
  menus: any[];
  // menu-pagination info
  menuPageSize: number = 10;
  menuTotalItems: number;
  menuCurrentPage: number = 1;
  // menu-modal info
  modalMenus: any[];
  modalSelectedMenu: any;

  // ----user----
  selectedRoleUser: any;
  users: any[];
  // user-pagination info
  userPageSize: number = 10;
  userTotalItems: number;
  userCurrentPage: number = 1;
  // user-modal info
  modalUsers: any[];
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
        } else if (data.meta.code === 1008) {
          this.alert = AlertEnum.DANGER;
          this.msg = '您无此api权限';
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
          } else if (data.meta.code === 1008) {
            deleteRole$.unsubscribe();
            this.alert = AlertEnum.DANGER;
            this.msg = '您无此api权限';
          } else {
            deleteRole$.unsubscribe();
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
          } else if (data.meta.code === 1008) {
            addRole$.unsubscribe();
            this.alert = AlertEnum.DANGER;
            this.msg = '您无此api权限';
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
          } else if (data.meta.code === 1008) {
            updateRole$.unsubscribe();
            this.alert = AlertEnum.DANGER;
            this.msg = '您无此api权限';
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
        } else if (data.meta.code === 1008) {
          roleApi$.unsubscribe();
          this.alert = AlertEnum.DANGER;
          this.msg = '您无此api权限';
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
          this.modalApis = data.data.data.list;
          this.modalTotalItems = data.data.data.total;
          roleApi$.unsubscribe();
        } else if (data.meta.code === 1008) {
          roleApi$.unsubscribe();
          this.alert = AlertEnum.DANGER;
          this.msg = '您无此api权限';
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
  selectModalRoleApi(selectItem: any) {
    this.modalSelectedApi = selectItem;
  }
  addRoleApi(template: any) {
    if (!this.selectedRole) {
      this.msg = '请选择对应角色';
      return;
    }
    this.getRoleExtendApis(this.selectedRole.id, this.modalCurrentPage, this.modalPageSize);
    this.modalSelected = 1;
    this.bsModalRef = this.modalService.show(template);
  }

  deleteRoleApi() {
    if (this.selectedRoleApi == null || this.selectedRoleApi === undefined) {
      this.msg = '请选择API';
      return;
    } else {
      if (!confirm('确认删除?')) {
        return;
      }
      const deleteApi$ = this.roleService.deleteRoleAuthorityApi(this.selectedRole.id, this.selectedRoleApi.id).subscribe(
        data => {
          if (data.meta.code === 6666) {
            this.msg = '删除成功';
            deleteApi$.unsubscribe();
            this.getRoleApis(this.selectedRole.id, this.apiCurrentPage, this.apiPageSize);
          } else if (data.meta.code === 1008) {
            deleteApi$.unsubscribe();
            this.alert = AlertEnum.DANGER;
            this.msg = '您无此api权限';
          } else {
            this.msg = '删除失败';
          }
        }
      );
    }
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
        } else if (data.meta.code === 1008) {
          roleMenu$.unsubscribe();
          this.alert = AlertEnum.DANGER;
          this.msg = '您无此api权限';
        } else {
          this.msg = '获取失败';
          roleMenu$.unsubscribe();
        }
      }
    );
  }

  getRoleExtendMenus(roleId: number, currentPage: number, pageSize: number) {
    const roleMenu$ = this.roleService.getMenuExtendByRoleId(roleId, currentPage, pageSize).subscribe(
      data => {
        if (data.meta.code === 6666) {
          this.modalMenus = data.data.data.list;
          this.modalTotalItems = data.data.data.total;
          roleMenu$.unsubscribe();
        } else if (data.meta.code === 1008) {
          roleMenu$.unsubscribe();
          this.alert = AlertEnum.DANGER;
          this.msg = '您无此api权限';
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
  selectModalRoleMenu(selectItem: any) {
    this.modalSelectedMenu = selectItem;
  }
  addRoleMenu(template: any) {
    if (!this.selectedRole) {
      this.msg = '请选择对应角色';
      return;
    }
    this.getRoleExtendMenus(this.selectedRole.id, this.modalCurrentPage, this.modalPageSize);
    this.modalSelected = 2;
    this.bsModalRef = this.modalService.show(template);
  }

  deleteRoleMenu() {

    if (this.selectedRoleMenu == null || this.selectedRoleMenu === undefined) {
      this.msg = '请选择菜单';
      return;
    } else {
      if (!confirm('确认删除?')) {
        return;
      }
      const deleteMenu$ = this.roleService.deleteRoleAuthorityMenu(this.selectedRole.id, this.selectedRoleMenu.id).subscribe(
        data => {
          if (data.meta.code === 6666) {
            this.msg = '删除成功';
            deleteMenu$.unsubscribe();
            this.getRoleMenus(this.selectedRole.id, this.menuCurrentPage, this.menuPageSize);
          } else if (data.meta.code === 1008) {
            deleteMenu$.unsubscribe();
            this.alert = AlertEnum.DANGER;
            this.msg = '您无此api权限';
          } else {
            deleteMenu$.unsubscribe();
            this.msg = '删除失败';
          }
        }
      );
    }
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
        } else if (data.meta.code === 1008) {
          roleUser$.unsubscribe();
          this.alert = AlertEnum.DANGER;
          this.msg = '您无此api权限';
        } else {
          this.msg = '获取失败';
          roleUser$.unsubscribe();
        }
      }
    );
  }

  getRoleExtendUsers(roleId: number, currentPage: number, pageSize: number) {
    const roleUser$ = this.roleService.getUserExtendByRoleId(roleId, currentPage, pageSize).subscribe(
      data => {
        if (data.meta.code === 6666) {
          this.modalUsers = data.data.data.list;
          this.modalTotalItems = data.data.data.total;
          roleUser$.unsubscribe();
        } else if (data.meta.code === 1008) {
          roleUser$.unsubscribe();
          this.alert = AlertEnum.DANGER;
          this.msg = '您无此api权限';
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
  selectModalRoleUser(selectItem: any) {
    this.modalSelectedUser = selectItem;
  }
  addRoleUser(template: any) {
    if (!this.selectedRole) {
      this.msg = '请选择对应角色';
      return;
    }
    this.getRoleExtendUsers(this.selectedRole.id, this.modalCurrentPage, this.modalPageSize);
    this.modalSelected = 3;
    this.bsModalRef = this.modalService.show(template);
  }

  deleteRoleUser() {

    if (this.selectedRoleUser == null || this.selectedRoleUser === undefined) {
      this.msg = '请选择用户';
      return;
    } else {
      if (!confirm('确认删除?')) {
        return;
      }
      const deleteUser$ = this.roleService.deleteUserAuthorityRole(this.selectedRoleUser.uid, this.selectedRole.id).subscribe(
        data => {
          if (data.meta.code === 6666) {
            this.msg = '删除成功';
            deleteUser$.unsubscribe();
            this.getRoleUsers(this.selectedRole.id, this.userCurrentPage, this.userPageSize);
          } else if (data.meta.code === 1008) {
            deleteUser$.unsubscribe();
            this.alert = AlertEnum.DANGER;
            this.msg = '您无此api权限';
          } else {
            this.msg = '删除失败';
            deleteUser$.unsubscribe();
          }
        }
      );
    }
  }

  userPageChanged(event: any) {
    this.userCurrentPage = event.page;
    this.getRoleUsers(this.selectedRole.id, this.userCurrentPage, this.userPageSize);
  }

  // --------------modal------------------

  submitAddModal() {
    this.bsModalRef.hide();
    // api add
    if (this.modalSelected === 1) {
      if (!this.modalSelectedApi) {
        this.msg = '请选择要添加的API';
        return;
      }
      const addApi$ = this.roleService.roleAuthorityApi(this.selectedRole.id, this.modalSelectedApi.id).subscribe(
        data => {
          if (data.meta.code === 6666) {
            this.msg = '授权添加成功';
            this.getRoleApis(this.selectedRole.id, this.apiCurrentPage, this.apiPageSize);
            addApi$.unsubscribe();
          } else if (data.meta.code === 1008) {
            addApi$.unsubscribe();
            this.alert = AlertEnum.DANGER;
            this.msg = '您无此api权限';
          } else {
            this.msg = '授权添加失败';
            addApi$.unsubscribe();
          }
        }
      );
    }

    // menu add
    if (this.modalSelected === 2) {
      if (!this.modalSelectedMenu) {
        this.msg = '请选择要添加的菜单';
        return;
      }
      const addMenu$ = this.roleService.roleAuthorityMenu(this.selectedRole.id, this.modalSelectedMenu.id).subscribe(
        data => {
          if (data.meta.code === 6666) {
            this.msg = '授权添加成功';
            this.getRoleMenus(this.selectedRole.id, this.menuCurrentPage, this.menuPageSize);
            addMenu$.unsubscribe();
          } else if (data.meta.code === 1008) {
            addMenu$.unsubscribe();
            this.alert = AlertEnum.DANGER;
            this.msg = '您无此api权限';
          } else {
            this.msg = '授权添加失败';
            addMenu$.unsubscribe();
          }
        }
      );
    }

    // user add
    if (this.modalSelected === 3) {
      if (!this.modalSelectedUser) {
        this.msg = '请选择要添加的用户';
        return;
      }
      const addUser$ = this.roleService.userAuthorityRole(this.modalSelectedUser.uid, this.selectedRole.id).subscribe(
        data => {
          if (data.meta.code === 6666) {
            this.msg = '授权添加成功';
            this.getRoleUsers(this.selectedRole.id, this.userCurrentPage, this.userPageSize);
            addUser$.unsubscribe();
          } else if (data.meta.code === 1008) {
            addUser$.unsubscribe();
            this.alert = AlertEnum.DANGER;
            this.msg = '您无此api权限';
          } else {
            this.msg = '授权添加失败';
            addUser$.unsubscribe();
          }
        }
      );
    }

  }

  modalPageChanged(event: any) {
    this.modalCurrentPage = event.page;
    switch (this.modalSelected) {
      case 1 : this.getRoleExtendApis(this.selectedRole.id, this.modalCurrentPage, this.modalPageSize);
      break;
      case 2 : this.getRoleExtendMenus(this.selectedRole.id, this.modalCurrentPage, this.modalPageSize);
      break;
      case 3 : this.getRoleExtendUsers(this.selectedRole.id, this.modalCurrentPage, this.modalPageSize);
      break;
      default : break;
    }
  }

  // ----------alert----------------
  reloadAlertMsg(msg_: string) {
    this.msg = msg_;
  }
}
