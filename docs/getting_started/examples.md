# Examples
Here are a few examples to demonstrate the functionality in practice.

## Text Input 
This example is a text input with a minimum character limit of 3, a placeholder and is a required field.

```json
  {
    "property": "text",
    "text": "This is a simple text input question. (Min 3 chars, required)",
    "type": "input",
    "options": {
      "type": "text",
      "validations": {
        "min": {
          "value": 3,
          "message": "Input needs to be at least 3 characters"
        },
      },
      "placeholder": "Enter the text."
    },
    "required": true
  }
```

## Number Input
This example shows a number input requiring a value between 3 and 40.

```json
  {
    "property": "number",
    "text": "This is a simple number input question. (Min 3 - Max 40)",
    "type": "input",
    "options": {
      "type": "number",
      "validations": {
        "min": {
          "value": 3,
          "message": "Minimum value is 3"
        },
        "max": {
          "value": 40,
          "message": "Maximum value if 40"
        },
      },
      "placeholder": "Enter the text."
    }
  }
```

## Email Input
This example shows an email input, which by default validates that an email address should be in the correct format.

```json
  {
    "property": "email",
    "text": "This is a simple email input question.",
    "type": "input",
    "options": {
      "type": "email",
      "placeholder": "Enter the text."
    }
  }
```

## Text Area
This example is of a text area input with a max length and a placeholder.

```json
  {
    "property": "textarea",
    "text": "This is a simple textarea input question. (Max 40 chars)",
    "type": "textarea",
    "options": {
      "maxLength": 40,
      "placeholder": "Enter the text."
    }
  }
```

## Drop Down List
A drop down list with hard coded values and no filter, it will set the default to the item with id equal to '2';

```json
  {
    "property": "dropdown",
    "text": "This is a simple dropdown question. (Options hardcoded)",
    "type": "dropdown",
    "options": {
      "list": [
        {
          "id": 1,
          "value": "First answer"
        },
        {
          "id": 2,
          "value": "Second answer"
        },
        {
          "id": 3,
          "value": "Third answer"
        }
      ],
      "filter": false,
      "default": {
        "id": 2
      },
      "placeholder": "Enter the text."
    }
  }
```

## Single Select Options
Here is an example of a single select property with hard coded values and a default.

```json
{
    "property": "single",
    "text": "This is a single select question. (Options hard coded)",
    "type": "options",
    "options": {
      "list": [
        {
          "id": 1,
          "value": "First answer"
        },
        {
          "id": 2,
          "value": "Second answer"
        },
        {
          "id": 3,
          "value": "Third answer"
        }
      ],
      "default": 0,
      "multiSelect": false
    }
  }
```

## Multi Select Options
A multi select property that uses an api

```json
{
    "property": "multi",
    "text": "This is a multiselect question. (Options called from API)",
    "type": "options",
    "options": {
      "api": {
        "url": "https://jsonplaceholder.typicode.com/posts"
      },
      "keys": {
        "value": "title"
      },
      "multiSelect": true
    }
  }
  ```