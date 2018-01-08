import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import './style.styl'

@Component
export default class Dialog extends Vue {
  static count: number = 0
  @Prop({
    default() { return 680 }
  })
  width: number
  @Prop({
    default() { return 580 }
  })
  height: number
  @Prop({
    default() { return false }
  })
  showRight: boolean
  
  top: number = 0
  left: number = 0
  dx: number = 0
  dy: number = 0
  mx: number = 0
  my: number = 0
  value: string = ''
  canMove: boolean = false

  created() {
    Dialog.count++
    this.top = 60 * Dialog.count
    this.left = 60 * Dialog.count
  }

  render(h: CreateElement) {
    let dialobStyle = {
      width: this.width + 'px',
      height: this.height + 'px',
      top: this.top + 'px',
      left: this.left + 'px'
    }
    this.moveToBottom()

    return (
      <div class="dialog-box" style={dialobStyle}>
        <div class="dialog-title"
          style={{cursor: this.canMove ? 'move' : 'default'}}
          on-mousedown={this.mousedown.bind(this)}
          on-mouseup={this.mouseup.bind(this)}>
          {this.$slots.top}
        </div>
        <div class="dialog-content">
          <div class="left-list">{this.$slots.left}</div>
          {this.showRight && <div class="right-msg">
            <div class="msg-content" ref="rightBox">{this.$slots.right}</div>
            <div class="msg-edit">
              <div class="edit-box">
                <textarea value={this.value}
                 placeholder="请输入内容"
                 on-input={(event:Event)=>this.value = (event.target as HTMLInputElement).value}/>
              </div>
              <div class="edit-btn">
                <a href="javascrip:void(0)" on-click={this.sendMsg.bind(this)}>发 送</a>
              </div>
            </div>
          </div>}
        </div>
      </div>
    )
  }

  mousedown(event: MouseEvent) {
    this.canMove = true
    this.mx = event.pageX
    this.my = event.pageY
    this.dy = this.top
    this.dx = this.left
  }

  mousemove(event: MouseEvent) {
    if (this.canMove) {
      this.top = this.dy + event.pageY - this.my
      this.left = this.dx + event.pageX - this.mx
    }
  }

  mouseup(event: MouseEvent) {
    this.canMove = false
  }

  mounted() {
    document.addEventListener('mousemove', this.mousemove)
  }

  sendMsg() {
    this.$emit('sendMsg', this.value)
    this.value = ''
  }

  moveToBottom() {
    let box = this.$refs.rightBox
    if (box) {
      let rightBox = (box as HTMLElement)
      setTimeout(() => rightBox.scrollTop = rightBox.scrollHeight, 200)
    }
  }

}