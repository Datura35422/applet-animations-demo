const util = require('../../utils/util.js')

Page({
  data: {
    gift: {},
    num: 20,
    improve: false
  },
  customData: {
    imageUrl: [
      'https://images.daqinjia.cn/qlive/971d8248-b361-11e9-85f1-8c89a53fe892.png',
      'https://images.daqinjia.cn/qlive/96f5121e-b361-11e9-920b-8c89a53fe892.png',
      'https://images.daqinjia.cn/qlive/9726831a-b361-11e9-8171-8c89a53fe892.png',
      'https://images.daqinjia.cn/qlive/9721ef28-b361-11e9-9015-8c89a53fe892.png',
      'https://images.daqinjia.cn/qlive/97137002-b361-11e9-b166-8c89a53fe892.png',
      'https://images.daqinjia.cn/qlive/9719ffca-b361-11e9-a76c-8c89a53fe892.png',
      'https://images.daqinjia.cn/qlive/9701956e-b361-11e9-be4a-8c89a53fe892.png',
      'https://images.daqinjia.cn/qlive/9716cb6e-b361-11e9-886f-8c89a53fe892.png'
    ]
  },
 
  // -------------------------------------------------------------
  // 赠送礼物
  addGift() {
    const random = util.random(8)
    const imageUrl = this.customData.imageUrl
    this.setData({
      gift: {
        "id": 1,
        "giftName": random,
        "giftUrl": imageUrl[Math.floor(Math.random() * imageUrl.length)],
        "gold": 18,
        "effect": "",
        "sendName": random,
        "random": random // view列表渲染时做唯一标识使用，初衷为防止多次显示同一礼物，或遗漏显示某一礼物
      }
    })
  },
  asyncSend() {
    const num = this.data.num
    const imageUrl = this.customData.imageUrl
    for(let i = 0; i < num; i++) {
      const random = util.random(8)
      this.setData({
        gift: {
          "id": i,
          "giftName": random,
          "giftUrl": imageUrl[Math.floor(Math.random() * imageUrl.length)],
          "gold": 18,
          "effect": "",
          "sendName": random,
          "random": random // view列表渲染时做唯一标识使用，初衷为防止多次显示同一礼物，或遗漏显示某一礼物
        }
      })
    }
  },
  checkboxChange(e) {
    this.setData({
      improve: !this.data.improve
    })
  }
})
