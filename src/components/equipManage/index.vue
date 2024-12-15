<script setup>
import * as echarts from 'echarts'
import { onMounted, reactive, ref } from 'vue'
import { getDeviceStatus } from '@/api/api'
import UpkeepModal from './upkeepModal.vue'
import MaintainModal from './maintainModal.vue'
import UtilizationModal from './utilizationModal.vue'
import WebSocketManager from '@/utils/webSocketManager'
import showMore from '@/assets/images/showMore.png'

const modalValue = ref(0)

const options = ref([
  {
    value: 'line',
    label: '产线维度',
  },
  {
    value: 'device',
    label: '设备维度',
  },
])

const deviceData = reactive({
  runningDevices: null, // 正在运行
  idleDevices: null, // 空闲
  faultDevices: null, // 故障
  offlineDevices: null, // 离线
})

onMounted(() => {
  // getDeviceData()
  // 维修工单完成率
  initMaintain()
  // 综合性评估
  initIntegrity()
  // 保养工位完成率
  initUpkeep()
  // 点检工单完成率
  initSpotCheck()
  // 实时稼动率
  initUtilization()
})

const receiveMessage = data => {
  console.log(JSON.parse(data))
}

let token = localStorage.getItem('token')
let websocketManager = new WebSocketManager(
  'ws://10.43.111.96:8080/digital-twin/websocket',
  token,
  receiveMessage
)
// websocketManager.start()

// 稼动率切换
const handleChange = value => {
  console.log(value)
}

const getDeviceData = () => {
  getDeviceStatus().then(res => {
    if (res.code === 200) {
      let { runningDevices, idleDevices, faultDevices, offlineDevices } =
        res.result
      deviceData.runningDevices = runningDevices
      deviceData.idleDevices = idleDevices
      deviceData.faultDevices = faultDevices
      deviceData.offlineDevices = offlineDevices
    }
  })
  setTimeout(() => {
    getDeviceData()
  }, 5000)
}

// 维修工单完成率
const initMaintain = () => {
  var option
  var chartDom = document.getElementById('maintain')
  var myChart = echarts.init(chartDom)

  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#fff',
        },
      },
    },
    legend: {
      itemWidth: 12,
      itemHeight: 8,
      textStyle: {
        color: '#fff',
      },
      data: ['已维修工单数', '完成率'],
    },
    grid: {
      top: '15%', // 上边距
      right: '5%', // 右边距
      bottom: '2%', // 下边距
      left: '5%', // 左边距
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisLabel: {
          rotate: 45,
          color: '#fff',
        },
        axisPointer: {
          type: 'shadow',
        },
        data: [
          '23-12',
          '23-01',
          '24-02',
          '24-03',
          '24-04',
          '24-05',
          '24-06',
          '24-07',
          '24-08',
          '24-09',
          '24-10',
          '24-11',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
        show: false,
        name: '已维修工单数',
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        show: false,
        name: '完成率',
        axisLabel: {
          formatter: '{value} %',
        },
      },
    ],
    series: [
      {
        type: 'bar',
        name: '已维修工单数',
        barWidth: 15,
        itemStyle: {
          color: '#00c4ff',
        },
        tooltip: {
          valueFormatter: function (value) {
            return value
          },
        },
        data: [0, 27, 23, 25, 29, 9, 0, 0, 1, 2, 1, 1],
      },
      {
        type: 'line',
        name: '完成率',
        smooth: true,
        itemStyle: {
          color: '#128bd7',
        },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' %'
          },
        },
        data: [0, 96.43, 100, 100, 93.55, 100, 0, 0, 100, 25, 100, 100],
      },
    ],
  }

  option && myChart.setOption(option)
  // 为窗口大小改变添加事件监听
  window.onresize = function () {
    // 调用ECharts实例的resize方法
    myChart.resize()
  }
}

