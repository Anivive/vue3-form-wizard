# Using Custom Controls
Even the controls are customizable! Just as with the custom inputs and errors, you can use Vue slots to override the default controls with a template.

```html
  <vue-form-wizard>
    <template #controls="item">
      <div class="controls-container">
        <button @click="item.controls.previous.go" :disabled="item.controls.previous.isDisabled">Previous</button>
        <button @click="item.controls.skip.go" :disabled="item.controls.skip.isDisabled">Skip</button>
        <button @click="item.controls.next.go" :disabled="item.controls.next.isDisabled">Next</button>
        <button @click="item.controls.submit.go" :disabled="item.controls.submit.isDisabled">Submit</button>
      </div>
    </template>
  </vue-form-wizard>
```

## Items Properties

### Index
The `index` property is the numeric position of the current form item.

### Controls
As you can see from the example above, the controls object has properties for each button.

`previous`
`skip`
`next`
`submit`

Each one of these is an object with more properties:

#### Go
The `go` is the function on each button and performs the navigation action, you can bind this to any event you need for your implementation, it will also emit the internal [events](events.md) which allows you to add callback code, or you could call the go method from inside another function if desired.

#### Is Disabled
The `isDisabled` property can be used to determine if the button should be enabled, internally, this property updates based on the position the form item is in the config and whether or not a value is present.

- The previous button should be disabled if its the first form item.
- The skip should be disabled if the form item is required.
- The next button should be disabled on the last question and until an answer is provided.
- The submit button should be disabled unti the last form item and only if the last question is required.

***Note*** - Instead of setting the disabled property, you could use a `v-if` or `v-show`



