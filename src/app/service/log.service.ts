import { Injectable } from '@angular/core';
import {HttpUtil} from '../util/http-util';

@Injectable()
export class LogService {

  constructor(private httpUtil: HttpUtil ) { }

  getAccountLogList(currentPage: number, pageSize: number) {
    const url = '/log/accountLog/' + currentPage + '/' + pageSize;
    return this.httpUtil.get(url);
  }
  getOperateLogList(currentPage: number, pageSize: number) {
    const url = 'log/operationLog/' + currentPage + '/' + pageSize;
    return this.httpUtil.get(url);
  }
}
