import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertEnum} from '../alert-enum.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

   msgFlag: boolean;
  // 最初的msg,此msg为标志位不显示
   msgInit: string = '默认提示信息';
   alertClass: string;
   _msg: string;

   // 给调用的上层组件发送恢复信息
   @Output()
   msg_: EventEmitter<string> = new EventEmitter<string>();

  @Input() public timeout: number = 1500;
  @Input() public msgLabel: string = '提示!';
  @Input() public alert: AlertEnum = AlertEnum.INFO;

 // @Output() public msg: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.msgFlag = false;
    this._msg = this.msgInit;
    this.msg_.emit(this._msg);
  }

  private showInfo() {
    this.msgFlag = true;
    switch (this.alert) {
      case AlertEnum.DANGER:
        this.alertClass = 'alert-danger';
        break;
      case AlertEnum.WARNING:
        this.alertClass = 'alert-warning';
        break;
      case AlertEnum.INFO:
        this.alertClass = 'alert-info';
        break;
      case AlertEnum.SUCCESS:
        this.alertClass = 'alert-success';
        break;
      default:
        this.alertClass = 'alert-info';
        break;
    }
    setTimeout(() => {
      this.ngOnInit();
    }, this.timeout);
  }


  @Input()
  public set msg(msg: string) {
    if (msg === this.msgInit) {
      return;
    }
    if (!msg || msg === '' || msg === undefined) {
      return;
    }
    this._msg = msg;
    this.showInfo();
  }
  public get msg(): string {
    return this._msg;
  }

}
