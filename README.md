# poppper

# Chinse Version

给定一个元素（比如一个按钮）和一个描述它的工具提示元素，Popper会自动将弹框提示放在元素附近的正确位置。

它将定位从文档流中“弹出”并浮动在目标元素附近的任何UI元素。最常见的例子是工具提示，但它也包括弹出窗口、下拉菜单等。所有这些都可以泛称为“popper”元素。


## npmUrl
<https://www.npmjs.com/package/v-poppers>


## 为什么使用Popper库？

* 在任何数量的滚动容器中滚动时, 确保与被跟踪元素保持在一起

* 无需手动设置CSS, Popper会自动设置到相应的位置

* 灵活配置弹出位置， 大大减少了开发生产力

## 安装

``` 
# Using npm 
npm i v-poppers -S


# Using yarn 
yarn add v-poppers

```

以Vue项目为例， 当然你可以在任何通过构建工具构建的项目中使用


## 使用

``` 
<div class="popper" ref="popper"></div>
<div class="target" ref="target"></div>

<script>
import Popper from 'v-poppers'

export default {
  data() {
    return {
      s: null,
    }
  },
  mounted() {
    this.s = new Popper(this.$refs.popper, this.$refs.target)
    this.s.show()
  }
}

</script>

```
new Popper(el, trackNode, options)

|属性| 类型| 说明| 默认值|
| ----- | ----- | ------| ------|
|el(必传) | HTMLElement | popper 元素节点| null|
|trackNode(必传) | HTMLElement | popper 要跟踪的元素节点| null|
|options(可选) | object | 配置选项| {}|

* 当 new 的时候， Popper会初始化配置， 你必须使用show()方法， 来使Popper到达指定的位置。

* Popper 默认采用绝对定位， 当然你可以通过下面的配置来修改它

* Popper默认会将 popper 元素自动添加到 body 上， 计算默认也将是以body为基准， 如果需要加入到 popper 元素的父级上， 请看下面的配置选项。

## 传入配置

可以通过传入配置来使Popper更灵活

``` 
<div ref="wrap">
  <div class="popper" ref="popper"></div>
  <div class="target" ref="target"></div>
</div>

<button @click="update">改变配置</button>

<script>
import Popper from 'v-poppers'

export default {
  data() {
    return {
      s: null,
      options: {
        position: 'absolute',
        trackPosition: 'bottom-start',
        offset: {
          y: 0
        },
        exceed: {
          y: 30,
          x: 30
        },
        appendParentNode: null,
        className: {
          top: ['top-class']
        },
        styles: {
          color: 'red'
        }
      }
    }
  },
  mounted() {
    this.options.appendParentNode = this.$refs.wrap
    this.s = new Popper(this.$refs.popper, this.$refs.target, this.options)
    this.s.show()
  },
  beforeDestroy() {
    this.s.destroy()
  },
  methods: {
    update() {
      this.options.offset.y = 20
      this.s.setOptions(this.options).update()
    }
  }
}

</script>

```

## 配置属性

|名称| 类型| 说明| 可选值| 默认值|
|----|-----|-----|----|-----|
|position|string|popper元素定位方式| css可用的定位值| absolute|
|trackPosition|string|popper元素所有跟踪的位置| 见表格下文| bottom-start|
|offset|object|popper元素偏移量| 任何有用数值| {x: 0, y: 0}|
|exceed|object|popper元素被隐藏多少开始计算位置| 任何有用数值| {x: 0, y: 0}|
|appendParentNode|HTMLElement|popper元素所需要被追加到的父元素， 不传会被默认加载body上| DOM | null |
|className|object|popper元素所在相对于跟踪元素节点位置的class样式| 见表格下文 | -- |
|styles|object|popper元素 的styles样式| 任何可用的style样式 | {} |


* trackPosition 的可能值: bottom-start | bottom-center | bottom-end | top-start | top-center | top-end | left-center | right-center

* className 的可能值： top | bottom | left | right |


## Popper 方法
| 名称 | 说明 | 参数| 返回值 |
| --- | ----| ----| ----- |
| show | 显示Popper元素， 只有调用此方法，才开始计算位置| -- | 当前 Popper 实例 |
|update | 更新Popper元素， 调用此方法， 会重新开始计算 | -- | 当前 Popper 实例 |
|setOptions | 更新配置选项， 当重新更新了配置后， 调用此方法重新设置 | options | 当前 Popper 实例 |
|destroy | 销毁当前Popper实例 | --- | ---- |


当不需要使用popper元素的时候， 应该要手动去销毁它
