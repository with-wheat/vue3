<!--
 * @Description: 封装地图
 * @Author: Lxy
 * @Date: 2022-04-01 14:09:00
 * @LastEditTime: 2022-04-01 22:44:28
 * @LastEditors:
-->
<template>
  <div class="mapChart">
    <base-echarts :options="options"></base-echarts>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import * as echarts from 'echarts'
import BaseEcharts from '@/base-ui/echart/index'
import { IDataType } from '../types'
const axisRefDom = ref<HTMLElement>()

const props = defineProps<{
  addressSale: IDataType[]
}>()

const options = computed(() => {
  // 地区经纬度数据
  const chinaGeoCoordMap = {
    黑龙江: [127.9688, 45.368],
    内蒙古: [110.3467, 41.4899],
    吉林: [125.8154, 44.2584],
    北京: [116.4551, 40.2539],
    辽宁: [123.1238, 42.1216],
    河北: [114.4995, 38.1006],
    天津: [117.4219, 39.4189],
    山西: [112.3352, 37.9413],
    陕西: [109.1162, 34.2004],
    甘肃: [103.5901, 36.3043],
    宁夏: [106.3586, 38.1775],
    青海: [101.4038, 36.8207],
    新疆: [87.9236, 43.5883],
    西藏: [91.11, 29.97],
    四川: [103.9526, 30.7617],
    重庆: [108.384366, 30.439702],
    山东: [117.1582, 36.8701],
    河南: [113.4668, 34.6234],
    江苏: [118.8062, 31.9208],
    安徽: [117.29, 32.0581],
    湖北: [114.3896, 30.6628],
    浙江: [119.5313, 29.8773],
    福建: [119.4543, 25.9222],
    江西: [116.0046, 28.6633],
    湖南: [113.0823, 28.2568],
    贵州: [106.6992, 26.7682],
    云南: [102.9199, 25.4663],
    广东: [113.12244, 23.009505],
    广西: [108.479, 23.1152],
    海南: [110.3893, 19.8516],
    上海: [121.4648, 31.2891]
  }
  // 获取地区数据
  const chinaDatas = props.addressSale || []
  // 定义飞线路径数组
  const chinaCoordDatas = [
    [
      {
        name: '北京'
      },
      {
        name: '浙江'
      }
    ],
    [
      {
        name: '湖南'
      },
      {
        name: '浙江'
      }
    ],
    [
      {
        name: '四川'
      },
      {
        name: '浙江'
      }
    ],
    [
      {
        name: '青海'
      },
      {
        name: '浙江'
      }
    ],
    [
      {
        name: '新疆'
      },
      {
        name: '浙江'
      }
    ],
    [
      {
        name: '黑龙江'
      },
      {
        name: '浙江'
      }
    ]
  ]
  // 处理飞线数据
  const convertData = function (data) {
    const res = []
    for (let i = 0; i < data.length; i++) {
      let dataItem = data[i]
      let fromCoord = chinaGeoCoordMap[dataItem[0].name]
      let toCoord = chinaGeoCoordMap[dataItem[1].name]
      if (fromCoord && toCoord) {
        res.push({
          coords: [fromCoord, toCoord]
        })
      }
    }
    return res
  }
  return {
    tooltip: {
      trigger: 'item'
    },

    visualMap: {
      show: false,
      min: 0,
      seriesIndex: 0,
      left: 'left',
      top: 'bottom',
      calculable: false,
      inRange: {
        color: ['#FFDED1', '#FEB08F', '#FF9C6F']
      }
    },
    geo: {
      map: 'china',
      zoom: 1.2,
      label: {
        normal: {
          show: true,
          color: '#E68470'
        },
        emphasis: {
          show: false,
          color: '#292929'
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#FFDED1',
          borderColor: '#E68470',
          borderWidth: 1
        },
        emphasis: {
          areaColor: '#05ff09'
        }
      }
    },
    series: [
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: false
          }
        },
        data: chinaDatas
      },
      {
        type: 'lines',
        coordinateSystem: 'geo',
        z: 99,
        zlevel: 2,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', //箭头图标
          symbolSize: 8 //图标大小
        },
        lineStyle: {
          normal: {
            color: 'rgba(79, 141, 245, 1)',
            width: 1, //尾迹线条宽度
            opacity: 1, //尾迹线条透明度
            curveness: 0.4 //尾迹线条曲直度
          }
        },
        data: convertData(chinaCoordDatas)
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: 11,
        zlevel: 2,
        rippleEffect: {
          //涟漪特效
          color: 'transparent'
        },

        symbol: 'circle',
        itemStyle: {
          color: '#4F8DF5',
          borderWidth: 20,
          borderColor: 'rgba(79, 141, 245, 0.05)'
        },
        data: chinaCoordDatas.map((item) => ({
          ...item[0],
          value: chinaGeoCoordMap[item[0].name]
        }))
      }
    ]
  }
})
</script>

<style scoped></style>
