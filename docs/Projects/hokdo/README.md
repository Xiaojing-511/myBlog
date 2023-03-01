## 项目-销售协作平台

> 2022-7-01 11:34:09
> <br>分类专栏：react sass

```
下一代的销售协作工具
更快的协作销售、更多的客户上下文，实现前所未有的收入增长和客户洞察
```

### 页面展示

![在这里插入图片描述](https://img-blog.csdnimg.cn/bfbe325d448d462eab636f40a705c37e.png#pic_center)

## 模块拆分 - 导航模块

**模块功能描述**

- 导航模块主要分为首页（数据总览）及其他模块导航部分，对应组件 `<NavSider />`
- 可通过根路径或点击左上角企业 logo 进入首页
- 除首页外其他均展示为二级导航栏，且可通过点击 icon 展开收起竖形二级导航
- 二级导航展开收起状态存储在本地，命名为 “NAV_FOLD”
- 二级导航内选中的模块存储在本地，命名为 “NAV_SELECTED_HISTORY”

**功能点解析**

- 增加一级/二级导航
- 在 router.jsx -> outterRoutes 新增导航信息对象，二级导航则配置 subRoutes
- 注意在导航组件 <NavSider /> 及 <SubSiderApp/> 中都要对 genSelectedKey 进行补充（配置路径对应关系）
- 注意权限导致的导航隐藏情况
- 若二级导航均无权限则对应的一级导航也隐藏
- 权限可分为：是否为管理员以及自定义角色下配置的权限（user.permission_list）

## 模块拆分 - 对话模块

**模块功能描述**

- 对话模块部分页面主要功能是与 c2 进行沟通和对 c2 的信息进行存储和展示（右侧联系人详情）
- 群聊对话借助第三方环信能力进行消息实时接收

**功能点解析**

- 该模块导航图标增加未读消息红点提醒
  - 初始进入页面时获取未读数：使用环信获取，并手动筛出我负责的进行未读展示`（chat.js - getUnReadCount()）`
  - 对话期间红点提醒的条件：我负责的对话有新消息（除对话关闭提醒类消息）具体`（chat.js - updateLastMsgByOther()）`
  - 清空环信记录的某群聊对话未读数： 发送一条 chatType: 'groupChat' 的消息（`chat.js - readGroupMsg()）`
- 我负责的对话及负责人配置
  - 未读红点及浏览器通知仅提醒我负责的对话（即负责人是自己）
  - 可在设置 -对话中设置对话负责人待选项
- 新对话/重新活跃对话加群、消息实时接收
  - 新对话/重新活跃使用监听 onCustomMessage 函数的方式`（shared.js - fetchProfile() - EaseMobManager.conn.listen）`，之后调用环信加群 api
  - 新消息实时接收利用环信能力：监听 onTextMessage 函数`（shared.js - fetchProfile() - EaseMobManager.conn.listen）`
  - 我负责的对话收到新消息同时会进行两种方式的通知
    - 站内 semi 组件`<Notification/>`通知 （需不在新消息对话的对话页面）
    - 浏览器通知
    - `notifycation.js - noticeChatNewMessage()`
- 消息撤回
  - 仅可撤回自己发送的消息（技术上属于假撤回，数据库未删除该条消息记录，仅使用字段标识是否被删除）
- 消息列表
  - 列表拉取接口：`api/chat/list-message-history`
- 消息类型（按角色分）：机器人消息/ c1 发送的内容/ c2 发送的内容
  - 区分：通过列表接口数据下的消息信息 msg.cid 前缀区分消息类型
    [图片]
  - 机器人消息：包括系统时间消息、对话关闭系统消息及机器人消息（类型可由 msg.type 区分）

## 模块拆分 - 工单模块

![在这里插入图片描述](https://img-blog.csdnimg.cn/cbd80f9c417447359307bd5c72a33891.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/044fbcff1bc34d5ab5f6354ed5991944.png)
**模块功能描述**

- 工单模块主要是对由 c1 或 c2 提出的工单进行展示和管理
- 页面左侧部分为按试图分类的列表目录，公共视图全员可见、仅管理员可编辑，个人视图仅个人可查看和编辑
- 页面右侧部分为对应视图下筛选出来的列表，筛选条件通过编辑视图修改

**功能点解析**

- 新增视图：三点设置 - 添加视图，编辑视图名称及筛选条件（或且逻辑）
- 视图列表调整顺序：顺序可通过三点设置 - 编辑顺序拖拽调整
- 工单视图信息的存储：工单视图信息及其对应的筛选条件由接口`/api/console-config/create-config`存储，公共视图需增加字段`is_global: true`
- 公共/个人分为两个字段存储：变量名分别为`TICKET_LIST_VIEW_TYPE_ME TICKET_LIST_VIEW_TYPE_COMMON`
- 存储结构（公共视图为例，个人视图仅视图类型字段值不同）

```

id: "406567002307"
label: "测试 test"
viewType: "common"
filter: [{condition: [{field: "ticket_status", relation: "include", value: "0", type: "SINGLE_SELECT"},…]},…]
0: {condition: [{field: "ticket_status", relation: "include", value: "0", type: "SINGLE_SELECT"},…]}
condition: [{field: "ticket_status", relation: "include", value: "0", type: "SINGLE_SELECT"},…]
0: {field: "ticket_status", relation: "include", value: "0", type: "SINGLE_SELECT"}
field: "ticket_status"
relation: "include"
type: "SINGLE_SELECT"
value: "0"
1: {field: "ticket_priority", relation: "include", value: 1, type: "SINGLE_SELECT"}
1: {condition: [{field: "ticket_status", relation: "include", value: "5", type: "SINGLE_SELECT"}]}

```

**字段解析**

- id: 唯一标识
- label: 视图名称
- viewType: 视图类型（公共 common /个人 me）
- filter: 筛选条件（或且逻辑，filter 数组项间为 或者关系，数据项内的 condition 数组项间为并且关系）
- 工单视图信息的获取：由接口`/api/console-config/info`获取，同样公共视图需增加字段`is_global: true`
- 视图总数的获取：通过传入对应视图的筛选条件调用列表接口获得 `/api/ticket/list`
- 函数位置：`ticket.js -> getViewTotal()`
- 视图总数的获取会根据视图数的递增而逐渐耗费时间，且一些操作执行后都需要触发总数的更新，eg: 新建工单、通过点开工单详情修改工单信息（状态等影响筛选改变的字段）、编辑删除工单。后续待优化，理想通过接口直接存储获取视图的信息。
- 右侧工单列表区域需注意
- 快捷筛选：仅支持实时筛选工单，不会将增加的筛选条件合进视图的筛选项中，即不会改变视图总数（视图总数仅由编辑视图页面的筛选条件为准）
- 表头快捷排序：处理时间暂不支持排序，处理时间由前端通过字段`record.ticket_create_time,record.ticket_end_time`自行计算（具体计算规则见`utils -> time.jsx -> generateDurationTimeContentText()` ），后端暂时无法排序
- 工单详情抽屉：通过点击工单标题弹出

## 模块拆分 - 对话机器人模块

![在这里插入图片描述](https://img-blog.csdnimg.cn/966808173b494713915712a2fc65a0f7.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/8a5da506acf541a4848786b4377e2404.png)
**模块功能描述**

- 快速配置与客户的对话旅程，提升沟通效率

**功能点解析**

- 可通过设置优先级来调整机器人触发顺序
- 创建/编辑机器人（playbook）

- 通过节点形式存储信息，一个卡片抽象为一个节点
- 节点分类：机器人配置节点（`type: "robotConfig"`）、消息节点（`type: "messageNode"`）、问题节点（`type: "questionNode"`，可将回答存储到自定义字段）以及结束流程节点（`type: "endNode"`）
- 数据存储分为两部分：机器人配置信息及四种类型节点信息 - 机器人配置信息：数据获取接口 `/api/chat/chatbot/detail` 位置：`data.detail.conditions`
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/30756061124145d5a6532f5df4c37c9b.png#pic_center)

  - 节点信息：数据获取接口 `/api/chat/chatbot/node-list`
  - 节点数据结构（通过字段 next_node_id 来连接下一节点）
    - 机器人配置节点：
    ```
    {
        next_node_id: "27c03601-9e4d-48fd-b689-b3eeaf7325e2"
        node_id: "320fe32a-0761-4a85-a3a1-0299fd083cf8"
        position: {x: 0, y: 325}
        type: "robotConfig"
    }
    ```
    - 消息节点
      - default_option 字段表示兜底节点，options 表示选项 (兜底节点为文字输入框右侧支出来的节点)
      - 上述两个字段下的 id 均为拼接 id，拼接规则：当前节点 id + '\_' + 表示兜底/选项的节点 id ![在这里插入图片描述](https://img-blog.csdnimg.cn/57ea50a00c924bd19c87cf85bc9729e8.png#pic_center)
    - 问题节点
      - default_option 字段表示兜底节点
        ![在这里插入图片描述](https://img-blog.csdnimg.cn/2b1ca8d5c9c24264887e224bf9ecc446.png#pic_center)
    - 结束节点

- 数据格式化
  - 后端返回数据 -> 前端展示需要的数据格式
    - 函数位置：`pages/Playbook/CreateRobot->analyseCurRobot()`
  - 前端数据 -> 后端存储需要的格式
    - 函数位置：`pages/Playbook/CreateRobot->formatDataToSubmit()`
- 需注意：通过模版创建机器人后，提交前需统一更换 id
  - 函数位置：`pages/Playbook/CreateRobot->replaceNodeId()`

```

```