// 实时稼动率
const initUtilization = () => {
  var option
  var chartDom = document.getElementById('utilization')
  var myChart = echarts.init(chartDom)

  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#fff',
        },
      },
    },
    legend: {
      itemWidth: 8,
      itemHeight: 6,
      textStyle: {
        color: '#fff',
      },
      data: ['总时长', '负荷时长', '稼动时长', '设备稼动率', '性能稼动率'],
    },
    grid: {
      top: '15%', // 上边距
      right: '5%', // 右边距
      bottom: '2%', // 下边距
      left: '5%', // 左边距
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisLabel: {
          rotate: 45,
          color: '#fff',
        },
        axisPointer: {
          type: 'shadow',
        },
        data: [
          '23-12',
          '23-01',
          '24-02',
          '24-03',
          '24-04',
          '24-05',
          '24-06',
          '24-07',
          '24-08',
          '24-09',
          '24-10',
          '24-11',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
        show: false,
        name: '总时长',
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        show: false,
        name: '负荷时长',
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        show: false,
        name: '稼动时长',
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        show: false,
        name: '设备稼动率',
        axisLabel: {
          formatter: '{value} %',
        },
      },
      {
        type: 'value',
        show: false,
        name: '性能稼动率',
        axisLabel: {
          formatter: '{value} %',
        },
      },
    ],
    series: [
      {
        type: 'bar',
        stack: 'bar',
        name: '总时长',
        barWidth: 15,
        itemStyle: {
          color: '#00beff',
        },
        tooltip: {
          valueFormatter: function (value) {
            return value
          },
        },
        data: [0, 22, 22, 23, 25, 12, , 0, 1, 2, 1, 1],
      },
      {
        type: 'bar',
        stack: 'bar',
        name: '负荷时长',
        barWidth: 15,
        itemStyle: {
          color: '#018ce0',
        },
        tooltip: {
          valueFormatter: function (value) {
            return value
          },
        },
        data: [0, 27, 23, 25, 29, 9, 0, 0, 1, 2, 1, 1],
      },
      {
        type: 'bar',
        stack: 'bar',
        name: '稼动时长',
        barWidth: 15,
        itemStyle: {
          color: '#b6d1e0',
        },
        tooltip: {
          valueFormatter: function (value) {
            return value
          },
        },
        data: [0, 27, 23, 25, 29, 9, 0, 0, 1, 2, 1, 1],
      },
      {
        type: 'line',
        name: '设备稼动率',
        smooth: true,
        itemStyle: {
          color: '#26bf75',
        },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' %'
          },
        },
        data: [0, 96.43, 100, 100, 93.55, 100, 0, 0, 100, 25, 100, 100],
      },
      {
        type: 'line',
        name: '性能稼动率',
        smooth: true,
        itemStyle: {
          color: '#ff7b23',
        },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' %'
          },
        },
        data: [5, 96.43, 100, 50, 93.55, 100, 60, 0, 100, 25, 100, 100],
      },
    ],
  }

  option && myChart.setOption(option)
  // 为窗口大小改变添加事件监听
  window.onresize = function () {
    // 调用ECharts实例的resize方法
    myChart.resize()
  }
}

