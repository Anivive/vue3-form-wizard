<template>
  <div class="options-component">
    {{ text }}
    <div ref="container" class="options-list" :style="{ 'height': `${containerHeight}px`}">
      <label
        v-for="(item, index) in data"
        class="clickable"
        :key="index"
        :class="{ 'selected': isSelected(item) }"
      >
        <input
          :type="options.multiSelect ? 'checkbox' : 'radio'"
          :checked="isSelected(item)"
          @change="handleChange(item)"
        >
        <span>{{ item[valueKey] }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, Ref } from 'vue';

import useApi from '@/composites/useApi.ts';

import { iOptionsList } from '@/interfaces/form.d.ts';

export default {
  name: 'VueFormWizardDropdown',
  props: {
    text: {
      type: String
    },
    property: {
      type: String
    },
    value: {
      type: Array
    },
    options: {
      type: Object as () => iOptionsList,
      default: {}
    }
  },
  emits: [
    'set',
    'update:modelValue'
  ],
  setup(props, { emit }) {
    const options: iOptionsList = props.options;
    const { list, api } = options;

    const windowHeight: Ref = ref(window.innerHeight);

    const data: Ref = ref([]);

    if (typeof api === 'object') {
      useApi(api).then((response: any) => { data.value = response; });
    }
    else {
      data.value = list;
    };

    const idKey = options.keys ? options.keys.id : 'id';
    const valueKey = options.keys ? options.keys.value : 'value';
    const selected: Ref = ref([]);

    const handleChange = (value: any) => {
      if (options.multiSelect) {
        const itemIndex = selected.value.findIndex((obj: any) => obj[idKey] === value[idKey]);

        if (itemIndex > -1) {
          selected.value.splice(itemIndex, 1);
        }
        else {
          selected.value.push(value);
        }
      }
      else {
        selected.value.splice(0, selected.value.length);
        selected.value.push(value);
      }

      emit('set', props.property, selected.value, true);
    };

    const isSelected = (item: any) => props.value && props.value.find((obj: any) => obj[idKey] === item[idKey]);

    if (typeof options.default !== 'undefined') {
      let item: any;

      if (typeof options.default === 'object') {
        item = data.value.find(
          (obj: any) => Object.keys(options.default).every((key: string) => obj[key] === options.default[key])
        );
      }
      else {
        item = data.value[options.default];
      }

      if (item) {
        handleChange(item);
      }
    }

    const containerHeight = computed(() => windowHeight.value / 2);

    return {
      containerHeight,
      data,
      handleChange,
      isSelected,
      valueKey
    };
  }
};
</script>
