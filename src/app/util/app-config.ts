import {Injectable} from '@angular/core';

@Injectable()
export class AppConfig {
  public appConfig: any = {
    baseUrl: 'http://localhost:80/api/',
    appName: 'usthe',
    version: '1.0.0',
  };
  public appMenuIcon: any[] = [
    'fa fa-share',
    'fa fa-pie-chart',
    'fa fa-th',
    'fa fa-folder'
  ];
}
