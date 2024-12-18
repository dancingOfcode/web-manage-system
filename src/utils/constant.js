/*
 *@accountReg  账号正则
 */
export const accountReg = `^[a-zA-Z0-9_-]{4,16}$`

/*
 *@passwordReg 密码正则
 */
export const passwordReg = `^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{6,20}$`;

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
                key: 'userManage',
                path: '/user',
            },
            {
                name: "用户管理",
                key: 'roleManage',
                path: '/role',
            },
            {
                name: "用户管理",
                key: 'menuManage',
                path: '/menu',
            },
        ],
    },
]