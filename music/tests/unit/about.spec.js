import About from '@/views/About.vue';
import { shallowMount } from '@vue/test-utils';

describe('About.vue', () => {
  test('renders inner text', () => {
    const wrapper = shallowMount(About, {
      global: {
        mocks: {
          $t: (message) => message,
          $store: {
            registerModule: () => {},
          },
        }
      }
    });
    expect(wrapper.text()).toContain('about');
  });
});
