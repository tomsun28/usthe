#### 推荐一个面向REST API的高性能认证鉴权框架 - Sureness    

[Sureness官网](https://su.usthe.com)   
[Gitee仓库](https://gitee.com/dromara/sureness)   
[Github仓库](https://github.com/dromara/sureness)    

欢迎对 [Sureness](https://github.com/dromara/sureness) 了解使用，开源不易，觉得不错给个star鼓励哦！    

也欢迎对Sureness有兴趣的朋友一起贡献开发，QQ交流群：390083213    

#### 📫 背景

在主流的前后端分离架构中，如何通过有效快速的认证鉴权来保护后端提供的`REST API`变得尤为重要。对现存框架，不原生支持`RESTful`的`Apache Shiro`，
还是深度绑定`Spring`的`Spring Security`，或多或少都不是我们的理想型。   
于是乎`Sureness`诞生了，我们希望能解决这些，提供一个面向**REST API**，**无框架依赖**，可以**动态修改权限**，**多认证策略**，**更快速度**，**易用易扩展**的认证鉴权框架。

## 🎡 <font color="green">介绍</font>

> [Sureness](https://github.com/dromara/sureness) 是我们在深度使用 `Apache Shiro` 之后,吸取其优点全新设计开发的一个认证鉴权框架     
> 面向 `REST API` 的认证鉴权,基于 `RBAC` (用户-角色-资源)主要关注于对 `API` 的安全保护     
> 无特定Web框架依赖(已有 `Spring Boot,Quarkus,Javalin,Ktor,Micronaut,Jfinal,Solon` 等集成样例)     
> 支持动态修改权限配置(动态修改配置每个 `API` 谁有权访问)   
> 支持 `Websocket` ,主流 `HTTP` 容器 `Servlet` 和 `JAX-RS`       
> 支持多种认证策略, `JWT, Basic Auth, Digest Auth` ... 可扩展自定义认证方式      
> 基于改进的字典匹配树拥有的高性能      
> 良好的扩展接口, 样例和文档助急速理解扩展使用

> `Sureness`的低配置，易扩展，不耦合其他框架，希望能对系统多场景快速安全的保护

##### 🔍 对比

| ~         | sureness | shiro | spring security |
| ---       | ---      | ---   | ---  |
| **多框架支持**  | 支持      | 需改动支持   | 不支持 |
| **restful api** | 支持 | 需改动支持   | 支持 |
| **websocket** | 支持 | 不支持   | 不支持 |
| **过滤链匹配**  | 优化的字典匹配树 | ant匹配 | ant匹配 |
| **注解支持**    | 支持      | 支持      | 支持 |
| **servlet**    | 支持      | 支持      | 支持|
| **jax-rs**     | 支持      | 不支持    | 不支持|
| **权限动态修改** | 支持 | 需改动支持 | 需改动支持|
| **性能速度** | 较快 | 较慢 | 较慢|
| **学习曲线** | 简单 | 简单 | 陡峭|

##### ✌ 支持样例

- [x] Sureness集成**Spring Boot**样例(配置文件方案) [sample-bootstrap](sample-bootstrap)
- [x] Sureness集成**Spring Boot**样例(数据库方案) [sample-tom](sample-tom)
- [x] Sureness集成**Quarkus**样例 [sample-quarkus](samples/quarkus-sureness)
- [x] Sureness集成**Javalin**样例 [sample-javalin](samples/javalin-sureness)
- [x] Sureness集成**Ktor**样例 [sample-ktor](samples/ktor-sureness)
- [x] Sureness集成**Spring Webflux**样例 [sample-spring-webflux](samples/spring-webflux-sureness)
- [x] Sureness集成**Micronaut**样例 [sample-micronaut](samples/micronaut-sureness)
- [x] Sureness集成**Jfinal**样例 [sample-jfinal](samples/jfinal-sureness)
- [x] Sureness集成**Solon**样例 [sample-solon](samples/solon-sureness)
- [x] Sureness集成**Spring Gateway**样例 [sample-spring-gateway](samples/spring-gateway-sureness)
- [x] Sureness集成**Zuul**样例 [sample-zuul](samples/zuul-sureness)
- [x] Sureness使用Session样例 [sureness-session](samples/sureness-session)
- [x] Sureness分布式缓存Session样例 [sureness-redis-session](samples/sureness-redis-session)
- [x] More samples todo



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
- clone 上面的nginx-docker仓库到本地: git clone https://github.com/tomsun28/DockerFile.git
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


Thanks Open Source license support by   [![jetBrains Open Source](/image/jetbrains.svg)](https://www.jetbrains.com/?from=bootshiro)

<br>
<br>