/*
 *@accountReg  账号正则
 */
export const accountReg = `^[a-zA-Z0-9_-]{4,16}$`

/*
 *@passwordReg 密码正则
 */
export const passwordReg = `^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{6,20}$`;

// 菜单
export const menuData = [
    {
        name: "首页",
        key: "home",
        path: `/home`,
    },
    {
        name: "系统管理",
        key: "system",
        child: [
            {
                name: "用户管理",
                key: 'user',
                path: '/user',
            },
            {
                name: "角色管理",
                key: 'role',
                path: '/role',
            },
            {
                name: "菜单管理",
                key: 'menu',
                path: '/menu',
            },
        ],
    },
]

// 用户管理搜索参数
export const userSearchParams = [
    {
        key: 'workNo',
        label: '工号',
        type: 'input',
        isRequired: false
    },
    {
        key: 'realname',
        label: '姓名',
        type: 'input',
        isRequired: false
    },
    {
        key: 'sex',
        label: '姓别',
        type: 'select',
        isRequired: false,
        options: [
            {
                value: 1,
                label: '男',
            },
            {
                value: 2,
                label: '女',
            }
        ]
    },
    {
        key: 'phone',
        label: '手机号码',
        type: 'input',
        isRequired: false
    },
    {
        key: 'status',
        label: '用户状态',
        type: 'select',
        isRequired: false,
        options: [
            {
                value: 1,
                label: '正常',
            },
            {
                value: 2,
                label: '冻结',
            }
        ]
    },
]

// 角色管理搜索参数
export const roleSearchParams = [
    {
        type: 'input',
        key: 'roleName',
        label: '角色名称',
        isRequired: false
    },
]

// 菜单管理搜索参数
export const menuSearchParams = [
    {
        type: 'input',
        key: 'name',
        label: '菜单名称',
        isRequired: false
    },
]