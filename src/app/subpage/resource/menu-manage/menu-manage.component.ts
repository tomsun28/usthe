import {Component, OnInit, TemplateRef} from '@angular/core';
import {AlertEnum} from '../../../common/alert-enum.enum';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AppConfig} from '../../../util/app-config';
import {ResourceService} from '../../../service/resource.service';
import {MenuTreeNode} from '../../../pojo/MenuTreeNode';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.css']
})
export class MenuManageComponent implements OnInit {


  // modal-template info
  menu: MenuTreeNode = new MenuTreeNode();
  appMenuIcon: any[];
  modalFlag: number = 1;
  modalName: string = '添加菜单';
  bsModalRef: BsModalRef;

  menuTree: any[];
  menuList: any[] = [];
  selectedMenu: any;

  // app-alert info
  alert: AlertEnum = AlertEnum.DANGER;
  msg: string = '默认提示信息';

  // app-content-header info
  firstName: string = '资源管理';
  secondName: string = '菜单管理';
  detail: string = '对菜单的维护';

  constructor(private modalService: BsModalService,
              private appConfig: AppConfig,
              private resourceService: ResourceService) {
    this.appMenuIcon = this.appConfig.appMenuIcon;
  }

  ngOnInit() {
    const resource$ = this.resourceService.getMenuList().subscribe(
      data => {
        // this.responseVO = data;
        if (data.meta.code === 6666) {
          this.menuTree = data.data.menuTree;
          console.log(this.menuTree);
          resource$.unsubscribe();
          this.buildMenuList(this.menuTree);
        } else if (data.meta.code === 1008) {
          resource$.unsubscribe();
          this.alert = AlertEnum.DANGER;
          this.msg = '您无此api权限';
        }
      }
    );
  }

  public buildMenuList(menuTree: any[]) {
    menuTree.forEach(menu => {
      this.menuList.push(menu);
      if (menu.children != null || menu.children === '') {
        this.buildMenuList(menu.children);
      }
    });
  }

  public addMenu(template: TemplateRef<any>) {
    this.modalFlag = 1;
    this.modalName = '添加菜单';
    this.menu = new MenuTreeNode();
    this.bsModalRef = this.modalService.show(template);
  }

  public editMenu(template: TemplateRef<any>) {
    if (this.selectedMenu === null || this.selectedMenu === undefined) {
      this.msg = '请选择菜单';
      return;
    } else {
      this.modalFlag = 2;
      this.modalName = '修改菜单';
      this.menu = this.selectedMenu;
      this.bsModalRef = this.modalService.show(template);
    }
  }

  check(menu: MenuTreeNode) {
    if (!menu.code) {
      this.msg = '编码不能为空';
      return false;
    } else if (!menu.name) {
      this.msg = '名称不能为空';
      return false;
    } else if (!menu.icon) {
      this.msg = '图标不能为空';
      return false;
    } else if (!menu.status) {
      this.msg = '状态不能为空';
      return false;
    } else if (!menu.parentId) {
      this.msg = '请选择父菜单';
      return false;
    } else if (!menu.type) {
      this.msg = '请选择类型';
    }
    return true;
  }

  public getSelectedMenu(menu: any) {
    this.selectedMenu = menu;
  }

  public submitModal() {
    this.bsModalRef.hide();
    if (!this.check(this.menu)) {
      return;
    }
    // modalFlag === 1 为增加菜单
    if (this.modalFlag === 1) {
      const addMenu$ = this.resourceService.addMenu(this.menu).subscribe(
        data => {
          if (data.meta.code === 6666) {
            // add success
            this.alert = AlertEnum.SUCCESS;
            this.msg = '添加成功';
            addMenu$.unsubscribe();
            this.ngOnInit();
          } else if (data.meta.code === 1008) {
            addMenu$.unsubscribe();
            this.alert = AlertEnum.DANGER;
            this.msg = '您无此api权限';

          }
        }
      );
    }
    // modalFlag === 2 为修改菜单
    if (this.modalFlag === 2) {
      const modifyMenu$ = this.resourceService.modifyMenu(this.menu).subscribe(
        data => {
          if (data.meta.code === 6666) {
            // modify success
            this.alert = AlertEnum.SUCCESS;
            this.msg = '修改成功';
            modifyMenu$.unsubscribe();
            this.ngOnInit();
          } else if (data.meta.code === 1008) {
            modifyMenu$.unsubscribe();
            this.alert = AlertEnum.DANGER;
            this.msg = '您无此api权限';

          }
        }
      );
    }
  }

  public deleteMenu() {
    if (this.selectedMenu === null || this.selectedMenu === undefined || !this.selectedMenu.id) {
      this.msg = '请选择菜单';
      return;
    } else {
      if (confirm('确认删除' + this.selectedMenu.name)) {
        const deleteMenu$ = this.resourceService.deleteMenuByMenuId(this.selectedMenu.id).subscribe(
          data => {
            if (data.meta.code === 6666) {
              // delete success
              this.alert = AlertEnum.SUCCESS;
              this.msg = '删除成功';
              deleteMenu$.unsubscribe();
              this.ngOnInit();
            } else if (data.meta.code === 1008) {
              deleteMenu$.unsubscribe();
              this.alert = AlertEnum.DANGER;
              this.msg = '您无此api权限';

            }
          }
        );

      }
    }
  }

  reloadAlertMsg(_msg: string) {
    this.msg = _msg;
  }

}
