import {
  ComputedRef, Ref, ref
} from 'vue';

export default function useControls(
  emit: Function,
  currentIndex: Ref,
  currentProperty: ComputedRef,
  currentValid: ComputedRef,
  data: any,
) {
  const failed = ref(false);

  const onFailed = () => {
    failed.value = true;
  };

  const onSuccess = () => {
    failed.value = false;
  };

  const incrementProperty = (increment: number) => {
    currentIndex.value += increment;
  };

  const previous = () => {
    incrementProperty(-1);
    emit('previous');
    onSuccess();
  };

  const next = () => {
    emit('next', currentValid.value);

    if ((currentValid.value === null && !currentProperty.value.required) || currentValid.value === true) {
      incrementProperty(1);
      emit('update:modelValue', { ...data });
      onSuccess();
    }
    else {
      onFailed();
    }
  };

  const skip = () => {
    emit('skip', currentProperty.value.required);

    if (!currentProperty.value.required) {
      delete data[currentProperty.value.property];
      incrementProperty(1);
      onSuccess();
    }
    else {
      onFailed();
    }
  };

  const submit = () => {
    if ((currentValid.value === null && !currentProperty.value.required) || currentValid.value === true) {
      emit('update:modelValue', { ...data });
      onSuccess();
    }
    else {
      onFailed();
    }
    emit('submit', currentValid.value);
  };

  return {
    go: {
      previous, next, skip, submit
    },
    failed
  };
}
