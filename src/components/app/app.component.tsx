import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import './app.component.styl'
import store from '../../stores/store'
import { UserInfo } from '../../types/model'
import Chat from '../chat/chat.component'
import Dialog from '../../shared/dialog/index'
import chatService from '../../services/chat.service'

const USER_COUNT = 3
@Component
export default class AppComponent extends Vue {
  created() {
    for (let i = 0; i < USER_COUNT; i++) {
      store.contacts.push({
        uid: i,
        name: '测试账' + i + '号'
      })
    }
  }

  render(h: CreateElement) {
    return (
      <div chat-component>
        <span>当前窗口数：{store.contacts.length}，</span>
        <a href="javascript:void(0)" on-click={this.addFrom.bind(this)}>点我增加窗口</a>
        {store.contacts.map(item => (
          <Chat mine={item} on-close={this.close.bind(this)} />
        ))}
      </div>
    )
  }

  addFrom() {
    store.contacts.push({
      uid: Dialog.count,
      name: '测试账' + Dialog.count + '号'
    })
  }

  close(user: UserInfo) {
    let contacts: UserInfo[] = []
    store.contacts.forEach(item => {
      if (item.uid !== user.uid) {
        contacts.push(item)
        let key = chatService.getChatUserKey(item.uid, user.uid)
        delete store.records[key]
      }
    })
    Dialog.count--
    store.contacts = contacts
    store.records = Object.assign({}, store.records)
  }

}