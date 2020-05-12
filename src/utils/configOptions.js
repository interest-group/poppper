
const DEFAULT_OPTIONS =  {
  position: 'absolute',
  trackPosition: 'bottom-start',
  appendParentNode: null,
  isAppendParentNode: false,
  offset: {
    x: 0,
    y: 0
  },
  exceed: {
    x: 0,
    y: 0
  },
  styles: {},
}

const POSTIION_LIST = [
  'bottom-start',
  'bottom-center',
  'bottom-end',
  'top-start',
  'top-center',
  'top-end',
  'left-center',
  'right-center'
]

const isStartOrEnd = (val, ...condition) => {
  condition = condition.length ? condition : ['start', 'end']
  return POSTIION_LIST.find(v => v === val).includes(condition[0]) || POSTIION_LIST.find(v => v === val).includes(condition[1])
}
export default {
  DEFAULT_OPTIONS,
  POSTIION_LIST,
  isStartOrEnd
}