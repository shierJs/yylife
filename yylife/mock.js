//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据
/*首页轮播*/
Mock.mock('/api/bannerdata', (req, res) => {
  return {
    data: [
        "./static/img/raw_1473406264.png",
        "./static/img/raw_1472383377.jpeg",
        "./static/img/raw_1473406264.png"
      
    ]
  }
})
/* 首页导航*/
Mock.mock('/api/navData', (req, res) => {
  return {
    data: [
      {
        "href": "#icon-meishi",
        "title": "美食",
        "push": "/food"
      },
      {
        "href": "#icon-zhaopinhui",
        "title": "招聘",
        "push": "/job"
        
      },
      {
        "href": "#icon-ershouwupin",
        "title": "二手交易",
        "push": "/market"
      },
      {
        "href": "#icon-toutiao",
        "title": "同城头条",
        "push": "/headlines/0"
      },
      {
        "href": "#icon-richangshenghuo-jiazheng",
        "title": "生活服务",
        "push": "/life"
      },
      {
        "href": "#icon-zu",
        "title": "租房",
        "push": "/rent"
      },
      {
        "href": "#icon-shangpinfangmaimaishoufei",
        "title": "房屋买卖",
        "push": "/homeTradingList"
      },
      {
        "href": "#icon-jinrongtequan",
        "title": "急用钱",
        "push": "/urgentMoney"
        
      },
    ]
  }
})
Mock.mock('/api/swiperData', (req, res) => {
  return {
    data: [{
        "img": "../../static/img/wc.jpg",
        "title": "豆捞开业庆典优惠"
      },
      {
        "img": "../../static/img/icon.png",
        "title": "小米智能手环"
      },
      {
        "img": "../../static/img/t01a5382ad390b78a22.png",
        "title": "买一送一拿好礼"
      },
      {
        "img": "../../static/img/wc.jpg",
        "title": "豆捞开业庆典优惠"
      },
      {
        "img": "../../static/img/icon.png",
        "title": "小米智能手环"
      },
      {
        "img": "../../static/img/t01a5382ad390b78a22.png",
        "title": "买一送一拿好礼"
      },
      {
        "img": "../../static/img/wc.jpg",
        "title": "豆捞开业庆典优惠"
      },
      {
        "img": "../../static/img/icon.png",
        "title": "小米智能手环"
      },
      {
        "img": "../../static/img/t01a5382ad390b78a22.png",
        "title": "买一送一拿好礼"
      }
    ]
  }
})
/*实用工具*/
Mock.mock('/api/tools', (req, res) => {
  return {
    data: [{
        "icon": "#icon-kuaidichaxun",
        "title": "快递查询"
      },
      {
        "icon": "#icon-dakatuijian",
        "title": "应用推荐"
      },
      {
        "icon": "#icon-xiaoer",
        "title": "糗事笑话"
      },
      {
        "icon": "#icon-cunqianguanicon",
        "title": "急用钱"
      }
    ]
  }
})
/*首页楼层*/
Mock.mock('/api/floorData', (req, res) => {
  return {
    data: [{
        "img": "../../static/img/floorImg01.webp",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      },
      {
        "img": "../../static/img/floorImg02.webp",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      },
      {
        "img": "../../static/img/floorImg03.jpg",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      },
      {
        "img": "../../static/img/floorImg01.webp",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      },
      {
        "img": "../../static/img/floorImg02.webp",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      },
      {
        "img": "../../static/img/floorImg03.jpg",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      },
      {
        "img": "../../static/img/floorImg01.webp",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      },
      {
        "img": "../../static/img/floorImg02.webp",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      },
      {
        "img": "../../static/img/floorImg03.jpg",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      },
      {
        "img": "../../static/img/floorImg01.webp",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      },
      {
        "img": "../../static/img/floorImg02.webp",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      },
      {
        "img": "../../static/img/floorImg03.jpg",
        "title": "【宝龙城市广场】烤肉肉贼香",
        "desc": "我是描述的数据付款多少就麻烦了的发士大夫",
        "activities": "满20减18；满58减28；满188减58",
        "browse": "1881"
      }
    ]
  }
})
/*发布类别*/
Mock.mock('/api/release', (req, res) => {
  return {
    data: [{
        "icon": "./static/img/icon/hunsha.png",
        "title": "二手物品"
      },
      {
        "icon": "./static/img/icon/icon35.png",
        "title": "房屋出租"
      },
      {
        "icon": "./static/img/icon/pet.png",
        "title": "房屋买卖"
      },
      {
        "icon": "./static/img/icon/zufang.png",
        "title": "餐饮广告"
      },
      {
        "icon": "./static/img/icon/hunsha.png",
        "title": "求职招聘"
      },
      {
        "icon": "./static/img/icon/icon35.png",
        "title": "生活服务"
      }
    ]
  }
})
/*美食菜单栏数据*/
Mock.mock('/api/menuData', (req, res) => {
  return {
    data: [{
        "title": "全部",
        "item": [{
            "value": "0",
            "label": "全部"
          },
          {
            "value": "1",
            "label": "自助餐"
          },
          {
            "value": "2",
            "label": "江浙菜"
          },
          {
            "value": "3",
            "label": "甜品饮品"
          },
          {
            "value": "4",
            "label": "生日蛋糕"
          },
          {
            "value": "5",
            "label": "小吃快餐"
          },
          {
            "value": "6",
            "label": "徽菜"
          },
          {
            "value": "7",
            "label": "生鲜蔬果"
          },
          {
            "value": "8",
            "label": "香锅烤鱼"
          },

        ]
      },
      {
        "title": "智能排序",
        "item": [{
            "value": "0",
            "label": "智能排序"
          },
          {
            "value": "1",
            "label": "自助餐"
          },
          {
            "value": "2",
            "label": "江浙菜"
          },
          {
            "value": "3",
            "label": "甜品饮品"
          },
          {
            "value": "4",
            "label": "生日蛋糕"
          },
          {
            "value": "5",
            "label": "小吃快餐"
          },
          {
            "value": "6",
            "label": "徽菜"
          },
          {
            "value": "7",
            "label": "生鲜蔬果"
          },
          {
            "value": "8",
            "label": "香锅烤鱼"
          },

        ]
      }
    ]
  }
})
/*测试数据*/
Mock.mock('/api/listData', (req, res) => {
  return {
    data: [{
        "imgSrc": "./static/img/02e02deb19da72351bc317067ae12bdb353381.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/2fa1605fc627a0524efbf0a256dbc3d6100225.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/0081e82ee04cc75ddb2707effbc15b73127695.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/ee09314ed182e925fa39728528cd61a3994707.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/efc4bd7d7a56cfed0bc443a5afc470883170476.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/02e02deb19da72351bc317067ae12bdb353381.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/2fa1605fc627a0524efbf0a256dbc3d6100225.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/0081e82ee04cc75ddb2707effbc15b73127695.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/ee09314ed182e925fa39728528cd61a3994707.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/efc4bd7d7a56cfed0bc443a5afc470883170476.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/02e02deb19da72351bc317067ae12bdb353381.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/2fa1605fc627a0524efbf0a256dbc3d6100225.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/0081e82ee04cc75ddb2707effbc15b73127695.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/ee09314ed182e925fa39728528cd61a3994707.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/efc4bd7d7a56cfed0bc443a5afc470883170476.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/02e02deb19da72351bc317067ae12bdb353381.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/2fa1605fc627a0524efbf0a256dbc3d6100225.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/0081e82ee04cc75ddb2707effbc15b73127695.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/ee09314ed182e925fa39728528cd61a3994707.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/efc4bd7d7a56cfed0bc443a5afc470883170476.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/02e02deb19da72351bc317067ae12bdb353381.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/2fa1605fc627a0524efbf0a256dbc3d6100225.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/0081e82ee04cc75ddb2707effbc15b73127695.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/ee09314ed182e925fa39728528cd61a3994707.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦啦啦啦了了了了了了",
        "prefer": "满100减80,满50减30,满20减5"
      },
      {
        "imgSrc": "./static/img/efc4bd7d7a56cfed0bc443a5afc470883170476.jpg@67w_67h_1e_1c",
        "title": "我是测试标题",
        "desc": "我是美食的描述啦啦啦啦我是最后i一个",
        "prefer": "满100减80,满50减30,满20减5"
      },
    ]
  }
})
/*美食详情页  获取数据思路：传id获取美食详情，用下标模拟*/

