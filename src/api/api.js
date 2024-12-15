import request from "@/utils/request";

/*
 * 用户权限
 * @signIn 登入
 * @signOut 登出
 * @getUserInfo 获取当前用户信息
 * @updatePassword 更新用户密码
 */
export const signIn = (params) => request.post('/sys/login', params);

export const signOut = () => request.get('/sys/logout');

export const getUserInfo = (params) => request.get('/sys/user/getUserInfo', params);

export const updatePassword = (params) => request.put('/sys/user/updatePassword', params);

// 设备状态
export const getDeviceStatus = (params) => request.get('/api/iot/device/status', params)