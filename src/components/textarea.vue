<template>
  <div class="textarea-component">
    <label>
      {{ text }}
      <textarea
        :maxlength="options.maxlength"
        :placeholder="options.placeholder"
        :value="value"
        @input="handleChange($event.target.value)"
      />
    </label>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { iOptionsTextarea } from '@/interfaces/form.d.ts';

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
      type: Object as () => iOptionsTextarea,
      default: {}
    }
  },
  emits: [
    'set'
  ],
  setup(props, { emit }) {
    const handleChange = (value: string | number) => {
      emit('set', props.property, value, true);
    };

    if (typeof props.options.default !== 'undefined') {
      handleChange(props.options.default);
    }

    return {
      handleChange
    };
  }
};
</script>
