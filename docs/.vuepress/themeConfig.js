const path = require('path');
const rootpath = path.dirname(__dirname);
const utils = require('./utils/index');
const filehelper = require('./utils/initPage.js');

const themeConfig = {
    nav: [
        {
            text: 'Resume',
            link: '/Resume/',
        },
        {
            text: 'Blog',
            link: '/Blog/',
        },
        {
            text: 'Others',
            ariaLabel: 'Menu',
            items: [
                { text: 'VuePress', link: '/other/vuepress/' },
                { text: '开发工具', link: '/other/ide/' }
            ]
        },
    ],
    markdown: {

    },
    sidebar: [
        ['/Resume/','Resume'],
        {
            title: 'Blog',   // 必要的
            path: '/Blog/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
                {
                    title:'Web',
                    path: '/Blog/Web/blog1/',
                    // collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1, 
                    children: [
                        ['/Blog/Web/blog1/','blog1'],
                        ['/Blog/Web/blog2/','blog2']
                    ],
                },
                {
                    title:'Deep learning',
                    path: '/Blog/Deep-learning/blog1/',
                    // collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1, 
                    children: [
                        ['/Blog/Deep-learning/blog1/','blog1'],
                        ['/Blog/Deep-learning/blog2/','blog2']
                    ]
                },
                {
                    title:'Others',
                    path: '/Blog/Others/blog1/',
                    // collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1, 
                    children: [
                        ['/Blog/Others/blog1/','blog1'],
                        ['/Blog/Others/blog2/','blog2']
                    ]
                }
                
            ],
            initialOpenGroupIndex: 1
        },
    ],
};

// JavaScript
// function concatJs() {
//   const arr = utils.genSidebar( 'JStst', filehelper.getFileName(rootpath + '/JavaScript/'), false);
//   arr.push(...utils.genSidebar('Js-Vue',filehelper.getFileName(rootpath + '/JavaScript/vue/', 'vue/'),false));
//   return arr;
// }

module.exports = themeConfig;