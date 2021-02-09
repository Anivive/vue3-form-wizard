import { mount, shallowMount } from '@vue/test-utils';

import VueFormWizardOptions from '@/components/options.vue';

import form from './form';

let wrapper;

const createWrapper = (props, slots, method = shallowMount) => {
  return method(VueFormWizardOptions, {
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

  let singleSelect = form.singleSelect[0];
  let multiSelect = form.multiSelect[0];

  describe('general', () => {

    it('should render single select with correct number of options', async () => {
      wrapper = createWrapper({
        text: singleSelect.text,
        property: singleSelect.property,
        options: singleSelect.options,
        value: undefined
      });
      expect(wrapper.findAll('input').length).toEqual(3);
    })

    it('should set value on selection', async () => {
      wrapper = createWrapper({
        text: singleSelect.text,
        property: singleSelect.property,
        options: singleSelect.options,
        value: undefined
      });
      const input = wrapper.findAll('input')[0];
      await input.trigger('click');
      expect(input.element.checked).toEqual(true);
      expect(wrapper.emitted()).toHaveProperty('set');
    })

    it('should allow manual key setting for list object', () => {
      const options = {
        ...singleSelect.options,
        keys: {
          id: 'value',
          value: 'id'
        }
      }
      wrapper = createWrapper({
        text: singleSelect.text,
        property: singleSelect.property,
        options: options,
        value: undefined
      });
      expect(wrapper.findAll('span')[0].text()).toEqual('1');
    })

    it('should set selected item if passed in props', () => {
      wrapper = createWrapper({
        text: singleSelect.text,
        property: singleSelect.property,
        options: singleSelect.options,
        value: [{
          ...singleSelect.options.list[0]
        }]
      });
      expect(wrapper.findAll('label')[0].classes()).toContain('selected');
    })


    it('should set default answer with integer value', async () => {
      const options = {
        ...singleSelect.options,
        default: 0
      }
      wrapper = createWrapper({
        text: singleSelect.text,
        property: singleSelect.property,
        options: options,
        value: undefined
      });
      expect(wrapper.emitted()).toHaveProperty('set');
    })


    it('should set default answer with object value', async () => {
      const options = {
        ...singleSelect.options,
        default: {
          id: 1
        }
      }
      wrapper = createWrapper({
        text: singleSelect.text,
        property: singleSelect.property,
        options: options,
        value: undefined
      });
      expect(wrapper.emitted()).toHaveProperty('set');
    })

    it('should set not error if default can not be found', async () => {
      const options = {
        ...singleSelect.options,
        default: {
          id: 5
        }
      }
      wrapper = createWrapper({
        text: singleSelect.text,
        property: singleSelect.property,
        options: options,
        value: undefined
      });
      expect(wrapper.emitted()).not.toHaveProperty('set');
    })


    it('should call api if configured', async (done) => {
      const mockSuccessResponse = [{ id: 1, value: 1 }, { id: 2, value: 2 }];
      const mockJsonPromise = Promise.resolve(mockSuccessResponse);
      const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
      });
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

      wrapper = createWrapper({
        text: form.singleSelectWithApi[0].text,
        property: form.singleSelectWithApi[0].property,
        options: form.singleSelectWithApi[0].options,
        value: undefined
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      wrapper.vm.$nextTick(async () => {
        expect(wrapper.findAll('input').length).toBeGreaterThan(1);
        global.fetch.mockClear();
        delete global.fetch;
        done();
      });
    });
  });

  describe('single select', () => {
    it('should only ever select one value', () => {
      wrapper = createWrapper({
        text: singleSelect.text,
        property: singleSelect.property,
        options: singleSelect.options,
        value: undefined
      });
      const input = wrapper.findAll('input');
      input[0].trigger('click')
      expect(wrapper.emitted().set[0][1].length).toEqual(1);
      input[1].trigger('click')
      expect(wrapper.emitted().set[1][1].length).toEqual(1);
    })
  });

  describe('multi select', () => {
    it('should only ever select one value', () => {
      wrapper = createWrapper({
        text: multiSelect.text,
        property: multiSelect.property,
        options: multiSelect.options,
        value: undefined
      });
      const input = wrapper.findAll('input');
      input[0].trigger('click')
      expect(wrapper.emitted().set[0][1].length).toEqual(1);
      input[1].trigger('click')
      expect(wrapper.emitted().set[1][1].length).toEqual(2);
      input[0].trigger('click')
      expect(wrapper.emitted().set[0][1].length).toEqual(1);
    })
  });

});