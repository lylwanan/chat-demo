import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode { }
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      'a': any
      'h1': any
      'div': any
      'table': any
      'tr': any
      'td': any
      'h2': any
      'h3': any
      'h4': any
      'code': any
      'span': any
      'button': any
      'img': any
      'input': any
      'i': any
      'label': any
      'select': any
      'option': any
      'strong': any
      'iframe': any
      'ul': any
      'li': any
      'br': any
      'p': any
      'em': any
      'svg': any
      'address': any
      'article': any
      'circle': any
      'textarea': any
      'template': any
      'transition': any
    }
  }
}