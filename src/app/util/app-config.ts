import {Injectable} from '@angular/core';

@Injectable()
export class AppConfig {
  public appConfig: any = {
    baseUrl: 'http://localhost:80/api/',
    // baseUrl: 'http://116.196.81.106/api/',
    appName: 'usthe',
    version: '1.0.0',
  };
  public appMenuIcon: any[] = [
    'fa fa-share',
    'fa fa-pie-chart',
    'fa fa-th',
    'fa fa-folder',
    'fa fa-cog',
    'fa fa-heart',
    'fa fa-random',
    'fa-youtube-play',
    'fa fa-table',
    'fa fa-area-chart',
    'fa fa-bar-chart',
    'fa fa-adjust',
    'fa fa-cloud',
    'fa fa-picture-o',
    'fa fa-rss-square',
    'fa fa-send',
    'fa fa-share-alt',
    'fa fa-tag',
    'fa fa-user',
    'fa fa-wrench'
  ];
}
