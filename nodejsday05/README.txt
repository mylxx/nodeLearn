01 每次访问 / 数据库中新增一条记录
   assert.equal(null,err); 调试 比较null 和err 相当于 if err return;xt

02 把常用的增删改查 封装成函数 module DAO层（data access object)
   增和查 分页的函数  
   删除和 api 不对 一直删除修改 没起作用；？？？？？？
   修改 可以了

03 做一个 留言本；

04 express cookie res设置cookie req读取cookie; npm install cookie-parser

05 npm install express-session 、

06 登录验证 MD5加密 经典案例； md5加密常用于作为版本校验；node自带模块 const crypto = require('crypto');默认集成 不需要npm install ; 负责加密；

07 md5 案例；

08 有加密的登录 稍微完整的登录 案例；

09 图片的处理 第三方；只要服务器需要处理图片 就要安装 graphicsmagick http://www.graphicsmagick.org/
   gm convert 2.jpg 2.png   转换图片格式；
   gm mogrify -output-directory testEs -resize 320x200 *.jpg
   gm mogrify -resize 320x200 *.jpg   修改图片大小
   nodejs 要使用 GraphicsMagick 需要装一个gm包 https://www.npmjs.com/
   npm install gm
10 前台界面 裁剪图片 传值（图片，宽高xy五个参数）到 /caijian 

