import popperType from './popperType'
import configOptions from './configOptions'

const DEFAULT_OPTIONS = configOptions.DEFAULT_OPTIONS
const METHODS_LIST = configOptions.POSTIION_LIST

function checkNode(node) {
  return (node && node instanceof HTMLElement)
}
function getWindowInner() {
  if (this.options.position === 'fixed' || !checkNode(this.options.appendParentNode)) {
    return getDocumentInner()
  } else {
    return getParentInner(this.options.appendParentNode)
  }
}

// 窗口可视区域宽高
const getDocumentInner = () => {
  const innerWidth = window.innerWidth || document.documentElement.clientWidth
  const innerHeight = window.innerHeight || document.documentElement.clientHeight
  const scrollHeight = document.body.scrollHeight
  return {
    innerWidth,
    innerHeight,
    scrollHeight
  }
}
// 父元素宽高
const getParentInner = (node) => {
  const innerWidth = node.offsetWidth
  const innerHeight = node.offsetHeight
  const scrollHeight = node.scrollHeight

  return {
    innerWidth,
    innerHeight,
    scrollHeight
  }
}

// 浮动元素宽高
const getPoperInner = (node) => {
  const offsetWidth = node.offsetWidth,
        offsetHeight = node.offsetHeight
  return {
    offsetWidth,
    offsetHeight
  }
}

// 要跟踪节点各值
function getTrackEleInner() {
  if (this.options.position === 'fixed' || !checkNode(this.options.appendParentNode)) {
    return getTrackBasicWindowInner(this.trackNode)
  } else {
    return getTrackParentWindowInner.call(this, this.options.appendParentNode)
  }
}

// 要跟踪节点各值基于窗口
function getTrackBasicWindowInner(trackNode) {
  const targetVal = trackNode.getBoundingClientRect()
  return {
    top: targetVal.top,
    bottom: targetVal.bottom,
    left: targetVal.left,
    right: targetVal.right,
    width: targetVal.width,
    height: targetVal.height,
  }
}

// 要跟踪节点各值基于父元素
function getTrackParentWindowInner(parentNode) {
  const width = this.trackNode.offsetWidth
  const height = this.trackNode.offsetHeight
  const top = this.trackNode.offsetTop - parentNode.scrollTop
  const bottom = this.trackNode.offsetTop - parentNode.scrollTop + height
  const left = this.trackNode.offsetLeft - parentNode.scrollLeft
  const right = this.trackNode.offsetLeft - parentNode.scrollLeft + width

  return {
    top,
    bottom,
    left,
    right,
    width,
    height,
  }
}

// 获取节点
const getTrackEle = (trackRef, required = true) => {
  if (!trackRef && required) {
    throw new Error('You must pass in a node to track, Is the ref field')
  }
  if (!(trackRef instanceof HTMLElement)) {
    throw new Error("This element cannot be found, please make sure it is correct")
  } 
  
  return trackRef
}

// 可滚动父级元素集合
function getParentScrollList() {
  let parentNode = this.trackNode.parentNode || null
  let list = []
  while(parentNode) {
    if (!(parentNode instanceof HTMLElement)) {
      break
    } else {
      if (parentNode.scrollTop > 0 || parentNode.scrollLeft > 0) {
        list.push(parentNode)
      } else {
        parentNode.scrollTop ++
        parentNode.scrollLeft ++
        const top = parentNode.scrollTop
        const left = parentNode.scrollLeft
        top && (parentNode.scrollTop = 0)
        left && (parentNode.left = 0)
        if (top > 0 || left > 0) {
          top > 0 && list.push(parentNode)
        }
      }
      parentNode = parentNode.parentNode || null
    }
  }
  return list
}

function scrollInner(val) {
  let scrollTop, scrollLeft
  if (checkNode(this.options.appendParentNode) && this.options.position !== 'fixed') {
    scrollTop = this.options.appendParentNode.scrollTop
    scrollLeft = this.options.appendParentNode.scrollLeft
  } else {
    scrollTop = val.scrollTop
    scrollLeft = val.scrollLeft
  }
  this.scrollInner = {
    scrollTop,
    scrollLeft
  }
}
function getTagNameToLowerCase(val) {
  return val.toLowerCase()
}

function scroll(e) {
  if (this.el.style.display !== 'none') {
    if (e.target.nodeName === '#document') {
      scrollInner.call(this, e.target.scrollingElement)
    } else {
      scrollInner.call(this, e.target)
    }
    calculation.call(this)
  }
}

// 盒子滚动以及尺寸变化事件
const HandEvent = function(_this) {
  this.handleEvent  = function(e) {
    switch(e.type) {
      case 'scroll':
        scroll.call(_this, e)
        break;
      case 'resize':
        if (_this.el.style.display !== 'none') {
          calculation.call(_this)
        }
        break;
    }
  }
}

