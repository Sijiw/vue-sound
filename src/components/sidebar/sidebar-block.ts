import { ExtractPropTypes, PropType } from 'vue'

export type SidebarBlockProps = ExtractPropTypes<typeof sidebarBlockProps>
export const sidebarBlockProps = {
  title: {
    type: String,
    default: ''
  },
  items: {
    type: Array as PropType<string[]>,
    default: []
  }
}
