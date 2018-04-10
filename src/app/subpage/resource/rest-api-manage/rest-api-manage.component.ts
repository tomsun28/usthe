import {Component, OnInit, TemplateRef} from '@angular/core';
import {MenuTreeNode} from '../../../pojo/MenuTreeNode';
import {AlertEnum} from '../../../common/alert-enum.enum';
import {ResponseVO} from '../../../pojo/ResponseVO';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ResourceService} from '../../../service/resource.service';

@Component({
  selector: 'app-rest-api-manage',
  templateUrl: './rest-api-manage.component.html',
  styleUrls: ['./rest-api-manage.component.css']
})
export class RestApiManageComponent implements OnInit {

  private responseVO: ResponseVO;

  // modal-template info
  api: MenuTreeNode = new MenuTreeNode();
  modalFlag: number = 1;
  modalName: string = '添加 rest api';
  bsModalRef: BsModalRef;

  apis: any[];
  selectedApi: any;
  apiTeam: any[];
  // -1表示获取分类列信息(初始化时用) 0表示获取全部API信息 其他表示获取所选择分类id所下属的API信息
  selectTeamId: number = 0;
  selectTeamName: string = '资源类别';

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
  secondName: string = 'API管理';
  detail: string = 'rest api维护';

  constructor(private modalService: BsModalService, private resourceService: ResourceService) { }

  ngOnInit() {
    // -1表示获取API分类信息(初始化时用)
    const resourceTeam$  = this.resourceService.getRestApiList(-1, this.currentPage, this.pageSize).subscribe(
      data => {
        this.responseVO = data;
        if (this.responseVO.meta.code === 6666) {
          this.apiTeam = this.responseVO.data.data;
          resourceTeam$.unsubscribe();
        } else {
          this.msg = '查询失败';
        }
      }
    );
    this.getApiList(this.selectTeamId);
  }

  getApiList(id: number) {
    const resource$ = this.resourceService.getRestApiList(id, this.currentPage, this.pageSize).subscribe(
      data => {
        this.responseVO = data;
        if (this.responseVO.meta.code === 6666) {
          this.apis = this.responseVO.data.data.list;
          this.totalItems = this.responseVO.data.data.total;
          resource$.unsubscribe();
        } else {
          this.msg = '查询失败';
        }
      }
    );
  }

  selectTeam(teamId: number, teamName: string) {
    this.selectTeamId = teamId;
    this.selectTeamName = teamName;
    this.ngOnInit();
  }

  selectApi(api: any) {
    this.selectedApi = api;
  }

  // 分页
  pageChanged(event: any) {
    this.currentPage = event.page;
    this.pageSize = event.itemsPerPage;
    // again查询
    this.getApiList(this.selectTeamId);
  }

  public addApi(template: TemplateRef<any>) {
    this.modalFlag = 1;
    this.modalName = '添加API';
    this.api = new MenuTreeNode();
    this.bsModalRef = this.modalService.show(template);
  }

  public editApi(template: TemplateRef<any>) {
    if (this.selectedApi === null || this.selectedApi === undefined) {
      this.msg = '请选择API';
      return;
    } else {
      this.modalFlag = 2;
      this.modalName = '修改API';
      this.api = this.selectedApi;
      this.bsModalRef = this.modalService.show(template);
    }
  }

  public deleteApi() {
    if (this.selectedApi === null || this.selectedApi === undefined || !this.selectedApi.id) {
      this.msg = '请选择API资源';
      return;
    } else {
      if (confirm('确认删除' + this.selectedApi.name)) {
        const deleteMenu$ = this.resourceService.deleteRestApi(this.selectedApi.id).subscribe(
          data => {
            this.responseVO = data;
            if (this.responseVO.meta.code === 6666) {
              // delete success
              this.alert = AlertEnum.SUCCESS;
              this.msg = '删除成功';
              deleteMenu$.unsubscribe();
              this.ngOnInit();
            }
          }
        );
      }
    }
  }

  check(api: MenuTreeNode) {
    if (!api.code) {
      this.msg = '编码不能为空';
      return false;
    } else if (!api.name) {
      this.msg = '名称不能为空';
      return false;
    } else if (!api.type) {
      this.msg = '请选择类型';
      return false;
    } else if (api.type.toString() === '2') {
      if (!api.method) {
        this.msg = '请选择访问方式';
        return false;
      } else if (!api.uri) {
        this.msg = 'URI不能为空';
        return false;
      } else if (!api.parentId) {
        this.msg = '请选择API类别';
        return false;
      }
    }
    return true;
  }

  submitModal() {
    this.bsModalRef.hide();
    if (!this.check(this.api)) {
      return;
    }
    // 排除增加为类别时所选择的父类不是*分类集合*的情况

    if (this.api.type.toString() === '3') {
      if (this.api.parentId.toString() !== '110') {
        this.msg = '~API类别~类型资源请加入~分类集合~中';
        return;
      }
    }

    // modalFlag === 1 为增加API
    if (this.modalFlag === 1) {
      const addMenu$ = this.resourceService.addRestApi(this.api).subscribe(
        data => {
          this.responseVO = data;
          if (this.responseVO.meta.code === 6666) {
            // add success
            this.alert = AlertEnum.SUCCESS;
            this.msg = '添加成功';
            addMenu$.unsubscribe();
            this.ngOnInit();
          }
        }
      );
    }
    // modalFlag === 2 为修改API
    if (this.modalFlag === 2) {
      const modifyMenu$ = this.resourceService.updateRestApi(this.api).subscribe(
        data => {
          this.responseVO = data;
          if (this.responseVO.meta.code === 6666) {
            // modify success
            this.alert = AlertEnum.SUCCESS;
            this.msg = '修改成功';
            modifyMenu$.unsubscribe();
            this.ngOnInit();
          }
        }
      );
    }
  }

  // alert
  reloadAlertMsg(msg_: string) {
    this.msg = msg_;
  }

}
