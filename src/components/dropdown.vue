<template>
  <div ref="root" class="dropdown-component">
    <div>
      {{ text }}
      <label>
        <input
          :class="[
            { 'readonly' : !options.filter },
            { 'open': isOpen },
          ]"
          type="text"
          v-model="searchText"
          :placeholder="options.placeholder"
          :readonly="options.filter === false"
          @keyup.enter="selectFirstItem"
          @input="handleFilter($event.target.value)"
          @click="handleOpen(!isOpen)"
        >
      </label>
      <div v-if="isOpen" class="dropdown-list" :style="{ 'height': `${containerHeight}px`}">
        <template v-if="filteredOptions.length">
          <span
            v-for="(item, index) in filteredOptions"
            :key="index"
            class="option clickable"
            :class="{ 'selected': isSelected(item) }"
            @click="handleChange(item)"
          >
            {{ item[valueKey] }}
          </span>
        </template>
        <span v-else class="no-results">
          No results.
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  // eslint-disable-next-line no-unused-vars
  computed, ref, onMounted, onBeforeUnmount, Ref
} from 'vue';
// eslint-disable-next-line no-unused-vars
import { iOptionsListFilter } from '@/interfaces/form.d.ts';

import useApi from '@/composites/useApi.ts';

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
      type: Object
    },
    options: {
      type: Object as () => iOptionsListFilter,
      default: {}
    }
  },
  emits: [
    'set',
    'update:modelValue'
  ],
  setup(props, { emit }) {
    // eslint-disable-next-line prefer-destructuring
    const options: iOptionsListFilter = props.options;

    const { list, api } = options;

    const windowHeight: Ref = ref(window.innerHeight);

    const data: Ref = ref([]);

    if (typeof api === 'object') {
      useApi(api).then((response: any) => { data.value = response; });
    }
    else {
      data.value = list;
    };

    const root: Ref = ref(null);
    const isOpen: Ref = ref(false);
    const searchText: Ref = ref('');
    const idKey = options.keys ? options.keys.id : 'id';
    const valueKey = options.keys ? options.keys.value : 'value';

    const handleFilter = (value: string) => {
      searchText.value = value;
    };

    const handleOpen = (value: boolean) => {
      if (value) {
        searchText.value = '';
      }
      isOpen.value = value;
    };

    const handleChange = (value: any) => {
      searchText.value = value[valueKey];
      handleOpen(false);
      emit('set', props.property, value, true);
    };

    const filteredOptions = computed(() => data.value.filter(
      // eslint-disable-next-line max-len
      (item: any) => searchText.value.toLowerCase() === '' || item[valueKey].toLowerCase().includes(searchText.value.toLowerCase())
    ));

    const selectFirstItem = () => {
      if (filteredOptions.value.length > 0 && isOpen.value) {
        handleChange(filteredOptions.value[0]);
      };
    };

    const isSelected = (item: any) => props.value && item[idKey] === props.value[idKey];

    let clickOutside;

    onMounted(() => {
      clickOutside = (event: Event) => {
        if (root.value !== event.target && !root.value.contains(event.target)) {
          handleOpen(false);
          event.stopPropagation();
        }
      };
      window.addEventListener('click', clickOutside);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('click', clickOutside);
    });

    if (typeof options.default !== 'undefined') {
      let item: any;

      if (typeof options.default === 'object') {
        // eslint-disable-next-line max-len
        item = data.value.find((obj: any) => Object.keys(options.default).every((key: string) => obj[key] === options.default[key]));
      }
      else {
        item = data.value[options.default];
      }

      if (item) {
        handleChange(item);
      }
    }

    const containerHeight = computed(() => windowHeight.value / 3);

    return {
      containerHeight,
      filteredOptions,
      handleChange,
      handleFilter,
      handleOpen,
      isSelected,
      isOpen,
      searchText,
      selectFirstItem,
      root,
      valueKey
    };
  }
};

</script>
