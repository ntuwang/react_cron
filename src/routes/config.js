export default {
    menus: [
        // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'dashboard', component: 'Dashboard' },
        {
            key: '/app/user',
            title: '用户管理',
            icon: 'user',
            subs: [
                { key: '/app/user/list', title: '用户列表', component: 'UserList' },
            ],
        },
        {
            key: '/app/task',
            title: '任务管理',
            icon: 'code',
            subs: [
                { key: '/app/task/list', title: '任务列表', component: 'TaskList' },
                { key: '/app/task/log/list', title: '日志列表', component: 'TaskLog' },
            ],
        },
        {
            key: '/app/taskGroup',
            title: '任务分组',
            icon: 'double-right',
            subs: [
                { key: '/app/taskGroup/list', title: '分组列表', component: 'TaskGroupList' },
            ],
        },
        // {
        //     key: '/app/cate',
        //     title: '分类管理',
        //     icon: 'rocket',
        //     subs: [
        //         { key: '/app/cate/list', title: '分类列表', component: 'CateList' },
        //         { key: '/app/cate/add', title: '添加分类', component: 'CateAdd' },
        //     ],
        // }
    ],
    others: [], // 非菜单相关路由
};
