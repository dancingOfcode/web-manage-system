import scnen_bg from '@/assets/images/scene_bg.png'

// 天空盒时间类型
export const skyboxType = {
  day: 'day',
  dusk: 'dusk',
  night: 'night',
}

// 日期
export const weekDay = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
]

// 添加场景背景
export const sceneBg = [
  {
    textureKey: 'scene-background',
    imgUrl: scnen_bg,
    geomery: [100, 15],
    uvOffset: -0.05,
    repeat: { x: 5, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: (Math.PI * 3) / 4 },
    position: { x: -282, y: 1, z: 178 },
  },
]

/*
 *@accountReg  账号正则
 */
export const accountReg = `^[a-zA-Z0-9_-]{4,16}$`

/*
 *@passwordReg 密码正则
 */
export const passwordReg = `^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{6,20}$`;