// 综合性评估
const initIntegrity = () => {
  var option1
  var option2
  var option3
  var option4
  var chartDom1 = document.getElementById('integrity-oee')
  var chartDom2 = document.getElementById('integrity-time')
  var chartDom3 = document.getElementById('integrity-perf')
  var chartDom4 = document.getElementById('integrity-goods')
  var myChart1 = echarts.init(chartDom1)
  var myChart2 = echarts.init(chartDom2)
  var myChart3 = echarts.init(chartDom3)
  var myChart4 = echarts.init(chartDom4)

  option1 = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        center: ['50%', '75%'], // 仪表盘的中心位置，相对于容器的位置
        radius: '110%', // 仪表盘的半径，可以是百分比或者像素值
        splitNumber: 5,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 8,
        },
        pointer: {
          width: 3,
          length: '80%',
          offsetCenter: [0, '10%'],
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 8,
          },
        },
        axisTick: {
          distance: -16,
          splitNumber: 1,
          lineStyle: {
            width: 1,
            color: '#fff',
          },
        },
        splitLine: {
          distance: -45,
          lineStyle: {
            width: 0,
            color: '#fff',
          },
        },
        axisLabel: {
          distance: 10,
          color: '#fff',
          fontSize: 12,
        },
        title: {
          show: false,
        },
        detail: {
          backgroundColor: 'transparent',
          borderColor: 'none',
          width: '60%',
          color: '#FFF',
          fontSize: 16,
          offsetCenter: [0, '35%'],
          valueAnimation: true,
          formatter: function (value) {
            return 'OEE'
          },
          rich: {
            value: {
              fontSize: 50,
              fontWeight: 'bolder',
              color: '#777',
            },
            unit: {
              fontSize: 20,
              color: '#999',
              padding: [0, 0, -20, 10],
            },
          },
        },
        data: [
          {
            value: 80,
          },
        ],
      },
    ],
  }
  option2 = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        center: ['50%', '75%'], // 仪表盘的中心位置，相对于容器的位置
        radius: '110%', // 仪表盘的半径，可以是百分比或者像素值
        splitNumber: 5,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 8,
        },
        pointer: {
          width: 3,
          length: '80%',
          offsetCenter: [0, '10%'],
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 8,
          },
        },
        axisTick: {
          distance: -16,
          splitNumber: 1,
          lineStyle: {
            width: 1,
            color: '#fff',
          },
        },
        splitLine: {
          distance: -45,
          lineStyle: {
            width: 0,
            color: '#fff',
          },
        },
        axisLabel: {
          distance: 10,
          color: '#fff',
          fontSize: 12,
        },
        title: {
          show: false,
        },
        detail: {
          backgroundColor: 'transparent',
          borderColor: 'none',
          width: '60%',
          color: '#FFF',
          fontSize: 16,
          offsetCenter: [0, '35%'],
          valueAnimation: true,
          formatter: function (value) {
            return '时间利用率'
          },
          rich: {
            value: {
              fontSize: 50,
              fontWeight: 'bolder',
              color: '#777',
            },
            unit: {
              fontSize: 20,
              color: '#999',
              padding: [0, 0, -20, 10],
            },
          },
        },
        data: [
          {
            value: 80,
          },
        ],
      },
    ],
  }
  option3 = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        center: ['50%', '75%'], // 仪表盘的中心位置，相对于容器的位置
        radius: '110%', // 仪表盘的半径，可以是百分比或者像素值
        splitNumber: 5,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 8,
        },
        pointer: {
          width: 3,
          length: '80%',
          offsetCenter: [0, '10%'],
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 8,
          },
        },
        axisTick: {
          distance: -16,
          splitNumber: 1,
          lineStyle: {
            width: 1,
            color: '#fff',
          },
        },
        splitLine: {
          distance: -45,
          lineStyle: {
            width: 0,
            color: '#fff',
          },
        },
        axisLabel: {
          distance: 10,
          color: '#fff',
          fontSize: 12,
        },
        title: {
          show: false,
        },
        detail: {
          backgroundColor: 'transparent',
          borderColor: 'none',
          width: '60%',
          color: '#FFF',
          fontSize: 16,
          offsetCenter: [0, '35%'],
          valueAnimation: true,
          formatter: function (value) {
            return '性能利用率'
          },
          rich: {
            value: {
              fontSize: 50,
              fontWeight: 'bolder',
              color: '#777',
            },
            unit: {
              fontSize: 20,
              color: '#999',
              padding: [0, 0, -20, 10],
            },
          },
        },
        data: [
          {
            value: 80,
          },
        ],
      },
    ],
  }
  option4 = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        center: ['50%', '75%'], // 仪表盘的中心位置，相对于容器的位置
        radius: '110%', // 仪表盘的半径，可以是百分比或者像素值
        splitNumber: 5,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 8,
        },
        pointer: {
          width: 3,
          length: '80%',
          offsetCenter: [0, '10%'],
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 8,
          },
        },
        axisTick: {
          distance: -16,
          splitNumber: 1,
          lineStyle: {
            width: 1,
            color: '#fff',
          },
        },
        splitLine: {
          distance: -45,
          lineStyle: {
            width: 0,
            color: '#fff',
          },
        },
        axisLabel: {
          distance: 10,
          color: '#fff',
          fontSize: 12,
        },
        title: {
          show: false,
        },
        detail: {
          backgroundColor: 'transparent',
          borderColor: 'none',
          width: '60%',
          color: '#FFF',
          fontSize: 16,
          offsetCenter: [0, '35%'],
          valueAnimation: true,
          formatter: function (value) {
            return '良品率'
          },
          rich: {
            value: {
              fontSize: 50,
              fontWeight: 'bolder',
              color: '#777',
            },
            unit: {
              fontSize: 20,
              color: '#999',
              padding: [0, 0, -20, 10],
            },
          },
        },
        data: [
          {
            value: 80,
          },
        ],
      },
    ],
  }

  option1 && myChart1.setOption(option1)
  option2 && myChart2.setOption(option2)
  option3 && myChart3.setOption(option3)
  option4 && myChart4.setOption(option4)

  // 为窗口大小改变添加事件监听
  window.onresize = function () {
    // 调用ECharts实例的resize方法
    myChart1.resize()
    myChart2.resize()
    myChart3.resize()
    myChart4.resize()
  }
}

