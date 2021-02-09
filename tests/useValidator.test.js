import useValidator from '@/composites/useValidator';

describe('useValidator composite', () => {
  describe('text validation', () => {
    describe('default error messages', () => {
      const isValid = useValidator({
        type: 'text',
        validations: {
          min: {
            value: 3
          },
          max: {
            value: 10
          },
          regex: {
            value: /^[a-zA-Z]+$/
          }

        }
      })

      it('should return true if string is null', () => {
        expect(isValid('')).toBe(true);
      })

      it('should return error if value is not long enough', () => {
        const valid = isValid('ss');
        expect(valid).toHaveProperty('errors');
        expect(valid.errors.length).toEqual(1);
      })

      it('should return error if value is too long', () => {
        const valid = isValid('ssssssssssssssss');
        expect(valid).toHaveProperty('errors');
        expect(valid.errors.length).toEqual(1);
      })

      it('should return error if value doesnt match regex', () => {
        const valid = isValid('ss33ss');
        expect(valid).toHaveProperty('errors');
        expect(valid.errors.length).toEqual(1);
      })
    })

    describe('custom error messages', () => {
      const isValid = useValidator({
        type: 'text',
        validations: {
          min: {
            value: 3,
            message: 'Min 1'
          },
          max: {
            value: 10,
            message: 'Max 2'
          },
          regex: {
            value: /^[a-zA-Z]+$/,
            message: 'Letters only'
          }

        }
      })

      it('should return custom error if value is not long enough', () => {
        const valid = isValid('ss');
        expect(valid).toHaveProperty('errors');
        expect(valid.errors[0]).toEqual('Min 1');
      })

      it('should return custom error if value is too long', () => {
        const valid = isValid('ssssssssssssssss');
        expect(valid).toHaveProperty('errors');
        expect(valid.errors[0]).toEqual('Max 2');
      })

      it('should return custom error if value doesnt match regex', () => {
        const valid = isValid('ss33ss');
        expect(valid).toHaveProperty('errors');
        expect(valid.errors[0]).toEqual('Letters only');
      })
    })
  })

  describe('email validation', () => {
    describe('default error messages', () => {
      const isValid = useValidator({
        type: 'email'
      })
      
      it('should return true if string is null', () => {
        expect(isValid('')).toBe(true);
      })

      it('should validate email with default settings', () => {
        expect(isValid('a@b.com')).toEqual(true);
      })

      it('should return error if value doesnt match email', () => {
        const valid = isValid('asd')
        expect(valid).toHaveProperty('errors');
        expect(valid.errors.length).toEqual(1);
      })

    })

    describe('default error messages', () => {
      const isValid = useValidator({
        type: 'email',
        validations: {
          regex: {
            value: /^\S+@\S+\.\S+$/,
            message: 'not valid'
          }
        }
      })

      it('should return error if value doesnt match email', () => {
        const valid = isValid('asd')
        expect(valid).toHaveProperty('errors');
        expect(valid.errors[0]).toEqual('not valid');
      })

    })
  })

  describe('number validation', () => {
    describe('default error messages', () => {
      const isValid = useValidator({
        type: 'number',
        validations: {
          min: {
            value: 3
          },
          max: {
            value: 10
          },
          wholeNumber: {
            value: true
          }
        }
      })

      it('should return true if string is null', () => {
        expect(isValid('')).toBe(true);
      })
  
      it('should return error if input is not numeric', () => {
        const valid = isValid('saa');
        expect(valid).toHaveProperty('errors');
        expect(valid.errors.length).toEqual(1);
      })
  
      it('should return error if value is not large enough', () => {
        const valid = isValid(2);
        expect(valid).toHaveProperty('errors');
        expect(valid.errors.length).toEqual(1);
      })
  
      it('should return error if value is too large', () => {
        const valid = isValid(11);
        expect(valid).toHaveProperty('errors');
        expect(valid.errors.length).toEqual(1);
      })
  
      it('should return error if number is not whiole', () => {
        const valid = isValid(7.2);
        expect(valid).toHaveProperty('errors');
        expect(valid.errors.length).toEqual(1);
      })
    })

    describe('default error messages', () => {
      const isValid = useValidator({
        type: 'number',
        validations: {
          min: {
            value: 3,
            message: 'Min'
          },
          max: {
            value: 10,
            message: 'Max'
          },
          wholeNumber: {
            value: false,
            message: 'whole number not required'
          }
        }
      })

      it('should return error if value is not large enough', () => {
        const valid = isValid(2);
        expect(valid).toHaveProperty('errors');
        expect(valid.errors[0]).toEqual('Min');
      })

      it('should return error if value is too large', () => {
        const valid = isValid(11);
        expect(valid).toHaveProperty('errors');
        expect(valid.errors[0]).toEqual('Max');
      })

      it('should not return error if whole number is allowed', () => {
        expect(isValid(7.2)).toEqual(true);
      })
    })
  
  })

  describe('default case', () => {
    it('should return true if validation type not configured', () => {
      const isValid = useValidator({
        type: 'not-configured'
      })
      expect(isValid()).toEqual(true);
    })
  })
  
});