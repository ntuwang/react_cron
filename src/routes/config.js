export default {
    menus: [
        // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/post',
            title: '博客管理',
            icon: 'scan',
            subs: [
                { key: '/app/post/list', title: '文章列表', component: 'PostList' },
            ],
        },
        {
            key: '/app/cate',
            title: '分类管理',
            icon: 'rocket',
            subs: [
                { key: '/app/cate/list', title: '分类列表', component: 'CateList' },
                { key: '/app/cate/add', title: '添加分类', component: 'CateAdd' },
            ],
        }
    ],
    others: [], // 非菜单相关路由
};
