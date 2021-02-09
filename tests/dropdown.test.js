import { shallowMount } from '@vue/test-utils';

import VueFormWizardDropdown from '@/components/dropdown.vue';

import form from './form';

let wrapper;

const createWrapper = (props, slots, method = shallowMount) => {
  return method(VueFormWizardDropdown, {
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

  describe('dropdown', () => {
    let dropDown = form.dropDown[0];

    it('should render dropdown with correct number of options and show/hide correctly', async () => {
      wrapper = createWrapper({
        text: dropDown.text,
        property: dropDown.property,
        options: dropDown.options,
        value: undefined
      });
      const input = wrapper.find('input');
      await input.trigger('click');
      expect(wrapper.findAll('.dropdown-list span').length).toEqual(3);
      await input.trigger('click');
      expect(wrapper.find('.dropdown-list')).toBeNull;
      await input.trigger('click');
      expect(wrapper.findAll('.dropdown-list span').length).toEqual(3);
      document.body.click();
      expect(wrapper.find('.dropdown-list')).toBeNull;
    })

    it('should set value on selection', async () => {
      wrapper = createWrapper({
        text: dropDown.text,
        property: dropDown.property,
        options: dropDown.options,
        value: undefined
      });
      await wrapper.find('input').trigger('click');
      await wrapper.findAll('.dropdown-list span')[0].trigger('click');
      expect(wrapper.emitted()).toHaveProperty('set');
    })

    it('should filter values on selection', async () => {
      wrapper = createWrapper({
        text: dropDown.text,
        property: dropDown.property,
        options: dropDown.options,
        value: undefined
      });
      await wrapper.find('input').trigger('click');
      await wrapper.find('input').setValue('second')
      expect(wrapper.findAll('.dropdown-list span').length).toEqual(1);
    })

    it('should set first option on pressing enter button', async () => {
      wrapper = createWrapper({
        text: dropDown.text,
        property: dropDown.property,
        options: dropDown.options,
        value: undefined
      });
      const input = wrapper.find('input');
      await input.trigger('click');
      await input.setValue('second');
      expect(wrapper.findAll('.dropdown-list span').length).toEqual(1);
      await input.trigger('keyup.enter');
      expect(wrapper.emitted()).toHaveProperty('set');
    })

    it('should not error on pressing enter if no options available', async () => {
      wrapper = createWrapper({
        text: dropDown.text,
        property: dropDown.property,
        options: dropDown.options,
        value: undefined
      });
      const input = wrapper.find('input');
      await input.trigger('click');
      await input.setValue('zzzzzzzz');
      expect(wrapper.findAll('.dropdown-list span').length).toEqual(1);
      expect(wrapper.findAll('.dropdown-list span')[0].classes()).not.toContain('clickable');
      await input.trigger('keyup.enter');
      expect(wrapper.emitted()).not.toHaveProperty('set');
    })

    it('should allow manual key setting for list object', async () => {
      const options = {
        ...dropDown.options,
        keys: {
          id: 'value',
          value: 'id'
        }
      }
      wrapper = createWrapper({
        text: dropDown.text,
        property: dropDown.property,
        options: options,
        value: undefined
      });
      await wrapper.find('input').trigger('click');
      expect(wrapper.findAll('.dropdown-list span')[0].text()).toEqual('1');
    })

    it('should set selected item if passed in props', async () => {
      wrapper = createWrapper({
        text: dropDown.text,
        property: dropDown.property,
        options: dropDown.options,
        value: {
          ...dropDown.options.list[0]
        }
      });
      await wrapper.find('input').trigger('click');
      expect(wrapper.findAll('.dropdown-list span')[0].classes()).toContain('selected');
    })

    it('should set default answer with integer value', async () => {
      const options = {
        ...dropDown.options, 
        default: 0
      }
      wrapper = createWrapper({
        text: dropDown.text,
        property: dropDown.property,
        options: options,
        value: undefined
      });
      expect(wrapper.emitted()).toHaveProperty('set');
    })

    it('should set default answer with object value', async () => {
      const options = {
        ...dropDown.options,
        default: {
          id: 1
        }
      }
      wrapper = createWrapper({
        text: dropDown.text,
        property: dropDown.property,
        options: options,
        value: undefined
      });
      expect(wrapper.emitted()).toHaveProperty('set');
    })

    it('should set not error if default can not be found', async () => {
      const options = {
        ...dropDown.options,
        default: {
          id: 5
        }
      }
      wrapper = createWrapper({
        text: dropDown.text,
        property: dropDown.property,
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
        text: form.dropDownWithApi[0].text,
        property: form.dropDownWithApi[0].property,
        options: form.dropDownWithApi[0].options,
        value: undefined
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      
      await wrapper.vm.$nextTick();
      
      wrapper.vm.$nextTick(async () => {
        await wrapper.find('input').trigger('click');
        expect(wrapper.findAll('.dropdown-list span').length).toBeGreaterThan(1);
        global.fetch.mockClear();
        delete global.fetch;
        done();
      });
    })

  });
});
