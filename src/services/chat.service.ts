class ChatService {
  getChatUserKey(first: number, second: number): string {
    let add = first + second
    let max = Math.max(first, second)
    return (add - max) + '' + max
  }

  replaceURL(url: string): string {
    let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
		return url.replace(reg, "<a href='$1$2' target='_blank'>$1$2</a>").replace(/\n/g, "<br />")
  }

  formatDate(date: number, format: string) {
    // yyyy-MM-dd hh:mm:ss
    if (!date) return ''
    let d = new Date()
    if ((date + '').length == 10) d.setTime(date * 1000)
    else d.setTime(date);
    let year = d.getFullYear(),
        month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1,
        day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
        hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
        min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(),
        second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
    if (!format) format = 'yyyy-MM-dd hh:mm:ss';
    return format.replace('yyyy', year.toString())
      .replace('MM', month.toString())
      .replace('dd', day.toString())
      .replace('hh', hour.toString())
      .replace('mm', min.toString())
      .replace('ss', second.toString())
  }
}

let chatService = new ChatService()
export default chatService