/*联动选择器模拟数据*/
Mock.mock('/api/options', (req, res) => {
  return {
    data: [{
        value: "zhinan",
        label: "指南",
        children: [{
            value: "shejiyuanze",
            label: "设计原则",
            children: [{
                value: "yizhi",
                label: "一致"
              },
              {
                value: "fankui",
                label: "反馈"
              },
              {
                value: "xiaolv",
                label: "效率"
              },
              {
                value: "kekong",
                label: "可控"
              }
            ]
          },
          {
            value: "daohang",
            label: "导航",
            children: [{
                value: "cexiangdaohang",
                label: "侧向导航"
              },
              {
                value: "dingbudaohang",
                label: "顶部导航"
              }
            ]
          }
        ]
      },
      {
        value: "zujian",
        label: "组件",
        children: [{
            value: "basic",
            label: "Basic",
            children: [{
                value: "layout",
                label: "Layout 布局"
              },
              {
                value: "color",
                label: "Color 色彩"
              },
              {
                value: "typography",
                label: "Typography 字体"
              },
              {
                value: "icon",
                label: "Icon 图标"
              },
              {
                value: "button",
                label: "Button 按钮"
              }
            ]
          },
          {
            value: "form",
            label: "Form",
            children: [{
                value: "radio",
                label: "Radio 单选框"
              },
              {
                value: "checkbox",
                label: "Checkbox 多选框"
              },
              {
                value: "input",
                label: "Input 输入框"
              },
              {
                value: "input-number",
                label: "InputNumber 计数器"
              },
              {
                value: "select",
                label: "Select 选择器"
              },
              {
                value: "cascader",
                label: "Cascader 级联选择器"
              },
              {
                value: "switch",
                label: "Switch 开关"
              },
              {
                value: "slider",
                label: "Slider 滑块"
              },
              {
                value: "time-picker",
                label: "TimePicker 时间选择器"
              },
              {
                value: "date-picker",
                label: "DatePicker 日期选择器"
              },
              {
                value: "datetime-picker",
                label: "DateTimePicker 日期时间选择器"
              },
              {
                value: "upload",
                label: "Upload 上传"
              },
              {
                value: "rate",
                label: "Rate 评分"
              },
              {
                value: "form",
                label: "Form 表单"
              }
            ]
          },
          {
            value: "data",
            label: "Data",
            children: [{
                value: "table",
                label: "Table 表格"
              },
              {
                value: "tag",
                label: "Tag 标签"
              },
              {
                value: "progress",
                label: "Progress 进度条"
              },
              {
                value: "tree",
                label: "Tree 树形控件"
              },
              {
                value: "pagination",
                label: "Pagination 分页"
              },
              {
                value: "badge",
                label: "Badge 标记"
              }
            ]
          },
          {
            value: "notice",
            label: "Notice",
            children: [{
                value: "alert",
                label: "Alert 警告"
              },
              {
                value: "loading",
                label: "Loading 加载"
              },
              {
                value: "message",
                label: "Message 消息提示"
              },
              {
                value: "message-box",
                label: "MessageBox 弹框"
              },
              {
                value: "notification",
                label: "Notification 通知"
              }
            ]
          },
          {
            value: "navigation",
            label: "Navigation",
            children: [{
                value: "menu",
                label: "NavMenu 导航菜单"
              },
              {
                value: "tabs",
                label: "Tabs 标签页"
              },
              {
                value: "breadcrumb",
                label: "Breadcrumb 面包屑"
              },
              {
                value: "dropdown",
                label: "Dropdown 下拉菜单"
              },
              {
                value: "steps",
                label: "Steps 步骤条"
              }
            ]
          },
          {
            value: "others",
            label: "Others",
            children: [{
                value: "dialog",
                label: "Dialog 对话框"
              },
              {
                value: "tooltip",
                label: "Tooltip 文字提示"
              },
              {
                value: "popover",
                label: "Popover 弹出框"
              },
              {
                value: "card",
                label: "Card 卡片"
              },
              {
                value: "carousel",
                label: "Carousel 走马灯"
              },
              {
                value: "collapse",
                label: "Collapse 折叠面板"
              }
            ]
          }
        ]
      },
      {
        value: "ziyuan",
        label: "资源",
        children: [{
            value: "axure",
            label: "Axure Components"
          },
          {
            value: "sketch",
            label: "Sketch Templates"
          },
          {
            value: "jiaohu",
            label: "组件交互文档"
          }
        ]
      }
    ]
  }
});
/*二手市场列表数据*/
Mock.mock('/api/MarketList',(req,res)=>{
    return {
        data:[
            {
                "imgSrc":"./static/img/floorImg03.jpg",
                "title":"电脑台式转让",
                "price":"800",
                "desc":"9成新",
                "releaseDate":"2018-08-15",
                "watch":"4396"
            },
            {
                "imgSrc":"./static/img/icon.png",
                "title":"求签算命",
                "price":"200",
                "desc":"人间第一半仙",
                "releaseDate":"2018-06-15",
                "watch":"666"
            },
            {
                "imgSrc":"./static/img/t01a5382ad390b78a22.png",
                "title":"野生散仙",
                "price":"500",
                "desc":"刚抓来的",
                "releaseDate":"2018-09-15",
                "watch":"1123"
            },
            {
                "imgSrc":"./static/img/floorImg03.jpg",
                "title":"电脑台式转让",
                "price":"800",
                "desc":"9成新",
                "releaseDate":"2018-08-15",
                "watch":"4396"
            },
            {
                "imgSrc":"./static/img/icon.png",
                "title":"求签算命",
                "price":"200",
                "desc":"人间第一半仙",
                "releaseDate":"2018-06-15",
                "watch":"666"
            },
            {
                "imgSrc":"./static/img/t01a5382ad390b78a22.png",
                "title":"野生散仙",
                "price":"500",
                "desc":"刚抓来的",
                "releaseDate":"2018-09-15",
                "watch":"1123"
            },
            {
                "imgSrc":"./static/img/floorImg03.jpg",
                "title":"电脑台式转让",
                "price":"800",
                "desc":"9成新",
                "releaseDate":"2018-08-15",
                "watch":"4396"
            },
            {
                "imgSrc":"./static/img/icon.png",
                "title":"求签算命",
                "price":"200",
                "desc":"人间第一半仙",
                "releaseDate":"2018-06-15",
                "watch":"666"
            },
            {
                "imgSrc":"./static/img/t01a5382ad390b78a22.png",
                "title":"野生散仙",
                "price":"500",
                "desc":"刚抓来的",
                "releaseDate":"2018-09-15",
                "watch":"1123"
            },
            {
                "imgSrc":"./static/img/floorImg03.jpg",
                "title":"电脑台式转让",
                "price":"800",
                "desc":"9成新",
                "releaseDate":"2018-08-15",
                "watch":"4396"
            },
            {
                "imgSrc":"./static/img/icon.png",
                "title":"求签算命",
                "price":"200",
                "desc":"人间第一半仙",
                "releaseDate":"2018-06-15",
                "watch":"666"
            },
            {
                "imgSrc":"./static/img/t01a5382ad390b78a22.png",
                "title":"野生散仙",
                "price":"500",
                "desc":"刚抓来的",
                "releaseDate":"2018-09-15",
                "watch":"1123"
            },
            {
                "imgSrc":"./static/img/floorImg03.jpg",
                "title":"电脑台式转让",
                "price":"800",
                "desc":"9成新",
                "releaseDate":"2018-08-15",
                "watch":"4396"
            },
            {
                "imgSrc":"./static/img/icon.png",
                "title":"求签算命",
                "price":"200",
                "desc":"人间第一半仙",
                "releaseDate":"2018-06-15",
                "watch":"666"
            },
            {
                "imgSrc":"./static/img/t01a5382ad390b78a22.png",
                "title":"野生散仙",
                "price":"500",
                "desc":"刚抓来的",
                "releaseDate":"2018-09-15",
                "watch":"1123"
            },
            {
                "imgSrc":"./static/img/floorImg03.jpg",
                "title":"电脑台式转让",
                "price":"800",
                "desc":"9成新",
                "releaseDate":"2018-08-15",
                "watch":"4396"
            },
            {
                "imgSrc":"./static/img/icon.png",
                "title":"求签算命",
                "price":"200",
                "desc":"人间第一半仙",
                "releaseDate":"2018-06-15",
                "watch":"666"
            },
            {
                "imgSrc":"./static/img/t01a5382ad390b78a22.png",
                "title":"野生散仙",
                "price":"500",
                "desc":"刚抓来的",
                "releaseDate":"2018-09-15",
                "watch":"1123"
            },
            {
                "imgSrc":"./static/img/floorImg03.jpg",
                "title":"电脑台式转让",
                "price":"800",
                "desc":"9成新",
                "releaseDate":"2018-08-15",
                "watch":"4396"
            },
            {
                "imgSrc":"./static/img/icon.png",
                "title":"求签算命",
                "price":"200",
                "desc":"人间第一半仙",
                "releaseDate":"2018-06-15",
                "watch":"666"
            },
            {
                "imgSrc":"./static/img/t01a5382ad390b78a22.png",
                "title":"野生散仙",
                "price":"500",
                "desc":"刚抓来的",
                "releaseDate":"2018-09-15",
                "watch":"1123"
            },
            {
                "imgSrc":"./static/img/floorImg03.jpg",
                "title":"电脑台式转让",
                "price":"800",
                "desc":"9成新",
                "releaseDate":"2018-08-15",
                "watch":"4396"
            },
            {
                "imgSrc":"./static/img/icon.png",
                "title":"求签算命",
                "price":"200",
                "desc":"人间第一半仙",
                "releaseDate":"2018-06-15",
                "watch":"666"
            },
            {
                "imgSrc":"./static/img/t01a5382ad390b78a22.png",
                "title":"野生散仙",
                "price":"500",
                "desc":"刚抓来的",
                "releaseDate":"2018-09-15",
                "watch":"1123"
            },
            {
                "imgSrc":"./static/img/integral.jpg",
                "title":"拼多多版哆啦a梦",
                "price":"1000",
                "desc":"除了没有超能力，其他都会",
                "releaseDate":"2018-10-26",
                "watch":"12138"
            },
        ]
    }
})
// 求职页列表
Mock.mock("/api/JobList",(req,res)=>{
  return {
    data:[
      {
        "title":"销售主管/综合金融主管",
        "wages":"8000-12000元/月",
        "position":"销售经理/主管",
        "tag":[
          "周末双休",
          "年底双薪",
          "加班补助"
        ],
        "company":"中国平安人寿保险股份有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"无责2k+高额提成奖金",
        "wages":"3000-5000元/月",
        "position":"电话销售",
        "tag":[
          "五险一金",
          "包吃",
          "年底双薪",
          "房补"
        ],
        "company":"中国御海文化传播有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"销售主管/综合金融主管",
        "wages":"8000-12000元/月",
        "position":"销售经理/主管",
        "tag":[
          "周末双休",
          "年底双薪",
          "加班补助"
        ],
        "company":"中国平安人寿保险股份有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"无责2k+高额提成奖金",
        "wages":"3000-5000元/月",
        "position":"电话销售",
        "tag":[
          "五险一金",
          "包吃",
          "年底双薪",
          "房补"
        ],
        "company":"中国御海文化传播有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"销售主管/综合金融主管",
        "wages":"8000-12000元/月",
        "position":"销售经理/主管",
        "tag":[
          "周末双休",
          "年底双薪",
          "加班补助"
        ],
        "company":"中国平安人寿保险股份有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"无责2k+高额提成奖金",
        "wages":"3000-5000元/月",
        "position":"电话销售",
        "tag":[
          "五险一金",
          "包吃",
          "年底双薪",
          "房补"
        ],
        "company":"中国御海文化传播有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"销售主管/综合金融主管",
        "wages":"8000-12000元/月",
        "position":"销售经理/主管",
        "tag":[
          "周末双休",
          "年底双薪",
          "加班补助"
        ],
        "company":"中国平安人寿保险股份有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"无责2k+高额提成奖金",
        "wages":"3000-5000元/月",
        "position":"电话销售",
        "tag":[
          "五险一金",
          "包吃",
          "年底双薪",
          "房补"
        ],
        "company":"中国御海文化传播有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"销售主管/综合金融主管",
        "wages":"8000-12000元/月",
        "position":"销售经理/主管",
        "tag":[
          "周末双休",
          "年底双薪",
          "加班补助"
        ],
        "company":"中国平安人寿保险股份有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"无责2k+高额提成奖金",
        "wages":"3000-5000元/月",
        "position":"电话销售",
        "tag":[
          "五险一金",
          "包吃",
          "年底双薪",
          "房补"
        ],
        "company":"中国御海文化传播有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"销售主管/综合金融主管",
        "wages":"8000-12000元/月",
        "position":"销售经理/主管",
        "tag":[
          "周末双休",
          "年底双薪",
          "加班补助"
        ],
        "company":"中国平安人寿保险股份有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"无责2k+高额提成奖金",
        "wages":"3000-5000元/月",
        "position":"电话销售",
        "tag":[
          "五险一金",
          "包吃",
          "年底双薪",
          "房补"
        ],
        "company":"中国御海文化传播有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"销售主管/综合金融主管",
        "wages":"8000-12000元/月",
        "position":"销售经理/主管",
        "tag":[
          "周末双休",
          "年底双薪",
          "加班补助"
        ],
        "company":"中国平安人寿保险股份有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"无责2k+高额提成奖金",
        "wages":"3000-5000元/月",
        "position":"电话销售",
        "tag":[
          "五险一金",
          "包吃",
          "年底双薪",
          "房补"
        ],
        "company":"中国御海文化传播有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"销售主管/综合金融主管",
        "wages":"8000-12000元/月",
        "position":"销售经理/主管",
        "tag":[
          "周末双休",
          "年底双薪",
          "加班补助"
        ],
        "company":"中国平安人寿保险股份有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
      {
        "title":"无责2k+高额提成奖金",
        "wages":"3000-5000元/月",
        "position":"电话销售",
        "tag":[
          "五险一金",
          "包吃",
          "年底双薪",
          "房补"
        ],
        "company":"中国御海文化传播有限公司",
        "address":"长沙-雨花区",
        "good":"优选"
      },
    ]
  }
})
// 租房列表
Mock.mock("/api/Rentlist",(req,res)=>{
  return {
    data:[
      {
        "imgSrc":"./static/img/floorImg03.jpg",
        "title":"合租 万象公馆 个人房源 非诚勿扰",
        "desc":"3室主卧20m2·高速时代广场",
        "rent":"600",
        "address":"成都路",
      },
      {
        "imgSrc":"./static/img/video.png",
        "title":"整租 国能首府九号 2室1厅一卫",
        "desc":"2室90m2·庐阳周边",
        "rent":"1200",
        "address":"蒙城北路",
      },
      {
        "imgSrc":"./static/img/integral.jpg",
        "title":"合租 多伦多花园 4室1厅1卫",
        "desc":"4室主卧·28m2·大学城",
        "rent":"750",
        "address":"锦绣大道",
      },
      {
        "imgSrc":"./static/img/floorImg03.jpg",
        "title":"合租 万象公馆 个人房源 非诚勿扰",
        "desc":"3室主卧20m2·高速时代广场",
        "rent":"600",
        "address":"成都路",
      },
      {
        "imgSrc":"./static/img/video.png",
        "title":"整租 国能首府九号 2室1厅一卫",
        "desc":"2室90m2·庐阳周边",
        "rent":"1200",
        "address":"蒙城北路",
      },
      {
        "imgSrc":"./static/img/integral.jpg",
        "title":"合租 多伦多花园 4室1厅1卫",
        "desc":"4室主卧·28m2·大学城",
        "rent":"750",
        "address":"锦绣大道",
      },
      {
        "imgSrc":"./static/img/floorImg03.jpg",
        "title":"合租 万象公馆 个人房源 非诚勿扰",
        "desc":"3室主卧20m2·高速时代广场",
        "rent":"600",
        "address":"成都路",
      },
      {
        "imgSrc":"./static/img/video.png",
        "title":"整租 国能首府九号 2室1厅一卫",
        "desc":"2室90m2·庐阳周边",
        "rent":"1200",
        "address":"蒙城北路",
      },
      {
        "imgSrc":"./static/img/integral.jpg",
        "title":"合租 多伦多花园 4室1厅1卫",
        "desc":"4室主卧·28m2·大学城",
        "rent":"750",
        "address":"锦绣大道",
      },
      {
        "imgSrc":"./static/img/floorImg03.jpg",
        "title":"合租 万象公馆 个人房源 非诚勿扰",
        "desc":"3室主卧20m2·高速时代广场",
        "rent":"600",
        "address":"成都路",
      },
      {
        "imgSrc":"./static/img/video.png",
        "title":"整租 国能首府九号 2室1厅一卫",
        "desc":"2室90m2·庐阳周边",
        "rent":"1200",
        "address":"蒙城北路",
      },
      {
        "imgSrc":"./static/img/integral.jpg",
        "title":"合租 最后花园 4室1厅1卫",
        "desc":"4室主卧·28m2·大学城",
        "rent":"750",
        "address":"锦绣大道",
      },
    ]
  }
})
// 收藏列表
Mock.mock("/api/colData",(req,res)=>{
  return {
    data:[
      {
        "imgSrc":"./static/img/floorImg03.jpg",
        "title":"成天嘉禾影业",
        "value":4,
        "desc":"起送60￥配送9￥ 美团专送",
        "distance":"1.3km",
        "waimai":true,
      },
      {
        "imgSrc":"./static/img/integral.jpg",
        "title":"北京欢乐谷",
        "value":4,
        "desc":"北京欢乐谷 大型游乐场",
        "distance":"1.5km",
      },
      {
        "imgSrc":"./static/img/icon.png",
        "title":"日日生鲜(新源里店)",
        "value":4,
        "desc":"起送20￥配送5￥ 美团专送",
        "distance":"2.0km",
        "waimai":true,
      },
      {
        "imgSrc":"./static/img/floorImg03.jpg",
        "title":"成天嘉禾影业",
        "value":3,
        "desc":"起送60￥配送9￥ 美团专送",
        "distance":"1.3km",
        "waimai":true,
      },
      {
        "imgSrc":"./static/img/integral.jpg",
        "title":"北京欢乐谷",
        "value":4,
        "desc":"北京欢乐谷 大型游乐场",
        "distance":"1.5km",
      },
      {
        "imgSrc":"./static/img/icon.png",
        "title":"日日生鲜(新源里店)",
        "value":3,
        "desc":"起送20￥配送5￥ 美团专送",
        "distance":"2.0km",
        "waimai":true,
      },
      {
        "imgSrc":"./static/img/floorImg03.jpg",
        "title":"成天嘉禾影业",
        "value":3,
        "desc":"起送60￥配送9￥ 美团专送",
        "distance":"1.3km",
        "waimai":true,
      },
      {
        "imgSrc":"./static/img/integral.jpg",
        "title":"北京欢乐谷",
        "value":4,
        "desc":"北京欢乐谷 大型游乐场",
        "distance":"1.5km",
      },
      {
        "imgSrc":"./static/img/icon.png",
        "title":"日日生鲜(新源里店)",
        "value":4,
        "desc":"起送20￥配送5￥ 美团专送",
        "distance":"2.0km",
        "waimai":true,
      },
      {
        "imgSrc":"./static/img/floorImg03.jpg",
        "title":"成天嘉禾影业",
        "value":3,
        "desc":"起送60￥配送9￥ 美团专送",
        "distance":"1.3km",
        "waimai":true,
      },
      {
        "imgSrc":"./static/img/integral.jpg",
        "title":"北京欢乐谷",
        "value":4,
        "desc":"北京欢乐谷 大型游乐场",
        "distance":"1.5km",
      },
      {
        "imgSrc":"./static/img/icon.png",
        "title":"日日生鲜(新源里店)",
        "value":3,
        "desc":"起送20￥配送5￥ 美团专送",
        "distance":"2.0km",
        "waimai":true,
      },
      {
        "imgSrc":"./static/img/floorImg03.jpg",
        "title":"成天嘉禾影业",
        "value":4,
        "desc":"起送60￥配送9￥ 美团专送",
        "distance":"1.3km",
        "waimai":true,
      },
      {
        "imgSrc":"./static/img/integral.jpg",
        "title":"北京欢乐谷",
        "value":4,
        "desc":"北京欢乐谷 大型游乐场",
        "distance":"1.5km",
      },
      {
        "imgSrc":"./static/img/icon.png",
        "title":"最后生鲜(新源里店)",
        "value":3,
        "desc":"起送20￥配送5￥ 美团专送",
        "distance":"2.0km",
        "waimai":true,
      },
    ]
  }
})
// 二手物品发布列表
Mock.mock('/api/used',(req,res)=>{
  return {
    data:[
      {
        "first":"二手手机",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ],
      },
      {
        "first":"笔记本电脑",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ],
      },
      {
        "first":"平板电脑",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"台式机/配件",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"二手家电",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"二手家具",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"家居/日用品",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"数码产品",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"二手摩托车",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"自行车/电动车",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"二手设备",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"服装/鞋帽/箱包",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"艺术品/收藏品",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"母婴/儿童用品",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"其他二手物品",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },
      {
        "first":"网游/虚拟物品",
        "list":[
          "苹果",
          "华为",
          "三星",
          "小米",
          "诺基亚",
          "HTC",
          "联想",
          "酷派",
          "魅族",
          "索尼",
          "中兴"
        ]
      },  
    ]
  }
})
// 商城首页列表
Mock.mock('/api/MallList',(req,res)=>{
  return {
    data:[
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"999"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"998"
      },
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"99"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"198"
      },
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"559"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"798"
      },
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"996"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"900"
      },
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"669"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"968"
      },
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"999"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"998"
      },
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"996"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"900"
      },
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"669"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"968"
      },
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"999"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"998"
      },
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"996"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"900"
      },
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"669"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"968"
      },
      {
        "imSrc":"/static/img/img821620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外 合亿购专供",
        "price":"999"
      },
      {
        "imSrc":"/static/img/img811620fc9bc70.png",
        "selling":"户外必备外套",
        "title":"jackwolf狼爪 专业户外最后购专供",
        "price":"998"
      },
    ]
  }
})
// 同城头条数据
Mock.mock('/api/headData0',(req,res)=>{
  return {
    data:[
      {
        "title":"卫生间别再傻傻的装淋浴房,老师傅都这样装,现在知道还不晚！",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.25",
      },
      {
        "title":"这样装修完,这7个地方可以省钱7万块",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.26",
      },
      {
        "title":"底价买新车上汽车大全，选车比价，省钱省心！",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.27",
      },
      {
        "title":"卫生间别再傻傻的装淋浴房,老师傅都这样装,现在知道还不晚！",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.25",
      },
      {
        "title":"这样装修完,这7个地方可以省钱7万块",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.26",
      },
      {
        "title":"底价买新车上汽车大全，选车比价，省钱省心！",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.27",
      },
    ],
  }
});
Mock.mock('/api/headData1',(req,res)=>{
  return {
    data:[
      {
        "title":"合肥房价又涨了！",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"18.11.25",
      },
      {
        "title":"老司机深夜飙车",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"18.11.27",
      },
      {
        "title":"十二狗粮频频失窃?",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"18.12.01",
      },
      {
        "title":"合肥房价又涨了！",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"18.11.25",
      },
      {
        "title":"老司机深夜飙车",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"18.11.27",
      },
      {
        "title":"十二狗粮频频失窃?",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"18.12.01",
      },
    ],
  }
});
Mock.mock('/api/headData2',(req,res)=>{
  return {
    data:[
      {
        "title":"gif测试标题测试测试哦",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.25",
      },
      {
        "title":"gif测试标题测试测试哦",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.26",
      },
      {
        "title":"gif测试标题测试测试哦最新",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.27",
      },
      {
        "title":"gif测试标题测试测试哦",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.25",
      },
      {
        "title":"gif测试标题测试测试哦",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.26",
      },
      {
        "title":"gif测试标题测试测试哦最新",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.27",
      },
    ],
  }
});
Mock.mock('/api/headData3',(req,res)=>{
  return {
    data:[
      {
        "title":"我是头条测试",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.25",
      },
      {
        "title":"我也是头条测试测试测试",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.26",
      },
      {
        "title":"stan.lee去世，去了平行宇宙",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"18.11.13",
      },
      {
        "title":"我是头条测试",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.25",
      },
      {
        "title":"我也是头条测试测试测试",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"17.06.26",
      },
      {
        "title":"stan.lee去世，去了平行宇宙",
        "imgs":[
          "/static/img/img811620fc9bc70.png",
          "/static/img/img13715ae5879f38.png",
          "/static/img/miyagi.png",
        ],
        "date":"18.11.13",
      },
    ],
  }
});