function addEvent() {
  this.list.forEach(v => {
    if (getTagNameToLowerCase(v.tagName) === 'html') {
      document.addEventListener('scroll', this.hands, false)
    } else {
      if (checkNode(this.options.appendParentNode)) {
        v.addEventListener('scroll', this.hands, false)
      }
    }
  })
  window.addEventListener('resize', this.hands, false)
}

function removeEvent() {
  this.list.forEach(v => {
    if (getTagNameToLowerCase(v.tagName) === 'html') {
      document.removeEventListener('scroll', this.hands, false)
    } else {
      v.removeEventListener('scroll', this.hands, false)
    }
  })
  window.removeEventListener('resize', this.hands, false)
}

function getParentNodeScroll() {
  if (!(this.trackNode instanceof HTMLElement)) return
  this.hands = new HandEvent(this)
  addEvent.call(this)
}

// css设置
const setNodeCss = (node, key, value) => {
  let styles = key || {}
  if (typeof key === 'string') {
    styles = {
      key: value
    }
  }
  Object.keys(styles).forEach(v => {
    node.style[v] = styles[v]
  })
}

function getHumpMethods(val) {
  let strList = val.split('-')
  return strList[0] + strList[1].replace(strList[1][0], strList[1][0].toUpperCase())
}
function calculationType() {
  let windowInner = getWindowInner.call(this)
  let popepInner = getPoperInner(this.el)
  let targetInner = getTrackEleInner.call(this)
  let scrollInner = this.scrollInner
  let vals

  if (METHODS_LIST.includes(this.options.trackPosition)) {
    vals = popperType[getHumpMethods(this.options.trackPosition)].call(this, {windowInner, popepInner, targetInner, scrollInner})
  }
  return vals
}

// 计算区域大小
function calculation() {
  setNodeCss(this.el, calculationType.call(this))
}

function getOpt(opt) {
  if (!opt) return {}
  if (typeof opt !== 'object') {
    throw new Error('Wrong configuration parameter type')
  }
  return opt
}

// 配置参数
const getPackageOptions = (opt) => {
  const options = Object.assign({}, opt, {})

  options.offset = getOpt(options.offset)
  options.exceed = getOpt(options.exceed)

  options.position = options.position || DEFAULT_OPTIONS.position
  options.offset.x = options.offset.x || DEFAULT_OPTIONS.offset.x
  options.offset.y = options.offset.y || DEFAULT_OPTIONS.offset.y

  options.exceed.x = options.exceed.x || DEFAULT_OPTIONS.exceed.x
  options.exceed.y = options.exceed.y || DEFAULT_OPTIONS.exceed.y
  options.trackPosition = options.trackPosition || DEFAULT_OPTIONS.trackPosition
  options.styles = options.styles || Object.assign({}, DEFAULT_OPTIONS.styles)
  options.appendParentNode = options.appendParentNode || DEFAULT_OPTIONS.appendParentNode
  
  return options
}

function getAppendParentNode() {
  return checkNode(this.options.appendParentNode) ? 
  this.options.appendParentNode : 
  document.getElementsByTagName('body')[0]
}

function init(el, trackNode, options) {
  this.el = getTrackEle(el)
  this.trackNode = getTrackEle(trackNode)
  this.options = getPackageOptions(options)
  
  this.list = getParentScrollList.call(this)

  // 判断是否加到父级元素上
  const appendParentNode = getAppendParentNode.call(this)
  
  const parentNode = this.el.parentNode
  
  // 如果存在， 则先清除
  parentNode.tagName === appendParentNode.tagName && parentNode.removeChild(el)

  appendParentNode.appendChild(el)

  setNodeCss(el, {
    position: this.options.position,
    ...this.options.styles
  })

  getParentNodeScroll.call(this)

}


function Popper(el, trackNode, options = {}) {

  init.call(this, el, trackNode, options)

  this.scrollInner = {
    scrollTop: 0,
    scrollLeft: 0
  }

  this.show = function() {
    calculation.call(this)
    return this
  }

  this.update = function() {
    init.call(this, el, trackNode, options)
    calculation.call(this)
    return this
  }

  // this.reset = function() {
  //   this.scrollInner = {
  //     scrollTop: 0,
  //     scrollLeft: 0
  //   }
  //   this.setOptions({})
  // },

  this.setOptions = function(options = {}) {
    this.options = getPackageOptions(options)
    setNodeCss(el, {
      position: this.options.position,
      ...this.options.styles
    })
    return this
  }

  this.destroy = function() {
    // 判断是否加到父级元素上
    const appendParentNode = getAppendParentNode.call(this)
    appendParentNode.removeChild(this.el)
    removeEvent.call(this)
    this.hands = null
  }
}

export default Popper
