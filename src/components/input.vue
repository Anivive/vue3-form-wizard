<template>
  <div class="input-component">
    <label>
      {{ text }}
      <input
        :type="options.type"
        :placeholder="options.placeholder"
        :value="value"
        @input="handleChange($event.target.value)"
      >
    </label>
  </div>
</template>

<script lang="ts">
import useValidator from '@/composites/useValidator.ts';
// eslint-disable-next-line import/no-unresolved
import { iOptionsInput } from '@/interfaces/form';

export default {
  name: 'VueFormWizardInput',
  props: {
    text: {
      type: String
    },
    property: {
      type: String
    },
    value: {
      type: [String, Number]
    },
    options: {
      type: Object as () => iOptionsInput,
      default: {}
    }
  },
  emits: [
    'set'
  ],
  setup(props, { emit }) {
    // eslint-disable-next-line prefer-destructuring
    const options: iOptionsInput = props.options;
    const isValid = useValidator(options);

    const handleChange = (value: string | number) => {
      emit('set', props.property, value, isValid(value));
    };

    if (typeof options.default !== 'undefined') {
      handleChange(options.default);
    }

    return {
      handleChange
    };
  }
};

</script>
