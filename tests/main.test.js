import { mount, shallowMount } from '@vue/test-utils';

import VueFormWizard from '@/components/main.vue';

import form from './form';

let wrapper;
let originalGlobals = {};

const createWrapper = (props, slots, method = shallowMount) => {
  return method(VueFormWizard, {
    propsData: {
      ...props
    },
    slots
  });
}

beforeAll(() => {
  originalGlobals.consoleWarn = global.console.warn;
  global.console.warn = jest.fn();
});

afterAll(() => {
  global.console.warn = originalGlobals.consoleWarn;
})

beforeEach(() => {
});

afterEach(() => {
  wrapper.unmount();
});

describe('Component', () => {
  it('Should be a Vue instance', () => {
    wrapper = createWrapper();
    expect(wrapper.vm).toBeTruthy();
    // warn for required prop
    expect(global.console.warn).toHaveBeenCalledTimes(1);
  });

  describe('form', () => {

    it('should render form', () => {
      wrapper = createWrapper({
        form: form.textInput
      });
      expect(wrapper.vm.currentIndex).toEqual(0);
    });

    it('should not render form with empty array', () => {
      wrapper = createWrapper({
        form: []
      });
      expect(wrapper.vm).toBeTruthy();
    });
    
    it('should render form at correct position when startAt is passed', () => {
      wrapper = createWrapper({
        form: form.textInput.concat(form.numberInput),
        startAt: 1
      });
      expect(wrapper.vm.currentIndex).toEqual(1);
    })

    it('should replace the default component when a named slot is passed', () => {
      wrapper = createWrapper({
        form: form.textInput,
      }, {
        input: `
          <template #input="item">
            <div class="text">{{ item.text }}</div>
          </template>
        `
      }, mount); 
      expect(wrapper.findAll('.text').length).toEqual(1);
    })

    it('should create a custom slot when an unknown slot type is passed', () => {
      wrapper = createWrapper({
        form: [{ type: 'custom-input', text: 'test'}],
      }, {
        'custom-input': `
          <template #custom-input="item">
            <div class="text">{{ item.text }}</div>
          </template>
        `
      }, mount);
      expect(wrapper.findAll('.text').length).toEqual(1);
    })

    it('should render errors after clicking next', async () => {
      wrapper = createWrapper({
        form: [{ type: 'custom-input', text: 'test' }],
      }, {
        'custom-input': `
          <template #custom-input="item">
            <div class="text" @click="item.set(item.property, 'ss', { errors: ['error'] })">{{ item.text }}</div>
          </template>
        `
      }, mount);
      await wrapper.find('.text').trigger('click');
      await wrapper.findAll('button').filter((el) => el.text() === 'Submit')[0].trigger('click');
      expect(wrapper.vm.currentIndex).toEqual(0);
      expect(wrapper.findAll('.error-container div').length).toEqual(1);
    })

  })

  describe('previous button', () => {
    it('should be disabled on first question', () => {
      wrapper = createWrapper({
        form: form.textInput.concat(form.numberInput)
      });
      expect(wrapper.findAll('button').filter((el) => el.text() === 'Previous')[0].element.disabled).toEqual(true);
    })

    it('should be enabled on subsequent questions and go to previous question on click', () => {
      wrapper = createWrapper({
        form: form.textInput.concat(form.numberInput),
        startAt: 1
      });
      const previous = wrapper.findAll('button').filter((el) => el.text() === 'Previous')[0];
      expect(previous.element.disabled).toEqual(false);
      previous.trigger('click');
      expect(wrapper.vm.currentIndex).toEqual(0);
      expect(wrapper.emitted()).toHaveProperty('previous');
    })
  })

  describe('next button', () => {
    it('should not be rendered on the last option', () => {
      wrapper = createWrapper({
        form: form.textInput
      });
      expect(wrapper.findAll('button').filter((el) => el.text() === 'Next').length).toEqual(0);
    });

    it('should be disabled when value is unset and allow navigation', () => {
      wrapper = createWrapper({
        form: form.textInput.concat(form.numberInput)
      });
      expect(wrapper.findAll('button').filter((el) => el.text() === 'Next')[0].element.disabled).toEqual(true);
    });

    it('should prevent navigation if validation fails', () => {
      wrapper = createWrapper({
        form: form.textInput.concat(form.numberInput),
        modelValue: {
          [form.textInput[0].property]: { "value": "tt", "valid": { error: ['Error occured' ] } }
        }
      });
      const next = wrapper.findAll('button').filter((el) => el.text() === 'Next')[0];
      expect(next.element.disabled).toEqual(false);
      next.trigger('click');
      expect(wrapper.vm.currentIndex).toEqual(0);
      expect(wrapper.emitted()).toHaveProperty('next');
      expect(wrapper.emitted()).not.toHaveProperty('update:modelValue');
    });

    it('should be enabled when value is present and move to the next question on click', () => {
      wrapper = createWrapper({
        form: form.textInput.concat(form.numberInput),
        modelValue: {
          [form.textInput[0].property]: { "value": "test", "valid": true }
        }
      });
      const next = wrapper.findAll('button').filter((el) => el.text() === 'Next')[0];
      expect(next.element.disabled).toEqual(false);
      next.trigger('click');
      expect(wrapper.vm.currentIndex).toEqual(1);
      expect(wrapper.emitted()).toHaveProperty('next');
      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    });

    it('should not call next if custom button is used with a required field and null value', () => {
      wrapper = createWrapper({
        form: [{ ...form.textInput[0], required: true }].concat(form.numberInput)
      }, {
        controls: `
          <template #controls="item">
            <button @click="item.controls.next.go">Alt Next</button>
          </template>
        `
      }, mount);
      const next = wrapper.findAll('button').filter((el) => el.text() === 'Alt Next')[0];
      next.trigger('click');
      expect(wrapper.vm.currentIndex).toEqual(0);
      expect(wrapper.emitted()).not.toHaveProperty('update:modelValue');
    })
  })

  describe('skip button', () => {
    it('should be enabled by default and move to the next question on click', () => {
      wrapper = createWrapper({
        form: form.textInput.concat(form.numberInput)
      });
      const skip = wrapper.findAll('button').filter((el) => el.text() === 'Skip')[0];
      expect(skip.element.disabled).toEqual(false);
      skip.trigger('click');
      expect(wrapper.vm.currentIndex).toEqual(1);
      expect(wrapper.emitted()).toHaveProperty('skip');
    })

    it('should be disabled if required is true', () => {
      wrapper = createWrapper({
        form: [{ ...form.textInput[0], required: true }].concat(form.numberInput)
      });
      expect(wrapper.findAll('button').filter((el) => el.text() === 'Skip')[0].element.disabled).toEqual(true);
    })

    it('should be disabled if on the last question', () => {
      wrapper = createWrapper({
        form: form.textInput
      });
      expect(wrapper.findAll('button').filter((el) => el.text() === 'Skip')[0].element.disabled).toEqual(true);
    })

    it('should not call skip if custom button is used with a required field and null value', () => {
      wrapper = createWrapper({
        form: [{ ...form.textInput[0], required: true }].concat(form.numberInput)
      }, {
        controls: `
          <template #controls="item">
            <button @click="item.controls.skip.go">Alt Skip</button>
          </template>
        `
      }, mount);
      const skip = wrapper.findAll('button').filter((el) => el.text() === 'Alt Skip')[0];
      skip.trigger('click');
      expect(wrapper.vm.currentIndex).toEqual(0);
    })
  })

  describe('submit button', () => {
    it('should render on the last question and be enabled if no value', () => {
      wrapper = createWrapper({
        form: form.textInput
      });
      const found = wrapper.findAll('button').filter((el) => el.text() === 'Submit')
      expect(found.length).toEqual(1);
      expect(found[0].element.disabled).toEqual(false);
    })

    it('should render on the last question and be disabled if no value and required equals true', () => {
      wrapper = createWrapper({
        form: [{
          ...form.textInput[0], 
          required: true
        }],
      });
      const found = wrapper.findAll('button').filter((el) => el.text() === 'Submit')
      expect(found.length).toEqual(1);
      expect(found[0].element.disabled).toEqual(true);
    })

    it('should render on the last question and submit on click', () => {
      wrapper = createWrapper({
        form: form.textInput,
        modelValue: {
          [form.textInput[0].property]: { "value": "test", "valid": true }
        }
      });
      const found = wrapper.findAll('button').filter((el) => el.text() === 'Submit');
      expect(found.length).toEqual(1);
      found[0].trigger('click');
      expect(wrapper.emitted()).toHaveProperty('submit');
      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    })

    it('should not render on any other question', () => {
      wrapper = createWrapper({
        form: form.textInput.concat(form.numberInput)
      });
      expect(wrapper.findAll('button').filter((el) => el.text() === 'Submit').length).toEqual(0);
    })

    it('should not call submit if custom button is used with a required field and null value', () => {
      wrapper = createWrapper({
        form: [{ ...form.textInput[0], required: true }]
      }, {
        controls: `
          <template #controls="item">
            <button @click="item.controls.submit.go">Alt Submit</button>
          </template>
        `
      }, mount);
      const submit = wrapper.findAll('button').filter((el) => el.text() === 'Alt Submit')[0];
      submit.trigger('click');
      expect(wrapper.emitted()).not.toHaveProperty('update:modelValue');
    })
  })

});
