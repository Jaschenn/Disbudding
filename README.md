# Disbudding
打尖儿吗 微信小程序
采用了Bmob后端云。数据库信息如下：
### 1.商家表 Seller

字段名 | 类型 | 注释
--------  | ------ | --------
title | String | 店名 
logo_url | String | 头像
telephone | String | 联系电话
address | String  | 地址
notice | String | 公告
business_start | String | 开始营业时间
business_end | String | 结束营业时间
express_fee | Number | 配送费
min_amount | Number | 起送金额

### 2.分类表 Category
字段名 | 类型 | 注释
--------  | ------ | --------
title | String | 店名 
priority | Number | 优先级（越小越前）

### 3.菜品表 Food

字段名 | 类型 | 注释
--------  | ------ | --------
title | String | 店名 
thumb_url | String | 主图
summary | String | 简述
price | Number | 价格
category | Pointer | Cateogry分类表
priority | Number | 优先级（越小越前）

### 4.地址表 Address

字段名 | 类型 | 注释
--------  | ------ | --------
realname | String | 姓名
gender | Number | 1先生 0女士
mobile | String | 手机
area | String | 区域
detail | String | 详细地址
user | Pointer | 关联用户

### 5.订单表 Order

字段名 | 类型 | 注释
--------  | ------ | --------
user | Pointer | 下单人
title | String | 摘要
quantity | Number | 购买数量
address | Pointer | 地址
express_fee | Number | 配送费
amount | Number | 餐费
total | Number | 总计
status | Number | 状态（0，待付款；1，已付款；2，派送中；-1，已取消）
detail | Array | 清单
sn | String | 订单号

### 6.用户表

字段名 | 类型 | 注释
--------  | ------ | --------
isAdmin | Bool | true代表此用户为管理员
userInfo | Object | 用户昵称头像等
authData | Object | Bｍob维护的用户openid等信息
------------------------------------------------------------------------------
下单流程如下：
买家在首页选择店铺之后进入到店铺里进行商品的选择。待选择完成之后下单。
卖家将会收到信息。
卖家进行配送时在订单页面出示二维码。
--二维码现在未完成----与店铺未对对应。
当然 你可以选择使用bmob原生的收款方式。
