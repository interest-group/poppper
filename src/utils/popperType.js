import configOptions from './configOptions'

// class设置
const setNodeClass = (node, options, position) => {
  if (
    options.className && 
    typeof options.className === 'object' && 
    options.className[position]) {
    options.className[position].forEach(v => {
      node.classList.add(v)
    })
  }
}

const removeClass = (node, options) => {
  if (options.className) {
    Object.values(options.className).forEach(v => {
      v.forEach(c => {
        node.classList.remove(c)
      })
    })
  }
}

function verticalDirection({windowInner, popepInner, targetInner, scrollInner}) {
  let top = 0, position = 'bottom'
  removeClass(this.el, this.options)
  if (this.options.position === 'fixed') {
    top = targetInner.top
  } else {
    top = targetInner.top + scrollInner.scrollTop 
  }
  const topInner = targetInner.top
  const popperInner = popepInner.offsetHeight + this.options.offset.y - this.options.exceed.y
  const bottomInner = windowInner.innerHeight - targetInner.bottom

  if (topInner < popperInner) {
    setNodeClass(this.el, this.options, 'bottom')
    position = 'bottom'
    top += this.options.offset.y
  } 
  else if (bottomInner < popperInner) {
    position = 'top'
    setNodeClass(this.el, this.options, 'top')
    top -= this.options.offset.y
  } else {
    position = 'inherit'
    setNodeClass(this.el, this.options, 'inherit')
    if (this.options.trackPosition.includes('top')) {
      top -= this.options.offset.y
    } else {
      top += this.options.offset.y
    }
  }
  return {
    top,
    position
  }
}

function horizontalDirection({windowInner, popepInner, targetInner, scrollInner}) {
  let left = 0, position = 'left', inner = 0
  if (this.options.position === 'fixed') {
    left = targetInner.left
  } else {
    left = targetInner.left + scrollInner.scrollLeft
  }

  if (configOptions.isStartOrEnd(this.options.trackPosition)) {
    inner = popepInner.offsetWidth
  } 

  const leftInner = targetInner.left + inner
  const surplusInner = windowInner.innerWidth - targetInner.left
  const popperInner = popepInner.offsetWidth + this.options.offset.x - this.options.exce
  const rightInner = windowInner.innerWidth - targetInner.right + inner

  if (leftInner < popperInner || surplusInner < popepInner.offsetWidth) {
    setNodeClass(this.el, this.options, 'right')
    position = 'right'
    left += this.options.offset.x
  }
  else if (rightInner < popperInner ) {
    
    setNodeClass(this.el, this.options, 'left')
    position = 'left'
    left -= this.options.offset.x
  } else {
    position = 'inherit'
    setNodeClass(this.el, this.options, 'inherit')

    if (this.options.trackPosition.includes('left')) {
      left -= this.options.offset.x
    } else {
      left += this.options.offset.x
    }
  }
  return {
    left,
    position
  }
}


export default {
  bottomStart({windowInner, popepInner, targetInner, scrollInner}) {
    let horizontal = horizontalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    let vertical = verticalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})

    if (horizontal.position === 'right') {
      horizontal.left += targetInner.width - popepInner.offsetWidth
    }
    if (vertical.position === 'bottom' || vertical.position === 'inherit') {
      vertical.top += targetInner.height
    } else {
      vertical.top -= popepInner.offsetHeight
    }
    return {
      left: `${horizontal.left}px`,
      top: `${vertical.top}px`
    }
  },

  bottomCenter({windowInner, popepInner, targetInner, scrollInner}) {
    let horizontal = horizontalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    horizontal.left += targetInner.width / 2 - popepInner.offsetWidth / 2
    let vertical = verticalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    if (vertical.position === 'top') {
      vertical.top -= popepInner.offsetHeight
    } else {
      vertical.top += targetInner.height
    }
    return {
      left: `${horizontal.left}px`,
      top: `${vertical.top}px`
    }
  },

  bottomEnd({windowInner, popepInner, targetInner, scrollInner}) {
    let horizontal = horizontalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    if (horizontal.position === 'inherit' || horizontal.position === 'right') {
      horizontal.left += targetInner.width - popepInner.offsetWidth
    }    
    let vertical = verticalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    if (vertical.position === 'bottom' || vertical.position === 'inherit') {
      vertical.top += targetInner.height
    } else {
      vertical.top -= popepInner.offsetHeight
    }
    return {
      left: `${horizontal.left}px`,
      top: `${vertical.top}px`
    }
  },

  topStart({windowInner, popepInner, targetInner, scrollInner}) {
    let horizontal = horizontalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    let vertical = verticalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    
    if (horizontal.position === 'right') {
      horizontal.left += targetInner.width - popepInner.offsetWidth
    }
    if (vertical.position === 'top' || vertical.position === 'inherit') {
      vertical.top -= popepInner.offsetHeight
    } else {
      vertical.top += targetInner.height
    }
    return {
      left: `${horizontal.left}px`,
      top: `${vertical.top}px`
    }
  },

  topCenter({windowInner, popepInner, targetInner, scrollInner}) {
    let horizontal = horizontalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    horizontal.left += targetInner.width / 2 - popepInner.offsetWidth / 2
    let vertical = verticalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    if (vertical.position === 'top' || vertical.position === 'inherit') {
      vertical.top -= popepInner.offsetHeight
    } else {
      vertical.top += targetInner.height
    }
    return {
      left: `${horizontal.left}px`,
      top: `${vertical.top}px`
    }
  },

  topEnd({windowInner, popepInner, targetInner, scrollInner}) {
    let horizontal = horizontalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    if (horizontal.position === 'inherit' || horizontal.position === 'right') {
      horizontal.left += targetInner.width - popepInner.offsetWidth
    }
    
    let vertical = verticalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    if (vertical.position === 'top' || vertical.position === 'inherit') {
      vertical.top -= popepInner.offsetHeight
    } else {
      vertical.top += targetInner.height
    }
    return {
      left: `${horizontal.left}px`,
      top: `${vertical.top}px`
    }
  },

  leftCenter({windowInner, popepInner, targetInner, scrollInner}) {
    let horizontal = horizontalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    let vertical = verticalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    if (horizontal.position === 'left' || horizontal.position === 'inherit') {
      horizontal.left -= popepInner.offsetWidth
    } 
    if (horizontal.position === 'right') {
      horizontal.left += targetInner.width
    }
    vertical.top += targetInner.height / 2 - popepInner.offsetHeight / 2
    return {
      left: `${horizontal.left}px`,
      top: `${vertical.top}px`
    }
  },

  rightCenter({windowInner, popepInner, targetInner, scrollInner}) {
    let horizontal = horizontalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    let vertical = verticalDirection.call(this, {windowInner, popepInner, targetInner, scrollInner})
    if (horizontal.position === 'right' || horizontal.position === 'inherit') {
      horizontal.left += targetInner.width
    } else {
      horizontal.left -= popepInner.offsetWidth
    }

    vertical.top += targetInner.height / 2 - popepInner.offsetHeight / 2

    return {
      left: `${horizontal.left}px`,
      top: `${vertical.top}px`
    }
  }
}