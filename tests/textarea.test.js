import { mount, shallowMount } from '@vue/test-utils';

import VueFormWizardTextarea from '@/components/textarea.vue';

import form from './form';

let wrapper;

const createWrapper = (props, slots, method = shallowMount) => {
  return method(VueFormWizardTextarea, {
    propsData: {
      ...props
    },
    slots
  });
};

beforeEach(() => {
});

afterEach(() => {
  wrapper.unmount();
});

describe('Component', () => {
  it('Should be a Vue instance', () => {
    wrapper = createWrapper();
    expect(wrapper.vm).toBeTruthy();
  });

  describe('textarea', () => {
    it('should render textarea with correct state from options', () => {
      const options = {
        ...form.textArea[0].options,
        default: "default value"
      }
      wrapper = createWrapper({
        text: form.textArea[0].text,
        property: form.textArea[0].property,
        options: options,
        value: ''
      });
      const textarea = wrapper.find('textarea').element;
      expect(textarea).toBeDefined;
      expect(textarea.placeholder).toEqual(form.textArea[0].options.placeholder);
      expect(wrapper.emitted()).toHaveProperty('set');
      expect(wrapper.emitted().set.length).toEqual(1);
    });

    it('should update value on input', () => {
      wrapper = createWrapper({
        text: form.textArea[0].text,
        property: form.textArea.property,
        options: form.textArea[0].options,
        value: 'test'
      });
      const textarea = wrapper.find('textarea');
      expect(textarea.element.value).toEqual('test');
      textarea.setValue('test 2');
      expect(textarea.element.value).toEqual('test 2');
      expect(wrapper.emitted()).toHaveProperty('set');
      expect(wrapper.emitted().set.length).toEqual(1);
    });
  })

});