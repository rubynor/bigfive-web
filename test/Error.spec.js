import { mount } from '@vue/test-utils'
import Error from '@/components/Error.vue'

describe('Error', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Error)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
