import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Toolbar from '@/components/Toolbar.vue'

describe('Toolbar.vue', () => {
  it('contains all expected elements', () => {
    const wrapper = shallowMount(Toolbar, {})
    expect(wrapper.text()).to.include('Home')
    expect(wrapper.text()).to.include('Articles')
    expect(wrapper.text()).to.include('Privacy')
    expect(wrapper.text()).to.include('About')
  })
})
