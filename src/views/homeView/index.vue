<script setup>
import * as THREE from 'three'
import Viewer from '@/three/viewer'
import SkyBox from '@/three/skyBox'
import { onMounted, ref } from 'vue'
import Tabs from '@/components/tabs.vue'
import Header from '@/components/header.vue'
import ModelLoader from '@/three/modelLoader'
import Controls from '@/components/controls.vue'
import DeviceSelect from '@/components/deviceSelect.vue'
import ListenerMouseClick from '@/three/listenerMouseClick'
import EquipManage from '@/components/equipManage/index.vue'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js' // 引入dat.gui.js的一个类GUI
import { renderLabel, getModelHeight, removeLabel } from '@/utils/tools.js'
import scnen_bg from '@/assets/images/scene_bg.png'

const thisViewer = ref(null)
const tabId = ref(null)

onMounted(() => {
  initViewer()
})

// 初始化视图场景
const initViewer = () => {
  let viewer = new Viewer('three-container')

  // 鼠标点击获取位置信息
  new ListenerMouseClick(viewer)

  thisViewer.value = viewer
  // 添加天空盒背景
  // new SkyBox(viewer).setSkybox('day')

  // 添加坐标辅助
  viewer.addAxesHelper()

  // 添加环境光
  viewer.lights.addAmbientLight({ intensity: 3 })

  // 渲染地面背景贴图
  addBackground(viewer)

  // 加载模型
  addModel(viewer)

  // 鼠标移动事件监听
  viewer.startMouseEvent('click', (mesh, point) => {
    if (mesh.name === 'Mikron_VCE_800_Pro_sldprt') {
      // 判断是否已经添加后处理效果
      var element = document.getElementById('Mikron_VCE_800_Pro_sldprt_label')
      // 如果元素存在，则不重复添加
      if (element) return
      // 添加后处理效果
      viewer.addComposer(mesh)
      // 声明一个三维向量用来表示某个坐标
      const worldPosition = new THREE.Vector3()
      mesh.getWorldPosition(worldPosition)
      let labeldata = [
        {
          fontSize: '7px',
          name: 'Mikron_VCE_800_Pro_sldprt_label',
          position: { ...worldPosition, y: getModelHeight(mesh) * 2 },
          html: `
                <div id="Mikron_VCE_800_Pro_sldprt_label" style="border:1px solid #e6762b; padding:2px 3px;background:url:require(${scnen_bg})">
                  <div>设备名称：DW19</div>
                  <div>设备状态：空闲</div>
                  <div>设备产线：机加工车间</div>
                  <div>设备资产：A-123</div>
                </div>
                `,
        },
      ]
      // 添加CSS3DLabel
      renderLabel('3DSprite', viewer, labeldata)
    } else {
      viewer.removeComposer()
      // 判断是否已经添加后处理效果
      var element = document.getElementById('Mikron_VCE_800_Pro_sldprt_label')
      // 如果元素存在，则不重复添加
      if (element) {
        removeLabel(viewer, ['Mikron_VCE_800_Pro_sldprt_label'])
      }
    }
  })
}

// 渲染地面背景贴图
const addBackground = viewer => {
  // 矩形平面网格模型设置背景透明的png贴图
  const geometry = new THREE.PlaneGeometry(
    3 * window.innerWidth,
    3 * window.innerWidth
  ) //默认在XOY平面上
  const texture = viewer.addTextureLoader(
    'scene-background',
    scnen_bg,
    true,
    true
  )
  texture.repeat.set(10, 10) //注意选择合适的阵列数量
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    opacity: 0.3,
    transparent: true, //使用背景透明的png贴图，注意开启透明计算
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotateX(-Math.PI / 2)
  viewer.scene.add(mesh)
}

// 加载模型
const addModel = async viewer => {
  let windowScene = null
  let loader = new ModelLoader(viewer)
  // 添加窗户
  // await loader.loadModelToScene('/model/glb/window.glb', gltf => {
  //   windowScene = gltf.scene
  // })

  // 添加厂房
  loader.loadModelToScene(
    '/model/glb/CangFangNew.glb',
    gltf => {
      console.log(gltf)
      // if (windowScene) gltf.scene.add(windowScene)
      gltf.setScale(75)
      gltf.scene.rotation.set(0.35, 0.98, -0.32)
    },
    process => {
      console.log('加载进度', Math.floor(process * 100) + '%')
    }
  )

  // 添加设备
  // loader.loadModelToScene(
  //   '/model/glb/doushan.glb',
  //   gltf => {
  //     gltf.setScale(2)
  //     gltf.scene.position.set(35, 0, -50)
  //   },
  //   process => {
  //     console.log('加载进度', Math.floor(process * 100) + '%')
  //   }
  // )
}

// 同步当前tabs-id
const handOnCurrentId = id => {
  tabId.value = id
}

// 同步控制器 controls-id
const handleOnControlId = id => {
  if (id === 1) {
    let camera_position = thisViewer.value.addTweenAnimate(
      'camera_position',
      thisViewer.value.camera.position,
      { x: 200, y: 200, z: 200 },
      2000
    )
    camera_position.start()
  }
}

// 同步设备 device-id
const handleOnDeviceId = selectDevice => {
  let {
    value,
    position: { x, y, z },
  } = selectDevice
  thisViewer.value
    .addTweenAnimate(
      'camera_position',
      thisViewer.value.camera.position,
      { x, y, z },
      2000
    )
    .start()
}
</script>

<template>
  <div class="screen-container">
    <div id="three-container"></div>
    <Tabs @onCurrentId="handOnCurrentId" />
    <Header title="26号厂房指挥中心" />
    <Controls @onControlId="handleOnControlId" />
    <EquipManage v-if="tabId === 3" />
    <DeviceSelect @onDeviceId="handleOnDeviceId" />
  </div>
</template>

<style lang="scss" scoped>
.screen-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}
</style>
