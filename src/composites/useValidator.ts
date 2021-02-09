import { iValidationsString, iValidationsNumber } from '@/interfaces/form.d.ts';

export default function useValidator(
  { type, validations = {} }
: { type: string, validations?: iValidationsString | iValidationsNumber }
) {
  const { min, max } = validations;
  const { regex } = validations as iValidationsString;
  const { wholeNumber } = validations as iValidationsNumber;

  // eslint-disable-next-line default-case
  switch (type) {
    case 'text':
      return (value: string | number) => {
        if (value === '') {
          return true;
        }

        const errors: string[] = [];
        const strValue = String(value);

        if (min && strValue.length < min.value) {
          errors.push(min.message || `Input length needs to be at least ${min.value}`);
        }

        if (max && strValue.length > max.value) {
          errors.push(max.message || `Input length needs to be less than ${max.value}`);
        }

        if (regex && regex.value.test(strValue) === false) {
          errors.push(regex.message || 'Input does not meet the format requirements');
        }

        return !errors.length || { errors };
      };

    case 'email':
      return (value: string | number) => {
        if (value === '') {
          return true;
        }

        const errors: string[] = [];
        const strValue = String(value);
        const emailRegex = regex ? regex.value : /^\S+@\S+\.\S+$/;

        if (emailRegex.test(strValue) === false) {
          errors.push(regex && regex.message ? regex.message : 'Input requires a valid email address');
        }

        return !errors.length || { errors };
      };

    case 'number':
      return (value: string | number) => {
        if (value === '') {
          return true;
        }

        const errors: string[] = [];
        const numValue = Number(value);

        if (Number.isNaN(numValue)) {
          errors.push('Input needs to be a numeric value');
        }
        else {
          if (wholeNumber && wholeNumber.value === true && !Number.isInteger(numValue)) {
            errors.push(wholeNumber.message || 'Input needs to be a whole number');
          }

          if (min && numValue < min.value) {
            errors.push(min.message || `Input needs to be at least ${min.value}`);
          }

          if (max && numValue > max.value) {
            errors.push(max.message || `Input needs to be less than ${max.value}`);
          }
        }

        return !errors.length || { errors };
      };
  }
  return () => true;
}
