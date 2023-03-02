const path = require("path");
const rootpath = path.dirname(__dirname);
const utils = require("./utils/index");
const filehelper = require("./utils/initPage.js");

const themeConfig = {
  nav: [
    {
      text: "Resume",
      link: "/Resume/myResume/",
    },
    {
      text: "Blogs",
      link: "/Blog/",
    },
    {
      text: "Others",
      ariaLabel: "Menu",
      items: [{ text: "与我联系", link: "/other/contact/" }],
    },
    {
      text: "Github",
      link: "https://github.com/Xiaojing-511?tab=repositories",
      target: "_blank",
    },
  ],
  markdown: {},
  sidebar: [
    {
      title: "Resume",
      path: "/Resume/myResume/",
      sidebarDepth: 1,
      children: [["/Resume/myResume/", "个人简历"]],
    },
    {
      title: "Projects",
      path: "/Projects/hokdo/",
      sidebarDepth: 1,
      children: [
        ["/Projects/hokdo/", "hokdo-销售协作平台"],
        ["/Projects/hokdosdk/", "hokdo-sdk"],
        ["/Projects/campus/", "大学生校园交流网站"],
        ["/Projects/kanban/", "看板外化"],
        ["/Projects/floatball/", "悬浮球"],
        ["/Projects/promotion/", "优惠平台"],
        ["/Projects/mobileMedia/", "移动多媒体app"],
        ["/Projects/qiuzhidi/", "求职帝小程序"],
        ["/Projects/todo/", "每日便签"],
      ],
    },
    {
      title: "Blogs", // 必要的
      path: "/Blog/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      // collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: [
        {
          title: "Web",
          path: "/Blog/Web/blog1/",
          // collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,
          children: [
            ["/Blog/Web/blog1/", "我是如何走上前端路的"],
            [
              "/Blog/Web/blog2/",
              "解决第一个子元素设置margin-top父元素会跟着移动",
            ],
            ["/Blog/Web/blog3/", "JavaScript中的var与作用域"],
          ],
          // initialOpenGroupIndex: 0
        },
        {
          title: "Ant Design Vue",
          path: "/Blog/Ant/blog1/",
          // collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,
          children: [["/Blog/Ant/blog1/", "树选择组件选择框一行显示不换行"]],
          // initialOpenGroupIndex: 0
        },
        {
          title: "Deep learning",
          path: "/Blog/Deep-learning/blog1/",
          // collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,
          children: [
            ["/Blog/Deep-learning/blog1/", "使用LSTM进行情感分析"],
            [
              "/Blog/Deep-learning/blog2/",
              "手写体数字识别(Hand-written digits recognition)",
            ],
            [
              "/Blog/Deep-learning/blog3/",
              "Tensorflow 2.0 利用十三层卷积神经网络实现cifar 100训练",
            ],
          ],
          // initialOpenGroupIndex: 1
        },
        {
          title: "Others",
          path: "/Blog/Others/blog1/",
          // collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,
          children: [
            ["/Blog/Others/blog1/", "如何每次随机出不同的数-Math.random()"],
            ["/Blog/Others/blog2/", "Git初学者的实践总结(摘自廖老师)"],
            ["/Blog/Others/blog3/", "git提交代码(解决冲突)"],
          ],
          // initialOpenGroupIndex: 2
        },
      ],
      initialOpenGroupIndex: 1,
    },
    {
      title: "Notes",
      path: "/Notes/note1/",
      sidebarDepth: 1,
      children: [
        ["/Notes/note1/", "随手记"],
        ["/Notes/note2/", "Nodejs"],
        ["/Notes/note3/", "todo"],
        ["/Notes/note4/", "面经"],
      ],
    },
  ],
  searchMaxSuggestions: 10,
};

module.exports = themeConfig;
