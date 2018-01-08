import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import './user-item.component.styl'
import { UserInfo } from '../../types/model'

@Component
export default class UserItem extends Vue {
  @Prop()
  user: UserInfo
  @Prop({
    default() { return false }
  })
  active: boolean
  @Prop({
    default() { return '' }
  })
  message: string

  render(h: CreateElement) {
    return (
      <div class={{'active': this.active}} user-item-component on-click={this.select.bind(this)}>
        <div class="item-box">
          <div class="item-img">
            <img src={require('../../assets/img/user.png')}/>
          </div>
          <div class="item-user">
            <div><p class="user-name">{this.user.name}</p></div>
            <div><p class="user-msg">{this.message}</p></div>
          </div>
        </div>
      </div>
    )
  }

  select() {
    this.$emit('select', this.user)
  }

}