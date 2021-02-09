export default {
  textInput: [
    {
      "property": "first",
      "text": "this is the first question",
      "type": "input",
      "options": {
        "type": "text",
        "validations": {
          "min": {
            "value": 3,
            "message": "Input needs to be at least 3 characters"
          }
        },
        "placeholder": "text-input"
      }
    }
  ],
  numberInput: [
    {
      "property": "second",
      "text": "this is the second question",
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
        }
      }
    },
  ],
  emailInput: [
    {
      "property": "second-half",
      "text": "this is the second and a half question",
      "type": "input",
      "options": {
        "type": "email"
      }
    },
  ],
  multiSelect: [
    {
      "property": "third",
      "text": "this is the third question",
      "type": "options",
      "options": {
        "multiSelect": true,
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
      }
    },
  ],
  singleSelect: [
    {
      "property": "forth",
      "text": "this is the forth question",
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
        "multiSelect": false,
      }
    },
  ],
  singleSelectWithApi: [
    {
      "property": "forth",
      "text": "this is the forth question",
      "type": "options",
      "options": {
        "api": {
          "url": "https://jsonplaceholder.typicode.com/posts"
        },
        "keys": {
          "value": "title"
        },
        "multiSelect": false,
      }
    },
  ],
  dropDown: [
    {
      "property": "fifth",
      "text": "this is the fifth question",
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
        "filter": true
      }
    },
  ],
  dropDownWithApi: [
    {
      "property": "fifth",
      "text": "this is the fifth question",
      "type": "dropdown",
      "options": {
        "filter": false,
        "api": {
          "url": "https://jsonplaceholder.typicode.com/posts"
        }
      }
    },
  ],
  textArea: [
    {
      "property": "sixth",
      "text": "this is the sixth question",
      "type": "textarea",
      "options": {
        "maxLength": 10,
        "placeholder": "Enter the text."
      }
    }
  ]
};