// 保养工位完成率
const initUpkeep = () => {
  var option
  var chartDom = document.getElementById('upkeep')
  var myChart = echarts.init(chartDom)

  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#fff',
        },
      },
    },
    legend: {
      itemWidth: 12,
      itemHeight: 8,
      textStyle: {
        color: '#fff',
      },
      data: ['已保养工位数', '保养率'],
    },
    grid: {
      top: '15%', // 上边距
      right: '5%', // 右边距
      bottom: '2%', // 下边距
      left: '5%', // 左边距
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisLabel: {
          rotate: 45,
          color: '#fff',
        },
        axisPointer: {
          type: 'shadow',
        },
        data: [
          '23-12',
          '23-01',
          '24-02',
          '24-03',
          '24-04',
          '24-05',
          '24-06',
          '24-07',
          '24-08',
          '24-09',
          '24-10',
          '24-11',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
        show: false,
        name: '已保养工位数',
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        show: false,
        name: '保养率',
        axisLabel: {
          formatter: '{value} %',
        },
      },
    ],
    series: [
      {
        type: 'bar',
        name: '已保养工位数',
        barWidth: 15,
        itemStyle: {
          color: '#43a0ff',
        },
        tooltip: {
          valueFormatter: function (value) {
            return value
          },
        },
        data: [24, 278, 314, 302, 312, 276, 0, 0, 0, 0, 0, 223],
      },
      {
        type: 'line',
        name: '保养率',
        smooth: true,
        itemStyle: {
          color: '#a9663c',
        },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' %'
          },
        },
        data: [100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 100],
      },
    ],
  }

  option && myChart.setOption(option)
  // 为窗口大小改变添加事件监听
  window.onresize = function () {
    // 调用ECharts实例的resize方法
    myChart.resize()
  }
}

// 点检工单完成率
const initSpotCheck = () => {
  var option
  var chartDom = document.getElementById('spotCheck')
  var myChart = echarts.init(chartDom)

  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#fff',
        },
      },
    },
    legend: {
      itemWidth: 12,
      itemHeight: 8,
      textStyle: {
        color: '#fff',
      },
      data: ['已点检工单数', '已点检率'],
    },
    grid: {
      top: '15%', // 上边距
      right: '5%', // 右边距
      bottom: '2%', // 下边距
      left: '5%', // 左边距
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisLabel: {
          rotate: 45,
          color: '#fff',
        },
        axisPointer: {
          type: 'shadow',
        },
        data: ['11-23', '11-24', '11-25', '11-26', '11-27', '11-28', '11-29'],
      },
    ],
    yAxis: [
      {
        type: 'value',
        show: false,
        name: '已点检工单数',
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        show: false,
        name: '已点检率',
        axisLabel: {
          formatter: '{value} %',
        },
      },
    ],
    series: [
      {
        type: 'bar',
        name: '已点检工单数',
        barWidth: 15,
        itemStyle: {
          color: '#1aa7e5',
        },
        tooltip: {
          valueFormatter: function (value) {
            return value
          },
        },
        data: [3, 0, 47, 0, 0, 0, 0],
      },
      {
        type: 'line',
        name: '已点检率',
        smooth: true,
        itemStyle: {
          color: '#4580a3',
        },
        tooltip: {
          valueFormatter: function (value) {
            return value + ' %'
          },
        },
        data: [12, 0, 12, 0, 0, 0, 0],
      },
    ],
  }

  option && myChart.setOption(option)
  // 为窗口大小改变添加事件监听
  window.onresize = function () {
    // 调用ECharts实例的resize方法
    myChart.resize()
  }
}
</script>

