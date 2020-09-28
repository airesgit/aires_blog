module.exports = {
  "title": "aires_diary",
  "description": "aires_diary",
  "base": "/blogweb/",
  "dest": "dist",
  "repo": 'https://github.com/airesgit/blogweb.git',
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "locales": {
     '/': {
           lang: 'zh-CN'
     }
  },
  "theme": "reco",
  "themeConfig": {
    "subSidebar": 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/recoluan",
            "icon": "reco-github"
          }
        ]
      }
    ],
/*    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },*/
    "sidebar": [
        '/'
    ],
    "sidebarDepth": 2, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
    "displayAllHeaders": false, // 默认值：false 侧边栏只会显示由当前活动页面的标题组成的链接
    "activeHeaderLinks": true, // 默认值：true 滚动时通过 hash 高亮侧边栏标题
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "aires",
    "authorAvatar": "/avatar.png",
    "record": "xxxx",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  }
}