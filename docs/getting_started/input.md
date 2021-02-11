
# Input
The available options values are described here:

```json
  "options": { 
    "type": "text" | "number" | "email",
    "placeholder": "Enter the text."
    "validations": {
      // type specific - see below
    }
  }
```

## Type
Sets the input type to the required type, this helps with validation and mobile input keyboards.

## Placeholder 
**Optional**

Presets the input with placeholder text which can be used to instruct the user on the nature of the input type.

## Validations 
**Optional**

The validations object prevents the user from navigating to the next question if the validation fails, the available options depend on the type of input.

### Minimum
```json
  "min": {
    "value": 3,
    "message": "Input needs to be at least 3 characters"
  }
```

***Text*** - Validates the minimum string length.

***Number*** - Validates the minimum numeric value.

***Email*** - Not valid.

### Maximum
```json
  "max": {
    "value": 12,
    "message": "Input needs to be less than 12 characters"
  }
```

***Text*** - Validates the maximum string length.

***Number*** - Validates the maximum numeric value.

***Email*** - Not valid.

### Regex
```json
  "regex": {
    "value": "\/^[a-zA-Z]+$\/",
    "message": "Input needs to be all letters"
  }
```

***Text*** - Validates according to the supplied regex pattern.

***Number*** - Not valid.

***email*** - Validates according to the supplied regex pattern.


### Whole Number
```json
  "wholeNumber": {
    "value": true | false,
    "message": "Input needs to be an integer"
  }
```

***Text*** - Not valid.

***Number*** - Validates the value to allow either integer only or decimal values.

***Email*** - Not valid.

## Notes

***Note 1*** - The message property in all cases is optional and will use a default value.

***Note 2*** - The email property type has default validation for email addresses which can be overridden with the application of a regex config as above.


