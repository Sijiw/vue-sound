import { ExtractPropType } from 'element-plus/es/utils'

export type ControllerProps = ExtractPropType<typeof controllerProps>
export const controllerProps = {
  name: {
    type: String,
    default: 'Hello'
  },
  singer: {
    type: String,
    default: 'world'
  },
  musicSrc: {
    type: String,
    default: ''
  },
  picUrl: {
    type: String
  }
}
