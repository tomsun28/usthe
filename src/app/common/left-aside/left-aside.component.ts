import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {UserVO} from '../../pojo/UserVO';
import {ResourceService} from '../../service/resource.service';
import {ResponseVO} from '../../pojo/ResponseVO';

@Component({
  selector: 'app-left-aside',
  templateUrl: './left-aside.component.html',
  styleUrls: ['./left-aside.component.css']
})
export class LeftAsideComponent implements OnInit {

   treeMenu: any[];
   user: UserVO;
  private responseVO: ResponseVO;

  constructor(private authService: AuthService,
              private resourceService: ResourceService) { }

  ngOnInit() {
    this.authService.checkLogin();
    this.user = this.authService.getUser();
    if (null != this.authService.getMenuTree()) {
      this.treeMenu = this.authService.getMenuTree();
    } else {
      // 向服务器申请资源
      const resource$ = this.resourceService.getAuthorityMenuByUid().subscribe(
        data => {
          this.responseVO = data;
          console.log(data);
          if (this.responseVO.meta.code === 6666) {
            this.treeMenu = this.responseVO.data.menuTree;
            console.log(this.treeMenu);
            this.authService.updateMenuTree(this.treeMenu);
            resource$.unsubscribe();
          }
        },
      );
    }
    // this.initMenuList(this.treeMenu);
  }

  private initMenuList(treeMenus: any[]): void {
    for (let i = 0; i < treeMenus.length; i++) {
      treeMenus[i].isOpen = false;
      if (treeMenus[i].children != null) {
        this.initMenuList(treeMenus[i].children);
      }
    }
  }
}
