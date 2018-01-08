import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import './msg-item.component.styl'
import { MessageInfo } from '../../types/model'
import chatService from '../../services/chat.service'

@Component
export default class MsgItem extends Vue {
  @Prop()
  message: MessageInfo
  @Prop({
    default() { return false }
  })
  isRight: boolean

  render(h: CreateElement) {
    return (
      <div msg-item-component class={{'right-item': this.isRight}}>
        <div class="user-img"><img src={require('../../assets/img/user.png')}/></div>
        <div class="content-box">
          <div class="user-tip">
            <span>{this.message.user.name}</span>
            <span>{chatService.formatDate(this.message.time, 'hh:mm:ss')}</span>
          </div>
          <div class="content" domPropsInnerHTML={this.message.content}></div>
        </div>
      </div>
    )
  }

}