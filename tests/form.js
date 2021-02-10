export default {
  textInput: [
    {
      property: 'testQuestion1',
      text: 'This is a simple text input question. (Min 3 chars)',
      type: 'input',
      options: {
        type: 'text',
        validations: {
          min: {
            value: 3,
            message: 'Input needs to be at least 3 characters'
          }
        },
        placeholder: 'Enter some text'
      }
    }
  ],
  numberInput: [
    {
      property: 'testQuestion2',
      text: 'This is a simple number input question. (Min 3 - Max 40)',
      type: 'input',
      options: {
        type: 'number',
        validations: {
          min: {
            value: 3,
            message: 'Minimum value is 3'
          },
          max: {
            value: 40,
            message: 'Maximum value is 40'
          },
        },
        placeholder: 'Enter a number'
      }
    }
  ],
  emailInput: [
    {
      property: 'testQuestion3',
      text: 'This is a simple email input question.',
      type: 'input',
      options: {
        type: 'email',
        placeholder: 'Enter your email'
      }
    }
  ],
  multiSelect: [
    {
      property: 'testQuestion4',
      text: 'This is a multiselect question. (Options hardcoded)',
      type: 'options',
      options: {
        multiSelect: true,
        list: [
          {
            id: 1,
            value: 'First answer'
          },
          {
            id: 2,
            value: 'Second answer'
          },
          {
            id: 3,
            value: 'Third answer'
          }
        ]
      }
    }
  ],
  singleSelect: [
    {
      property: 'testQuestion5',
      text: 'This is a single select question. (Options hardcoded)',
      type: 'options',
      options: {
        multiSelect: false,
        list: [
          {
            id: 1,
            value: 'First answer'
          },
          {
            id: 2,
            value: 'Second answer'
          },
          {
            id: 3,
            value: 'Third answer'
          }
        ]
      }
    }
  ],
  singleSelectWithApi: [
    {
      property: 'testQuestion6',
      text: 'This is a single select question. (Options called from API)',
      type: 'options',
      options: {
        multiSelect: false,
        api: {
          url: 'https://jsonplaceholder.typicode.com/posts'
        },
        keys: {
          value: 'title'
        }
      }
    },
  ],
  dropDown: [
    {
      property: 'testQuestion7',
      text: 'This is a simple dropdown question. (Options hardcoded, filterable)',
      type: 'dropdown',
      options: {
        filter: true,
        list: [
          {
            id: 1,
            value: 'First answer'
          },
          {
            id: 2,
            value: 'Second answer'
          },
          {
            id: 3,
            value: 'Third answer'
          }
        ],
        placeholder: 'Select an Option'
      }
    }
  ],
  dropDownWithApi: [
    {
      property: 'testQuestion8',
      text: 'This is a simple dropdown question. (Options called from API, not filterable)',
      type: 'dropdown',
      options: {
        filter: false,
        api: {
          url: 'https://jsonplaceholder.typicode.com/posts'
        },
        placeholder: 'Select an Option'
      }
    }
  ],
  textArea: [
    {
      property: 'testQuestion9',
      text: 'This is a simple textarea input question. (Max 40 chars)',
      type: 'textarea',
      options: {
        maxLength: 40,
        placeholder: 'Enter some text.'
      }
    }
  ]
};
