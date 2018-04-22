import { Component, OnInit } from '@angular/core';
import {AlertEnum} from '../../../common/alert-enum.enum';
import {LogService} from '../../../service/log.service';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css']
})
export class UserLogComponent implements OnInit {

  accountLog: any[];
  operateLog: any[];

  // app-alert info
  alert: AlertEnum = AlertEnum.DANGER;
  msg: string = '默认提示信息';

  // pagination info
  pageSize1: number = 10;
  totalItems1: number;
  currentPage1: number = 1;
  pageSize2: number = 10;
  totalItems2: number;
  currentPage2: number = 1;
  disabled: boolean = false;

  // app-content-header info
  firstName: string = '用户管理';
  secondName: string = '日志记录';
  detail: string = '用户登录和操作日志';

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.getAccountLogList();
    this.getOperateLogList();
  }

  getAccountLogList() {
    const accountLog$ = this.logService.getAccountLogList(this.currentPage1, this.pageSize1).subscribe(
      data => {
        if (data.meta.code === 6666) {
          this.accountLog = data.data.data.list;
          this.totalItems1 = data.data.data.total;
          accountLog$.unsubscribe();
        } else if (data.meta.code === 1008) {
          accountLog$.unsubscribe();
          this.alert = AlertEnum.WARNING;
          this.msg = '您无此api权限';
        } else {
          this.msg = '获取失败';
          accountLog$.unsubscribe();
        }
      }
    );
  }

  getOperateLogList() {
    const operateLog$ = this.logService.getOperateLogList(this.currentPage2, this.pageSize2).subscribe(
      data => {
        if (data.meta.code === 6666) {
          this.operateLog = data.data.data.list;
          this.totalItems2 = data.data.data.total;
          operateLog$.unsubscribe();
        } else if (data.meta.code === 1008) {
          operateLog$.unsubscribe();
          this.alert = AlertEnum.WARNING;
          this.msg = '您无此api权限';
        } else {
          this.msg = '获取失败';
          operateLog$.unsubscribe();
        }
      }
    );
  }


  // 分页
  pageChanged1(event: any) {
    this.currentPage1 = event.page;
    this.pageSize1 = event.itemsPerPage;
    // again查询
    this.getAccountLogList();
  }

  // 分页
  pageChanged2(event: any) {
    this.currentPage2 = event.page;
    this.pageSize2 = event.itemsPerPage;
    // again查询
    this.getOperateLogList();
  }
  // alert
  reloadAlertMsg(msg_: string) {
    this.msg = msg_;
  }
}
