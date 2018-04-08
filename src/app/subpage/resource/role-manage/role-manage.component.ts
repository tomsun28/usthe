import { Component, OnInit } from '@angular/core';
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


  responseVO: ResponseVO;

  roles: any[];
  selectedRole: any;

  // modal-template info
  role: RoleVO = new RoleVO();
  modalFlag: number = 1;
  roleModalName: string = '添加角色';
  bsModalRef: BsModalRef;

  // app-alert info
  alert: AlertEnum = AlertEnum.DANGER;
  msg: string = '默认提示信息';

  // pagination info
  pageSize: number = 10;
  totalItems: number;
  currentPage: number = 1;
  disabled: boolean = false;

  // app-content-header info
  firstName: string = '资源管理';
  secondName: string = '角色管理';
  detail: string = '角色关联维护';

  constructor(private modalService: BsModalService, private roleService: RoleService) { }

  ngOnInit() {

    const role$ = this.roleService.getRoles(this.currentPage, this.pageSize).subscribe(
      data => {
        this.responseVO = data;
        if (this.responseVO.meta.code === 6666) {
          this.roles = this.responseVO.data.data.list;
          this.totalItems = this.responseVO.data.data.total;
        } else {
          this.msg = '查询失败';
        }
        role$.unsubscribe();
      }
    );
  }



  // ----role----
  selectRole(role: any) {
    this.selectedRole = role;
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
          if (data.meta.code === 6666){
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
          if (data.meta.code === 6666){
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
    this.currentPage = event.page;
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



  // alert
  reloadAlertMsg(msg_: string) {
    this.msg = msg_;
  }
}