<template>
  <div class="equip-wrap">
    <div class="left">
      <div class="chart-item equip-status">
        <div class="title">生产设备状态</div>
        <div class="content">
          <div class="item">
            <img src="@/assets/images/status_icon.png" alt="" />
            <div class="section">
              <div class="txt">正在运行</div>
              <div class="num">{{ deviceData.runningDevices ?? '--' }}</div>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/images/status_icon.png" alt="" />
            <div class="section">
              <div class="txt">空闲设备</div>
              <div class="num">{{ deviceData.idleDevices ?? '--' }}</div>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/images/status_icon.png" alt="" />
            <div class="section">
              <div class="txt">故障设备</div>
              <div class="num">{{ deviceData.faultDevices ?? '--' }}</div>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/images/status_icon.png" alt="" />
            <div class="section">
              <div class="txt">离线设备</div>
              <div class="num">{{ deviceData.offlineDevices ?? '--' }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-item">
        <div class="title">维修工单完成率</div>
        <div class="echart-wrap" id="maintain" />
        <img alt="" class="show-more" :src="showMore" @click="modalValue = 1" />
      </div>
      <div class="chart-item chart-utilization">
        <div class="title">实时稼动率</div>
        <div class="echart-wrap" id="utilization" />
        <img alt="" class="show-more" :src="showMore" @click="modalValue = 2" />
        <a-select
          placeholder="产线维度"
          style="width: 100px"
          :options="options"
          class="custom-select"
          v-model:value="value"
          @change="handleChange"
          defaultActiveFirstOption
          :dropdownStyle="{ background: '#191e2d' }"
        ></a-select>
      </div>
    </div>
    <div class="right">
      <div class="chart-item">
        <div class="title">综合性评估</div>
        <div class="echart-wrap integrity-wrap">
          <div class="item" id="integrity-oee" />
          <div class="item" id="integrity-time" />
          <div class="item" id="integrity-perf" />
          <div class="item" id="integrity-goods" />
        </div>
      </div>
      <div class="chart-item">
        <div class="title">保养工位完成率</div>
        <div class="echart-wrap" id="upkeep" />
        <img alt="" class="show-more" :src="showMore" @click="modalValue = 3" />
      </div>
      <div class="chart-item">
        <div class="title">点检工单完成率</div>
        <div class="echart-wrap" id="spotCheck" />
      </div>
    </div>
    <MaintainModal v-if="modalValue === 1" @onClose="modalValue = 0" />
    <UtilizationModal v-if="modalValue === 2" @onClose="modalValue = 0" />
    <UpkeepModal v-if="modalValue === 3" @onClose="modalValue = 0" />
  </div>
</template>

<style lang="scss" scoped>
.equip-wrap {
  display: flex;

  .left,
  .right {
    position: absolute;
    top: vh(108);
    z-index: 999;
    color: #fff;

    .chart-item {
      position: relative;
      width: vw(420);
      height: vh(300);
      padding-top: vh(38);
      margin-bottom: vh(12);
      box-sizing: border-box;
      background: linear-gradient(
          rgba(130, 167, 198, 0.3),
          rgba(130, 167, 198, 0.3)
        ),
        url('@/assets/images/pop_bg.png') center/cover no-repeat;
      // background: url('@/assets/images/pop_bg.png') no-repeat;
      // background-size: 100% 100%;

      &.chart-utilization {
        position: relative;
        .custom-select {
          position: absolute;
          top: vh(1);
          right: vw(48);
        }
      }

      .show-more {
        position: absolute;
        width: vw(24);
        height: vw(24);
        top: vh(6);
        right: vw(12);
        cursor: pointer;
      }

      .title {
        position: absolute;
        top: vh(-34);
        left: 0;
        width: 100%;
        height: vh(108);
        font-size: vw(18);
        letter-spacing: 2px;
        line-height: vh(108);
        padding-left: vw(32);
        box-sizing: border-box;
        background: url('@/assets/images/title_bg.png') no-repeat;
        background-size: 100% 100%;
      }

      .echart-wrap {
        width: 100%;
        height: vh(262);

        &.integrity-wrap {
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          .item {
            width: 47.5%;
            height: 47.5%;
            box-sizing: border-box;
            margin-right: 5%;
            margin-bottom: 2.4%;
            &:nth-child(even) {
              margin-right: unset;
            }
          }
        }
      }

      &.equip-status {
        .content {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          padding: vw(12);
          height: calc(100% - vh(6));
          .item {
            display: flex;
            width: 48%;
            height: 48%;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            background: url('@/assets/images/status_bg.png') no-repeat;
            background-size: 100% 100%;

            img {
              width: vw(36);
              height: vw(36);
              margin-right: vvw(12);
            }
            .section {
              text-align: center;
              margin-left: vw(12);
              .num {
                margin-top: vh(5);
                font-size: vw(26);
              }
            }

            &:nth-child(2n + 1) {
              margin-right: 4%;
            }
            &:nth-child(1) {
              margin-bottom: 4%;
            }
            &:nth-child(2) {
              margin-bottom: 4%;
            }
          }
        }
      }
    }

    &.left {
      left: vw(24);
    }
    &.right {
      right: vw(24);
    }
  }
}
</style>