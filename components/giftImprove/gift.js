import util from '../../utils/util.js'
let randomSet = new Set()

Component({
  properties: {
    gift: {
      type: Object,
      value: {}
    }
  },

  observers: {
    'gift': function (newValue) {
      if (Object.keys(newValue).length > 0) {
        this.getNewGift(newValue)
      }
    }
  },

  data: {
    currentQueue: [],
    waitQueue: [],
    len: 5, // 固定队列长度
    showGiftTime: 3000, // 3秒隐藏
    dequeueTimer: [],
    showTimer: [],
    intervalTime: 300, // 300ms
    intervalTimer: null
  },

  methods: {
    getNewGift(obj) {
      obj.show = 'in'
      this.data.waitQueue.push(obj)
      if (this.data.currentQueue.length === 0) { // 第一条新消息
        this.enqueue()
      }
    },
    // setInterval 向当前队列中添加新的礼物
    enqueue() {
      this.data.intervalTimer = setInterval(() => {
        if (this.data.waitQueue.length !== 0) {
          if (this.currentQueue.length < this.data.len) {
            const obj = this.data.waitQueue[0]
            this.data.waitQueue.shift()
            this.data.currentQueue.push(obj)
            this.setData({
              currentQueue: this.data.currentQueue
            })
          }
        } else {
          clearInterval(this.data.intervalTimer)
          this.data.intervalTimer = null
        }
      }, this.data.intervalTime)
      this.showTimeout()
    },
    remove() {
      if (this.empty()) return
      const item = `currentQueue[0].show`
      this.setData({
        [item]: 'out'
      })
      const dequeueTimer = setTimeout(() => {
        this.dequeue()
      }, 300)
    },
    // 删除队首的元素
    dequeue() {
      if (this.empty()) return
      this.data.currentQueue.shift()
      const oldQueue = this.data.currentQueue.map((item, index) => {
        return {
          ...item,
          show: item.show === 'out' ? 'out' : ''
        }
      })
      if (this.data.waitQueue.length !== 0) {
        oldQueue.push(this.data.waitQueue[0])
        this.data.waitQueue.shift()
        this.showTimeout()
      }
      this.setData({
        currentQueue: oldQueue,
        waitQueue: this.data.waitQueue
      })
    },
    fill() {
      return this.data.currentQueue.length === this.data.len
    },
    empty() {
      return this.data.currentQueue.length === 0
    },
    clear() {
      this.setData({
        currentQueue: [],
        waitQueue: [],
        dequeueTimer: []
      })
    },
    showTimeout() {
      const showTimer = setTimeout(() => {
        this.remove()
      }, this.data.showGiftTime)
    }
  }
})
