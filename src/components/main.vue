<template>
  <div v-if="Array.isArray(form) && form.length" class="vue-form-wizard">
    <slot
      :name="currentProperty.type"
      :key="currentIndex"
      :index="currentIndex"
      :text="currentProperty.text"
      :property="currentProperty.property"
      :value="currentValue"
      :options="currentProperty.options"
      :set="setProperty"
    >
      <div class="property-container">
        <component
          :key="currentIndex"
          :is="getComponent()"
          :text="currentProperty.text"
          :property="currentProperty.property"
          :value="currentValue"
          :options="currentProperty.options"
          @set="setProperty"
        />
      </div>
    </slot>

    <slot
      v-if="showErrors && currentValid"
      name="error"
      :errors="currentValid.errors"
    >
      <div class="error-container">
        <div v-for="(error, index) in currentValid.errors" :key="index">
          {{ error }}
        </div>
      </div>
    </slot>

    <slot
      name="controls"
      :key="currentIndex"
      :index="currentIndex"
      :controls="controls"
    >
      <div class="control-container">
        <button @click="controls.previous.go" :disabled="controls.previous.isDisabled">Previous</button>
        <button @click="controls.skip.go" :disabled="controls.skip.isDisabled">Skip</button>
        <button v-if="!isLastProperty" @click="controls.next.go" :disabled="controls.next.isDisabled">Next</button>
        <button v-else @click="controls.submit.go" :disabled="controls.submit.isDisabled">Submit</button>
      </div>
    </slot>

  </div>
</template>

<script lang="ts">
import { computed, ref, reactive } from 'vue';

// inputs
import Input from './input.vue';
import DropDown from './dropdown.vue';
import Options from './options.vue';
import Textarea from './textarea.vue';

// composites
import useControls from '@/composites/useControls';

// interfaces
import { iProperties } from '@/interfaces/form';

export default {
  name: 'VueFormWizard',
  props: {
    form: {
      type: Array as () => iProperties[],
      required: true
    },
    startAt: {
      type: Number,
      default: 0
    },
    modelValue: {
      type: Object,
      default: {}
    }
  },
  components: {
    Input,
    DropDown,
    Options,
    Textarea
  },
  methods: {
    getComponent() {
      return {
        'input': Input,
        'dropdown': DropDown,
        'options': Options,
        'textarea': Textarea
        // @ts-ignore
      }[this.currentProperty.type.toLowerCase()]
    }
  },
  emits: [
    'next',
    'skip',
    'previous',
    'submit',
    'update:modelValue'
  ],
  data() {
    return {
    }
  },
  setup(props, { emit }) {
    if (!Array.isArray(props.form) || !props.form.length) {
      return {};
    }

    let data = reactive(props.modelValue);

    let currentIndex = ref(props.startAt);

    const getProperty = () => props.form[currentIndex.value];
    const getData = () => data[getProperty().property] || { value: null, valid: null };

    const currentProperty = computed(() => getProperty());
    const currentValue = computed(() => getData().value);
    const currentValid = computed(() => getData().valid);
    const isFirstProperty = computed(() => currentIndex.value === 0);
    const isLastProperty = computed(() => currentIndex.value === props.form.length - 1)

    const { go, failed } = useControls(emit, currentIndex, currentProperty, currentValid, data);

    const controls = reactive({
      previous: {
        go: go.previous,
        isDisabled: computed(() => isFirstProperty.value)
      },
      skip: {
        go: go.skip,
        isDisabled: computed(() => isLastProperty.value || currentProperty.value.required)
      },
      next: {
        go: go.next,
        isDisabled: computed(() => !currentValue.value)
      },
      submit: {
        go: go.submit,
        isDisabled: computed(() => currentProperty.value.required && !currentValue.value)
      }
    })

    const setProperty = (property: string, value: any, valid: boolean | { errors: [] }) => {
      data[property] = {
        value, valid
      }
    };

    return {
      controls,
      data,
      currentIndex,
      currentProperty,
      currentValue,
      currentValid,
      isFirstProperty,
      isLastProperty,
      setProperty,
      showErrors: failed
    }
  }
};

</script>

<style lang="scss">
  @import "src/sass/main.scss";
</style>
