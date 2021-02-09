import { mount, shallowMount } from '@vue/test-utils';

import VueFormWizardInput from '@/components/input.vue';

import form from './form';

let wrapper;

const createWrapper = (props, slots, method = shallowMount) => {
  return method(VueFormWizardInput, {
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

  describe('input', () => {
    it('should render input with correct state from options', () => {
      const options = {
        ...form.textInput[0].options,
        default: "default value"
      }
      wrapper = createWrapper({
        text: form.textInput[0].text,
        property: form.textInput[0].property,
        options: options,
        value: ''
      });
      const input = wrapper.find('input').element;
      expect(input).toBeDefined;
      expect(input.placeholder).toEqual(form.textInput[0].options.placeholder);
      expect(input.type).toEqual(form.textInput[0].options.type);
      expect(wrapper.emitted()).toHaveProperty('set');
      expect(wrapper.emitted().set.length).toEqual(1);
    });

    it('should update value on input', () => {
      wrapper = createWrapper({
        text: form.textInput[0].text,
        property: form.textInput.property,
        options: form.textInput[0].options,
        value: 'test'
      });
      const input = wrapper.find('input');
      expect(input.element.value).toEqual('test');
      input.setValue('test 2');
      expect(input.element.value).toEqual('test 2');
      expect(wrapper.emitted()).toHaveProperty('set');
      expect(wrapper.emitted().set.length).toEqual(1);
    });
  })

});