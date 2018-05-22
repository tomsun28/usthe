# usthe

- ```usthe```是```restful URL```资源无状态认证权限管理系统的前端,基于```angular+typeScript+adminLte```,后端[bootshiro](https://gitee.com/tomsun28/bootshiro)  
- 区别于一般,提供页面可配置式的,动态的 ```restful api``` 安全管理支持  
- 数据传输动态秘钥加密,```jwt```过期刷新,用户操作监控等 加固应用安全  


## 使用和一些约定   
--------

- 您使用此项目在后端开发好```api```后,需要在前端页面 资源配置->API管理 新增基于```ant```匹配风格的```api```(约定没有配置的api没有保护)
- ```eg:``` 获取角色关联的对应用户列表 ```rest-url```为 ```/role/user/{roleId}/{currentPage}/{pageSize}```访问方式为```GET```, 您需要在页面新增```api:``` ```/role/user/*/*/*``` ```GET```方式
- 自定义```url```匹配链约定为 ```url=``` ```url+"=="+httpMethod```
- 页面添加了```api```后,您需要在 资源配置->角色管理 配置您想要授权角色的API,菜单,关联用户等资源(约定授权给```auth_anon```角色的```api```可以被所有人访问,,注意没有授权给任何角色的api是可以被任何人访问的)
- 授权菜单在第一次登录时已经获取存储到```sessionStorage```防止重复获取,您授权变更菜单之后想要看的效果需要关闭页面重新打开(或者清除```sessionStorage```之后会自动获取授权菜单)
- have fun  

**学习交流QQ群**  **482621971**


## 项目的基础框架设计：  

总的长这样：  

![image1](/image/image1.PNG)  

<br>

#### 前端usthe  

基于```angular5 + angular-cli + typeScript + rxjs + bootstrap + adminLTE```,践行angular最佳实践。  
过程中node,webpack等有用到过,但我不熟。。。

#### 后端bootshiro  

基于```springboot + apache shiro + mybatis```框架，restful风格api，自定义状态码，json-web-token，druid数据库连接池，swagger文档生成，redis存储refreshtoken和动态秘钥，maven，MD5单向加密和AES双向等。。。  

#### gate -nginx  

这个nginx作为反向代理服务器，解决了跨域,真实IP头(现服务器端支持跨域可不用nginx)。另一个nginx作为angular应用服务器，tomcat作为bootshiro的服务器。  

反向代理的nginx.conf见: [conf](https://github.com/tomsun28/DockerFile/blob/master/nginx/nginx.conf)  

#### 持续集成  

流程长这样~：    

![image2](/image/image2.PNG)  

详细实现技术见另一篇:  [docker学习](https://segmentfault.com/a/1190000013088818)  



## 相关文档  
--------

- [前后端分离实践](https://segmentfault.com/blog/tomsun28)  
- [api权限管理系统与前后端分离实践](https://segmentfault.com/a/1190000014368885)  
- [基于shiro的改造集成真正支持restful请求](https://segmentfault.com/a/1190000014545172)   
- [签发的用户认证token超时刷新策略](https://segmentfault.com/a/1190000014545422)  
- [传输密码动态加密解密](https://segmentfault.com/a/1190000014544933)  
ps(之前是写在下面的太长有点乱)   



## 部署  
--------
0.安装nginx(可选)  

- 这里使用docker安装[nginx-docker](https://github.com/tomsun28/DockerFile/tree/master/nginx)
- clone 上面的nginx-docker仓库到本地: git clone https://gitee.com/tomsun28/DockerFile.git
- 进入nginx目录修改nginx.conf对应参数: 要代理的后端bootshiro服务IP,要代理的前端usthe地址IP
- 进入nginx目录下,生成nginx镜像：docker build -t nginx:1.0 .
- 启动nginx: docker run -d -p 80:80 --name nginx nginx:1.0


1.IDE启动调试  

- fork 项目到自己的仓库(欢迎star^.^)  
- clone 项目到本地 git clone https://gitee.com/yourName/usthe.git
- 用WebStorm导入
- 需要node环境
- 安装angular cli工具 npm install -g @angular/cli@latest
- 进入项目目录 npm install
- 修改/src/environments/environments.ts开发环境的apiBaseUrl对应为后端服务器提供api服务地址
- 若使用nginx做代理(apiBaseUrl为nginx地址,约定nginx-url+'/api/'为提供api的后端项目根url,具体可在nginx.conf里修改)
- ng serve 启动 
- 前提启动了后端[bootshiro](https://github.com/tomsun28/bootshiro)
- 访问浏览器ok http://localhost:4200

**这个本地开发环境部署现可以去掉nginx,但生产环境最好还是要有的**

2.docker本地部署  

- fork 项目到自己的仓库(欢迎star^.^)  
- clone 项目到本地 git clone https://gitee.com/yourName/usthe.git
- 修改/src/environments/environments.prod.ts生产环境的apiBaseUrl
- 在项目目录下 docker build -t usthe:1.0 . 
- docker images看是否生成镜像成功
- 运行 docker run -d -p 4300:4200 --name haiLady usthe:1.0
- docker ps 就可以看见您的haiLady了
- 前提部署了后端[bootshiro](https://github.com/tomsun28/bootshiro)
- 访问浏览器 http://localhost:4300

3.jenkins+docker持续集成持续部署CICD  

- fork 项目到自己的仓库(欢迎star^.^)  
- clone 项目到本地 git clone https://gitee.com/yourName/usthe.git
- 更改生产和开发环境对应的/src/environments/environments  apiBaseUrl
- 搭建CICD环境有点繁琐，[看这篇最下面](https://segmentfault.com/a/1190000013088818)
- 参照搭建完成后,usthe对应的jenkins下运行shell:
````
#!/bin/bash

#build in jenkins sh

#docker docker hub仓库地址,之后把生成的镜像上传到  registry or docker hub
REGISTRY_URL=127.0.0.1:5000
#docker login --username tomsun28 --password xxxx

#根据时间生成版本号
TAG=$REGISTRY_URL/$JOB_NAME:`date +%y%m%d-%H-%M`

#使用放在项目下面的Dockerfile打包生成镜像
docker build -t $TAG $WORKSPACE/.

docker push $TAG
docker rmi $TAG

#判断之前运行的容器是否还在，在就删除
if docker ps -a | grep -i $JOB_NAME;then
docker rm -f $JOB_NAME
fi

#用最新版本的镜像运行容器

docker run -d -p 4200:80 --name $JOB_NAME $TAG

````


## 仓库 

gitee:   

[bootshiro](https://gitee.com/tomsun28/bootshiro)   
[usthe](https://gitee.com/tomsun28/usthe) 
 
github:  

[bootshiro](https://github.com/tomsun28/bootshiro)   
[usthe](https://github.com/tomsun28/usthe)  
         


。。。。。持续同步更新。。。。

======================================

欢迎一起完善哦^^  

<br>
<br>

### 效果展示  

![image4](/image/image4.PNG)   

![image5](/image/image5.PNG)   

![image6](/image/image6.PNG)   

![image7](/image/image7.PNG)   




thanks:  

[Howieair](http://iconfont.cn/user/detail?spm=a313x.7781069.0.d214f71f6&uid=187147)的小猪图标  
[zhangkaitao](http://jinnianshilongnian.iteye.com/blog/2018936)的跟我学shiro   
网络上前辈们的教程文章开源项目


<br>
<br>
