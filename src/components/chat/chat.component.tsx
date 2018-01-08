import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import './chat.component.styl'
import store from '../../stores/store'
import Dialog from '../../shared/dialog'
import { UserInfo, MessageInfo } from '../../types/model'
import MsgItem from '../msg-item/msg-item.component'
import chatService from '../../services/chat.service'
import UserItem from '../user-item/user-item.component'

@Component
export default class Chat extends Vue {
  @Prop()
  mine: UserInfo

  current: UserInfo = {
    uid: 0,
    name: ''
  }

  created() {
    this.initContact()
  }

  initContact() {
    if (store.contacts.length > 0) {
      for (let i = 0; i < store.contacts.length; i++) {
        if (store.contacts[i].uid !== this.mine.uid) {
          this.current = store.contacts[i]
          break
        }
      }
    }
  }

  render(h: CreateElement) {
    let key = chatService.getChatUserKey(this.current.uid, this.mine.uid)
    let record = store.records[key]
    let messageRender = record ? (
      store.records[key].map(item => (
        <MsgItem isRight={item.user.uid == this.mine.uid} message={item}></MsgItem>
      ))
    ) : null
    return (
      <div chat-component on-click={this.selectForm.bind(this)}>
        <Dialog on-sendMsg={this.sendMsg.bind(this)} showRight={store.contacts.length > 1} class={{mostTop: this.mine.uid === store.current}}>
          <div class="title-img" slot="top">
            <div class="left-box">
              <img src={require('../../assets/img/user.png')} />
              <span>{this.mine.name}</span>
            </div>
            <span class="close" title="关闭" on-click={this.close.bind(this)}></span>
          </div>
          {store.contacts.map(item => {
            if (item.uid !== this.mine.uid) return (
              <UserItem user={item}
              message={this.getMessage(item.uid)}
              active={item.uid == this.current.uid}
              on-select={this.select.bind(this)} slot="left" />
            )
          })}
          <div slot="right">{messageRender}</div>
        </Dialog>
      </div>
    )
  }

  getMessage(uid: number) {
    let key = chatService.getChatUserKey(uid, this.mine.uid)
    let record = store.records[key]
    return record ? record[record.length - 1].content : ''
  }

  sendMsg(text: string) {
    if (text.length == 0) return
    text = chatService.replaceURL(text)
    let key = chatService.getChatUserKey(this.mine.uid, this.current.uid)
    if (!store.records[key]) store.records[key] = []
    store.records[key].push({
      user: this.mine,
      content: text,
      time: Date.now()
    })
    store.records = Object.assign({}, store.records)
  }

  select(user: UserInfo) {
    this.current = user
  }

  close() {
    this.$emit('close', this.mine)
    this.initContact()
  }

  selectForm() {
    store.current = this.mine.uid
  }

}