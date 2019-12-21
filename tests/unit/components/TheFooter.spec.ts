import Vue from 'vue';
import Vuetify from 'vuetify';

import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';

import TheFooter from '@/components/TheFooter.vue';


Vue.use(Vuetify);

const localVue = createLocalVue();


describe('TheFooter', () => {
  let wrapper = shallowMount(TheFooter);

  beforeEach(() => {
    wrapper = shallowMount(TheFooter, {
      localVue,
    });
  });

  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
