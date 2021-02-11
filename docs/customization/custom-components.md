# Custom Inputs
Leveraging some of the best Vue features, it's possible to create your own custom components. Using both named slots and scoped scopes, you can easily extend the functionality of Vue 3 Form Wizard to meet your own needs.

Lets say you created your own Vue 3 component named `CoolCustomInput` and added it to the form configuration file like this: 

```json
  {
    "property": "data-name",
    "text": "This text is what the user sees",
    "type": "cool-custom-input",
    "required": true | false,
    "options": { 
      // these can be specific to your component
    },
  }
```

The `type` property above, can be set to anything, as long as it matches the slot name below and the options object can be anything you need for your component to operate.

```html
  <vue-form-wizard>
    <template #cool-custom-input="item">
      <cool-custom-input>{{ item.text }}</cool-custom-input>
    </template>
  </vue-form-wizard>
```

As you can see from above, you can nest your own components inside a named template and access the properties of the item.

## Item Properties

### Index
The `index` property is the numeric position of the current form item.

### Text
The `text` property is the same as the one passed from the configuration file, you can use this in your component to show to the user however you like.

### Property
The `property` key is also from the configuration file and is the key name to use when storing data.

### Value
The `value` is passed back into the component after it is updated from within.

### Set
The `set` property is actually a method, this should be used to send data back up to the form and takes three parameters.

```js
  set(property, value, valid);

```

##### Property
This should normally be the `property` passed in on the props.

##### Value
The value should come from your custom component.

##### Valid 
Valid should be `true` to allow the navigation event to continue.

If your component is doing any validation (and it fails) it should return an object with an errors array, the contents of this array will be presented to the user in the errors slot.

```js
  {
    errors: [
      'Custom validation criteria not met'
    ]
  }
```

