# Events
As the user interacts with the form's navigation controls, events are emitted when they click each button. These allow the developer the opportunity to trigger any custom code.

To bind the actions, use the vue event syntax like: 
```html
  <vue-form-wizard
    ...
    @previous="handlePrevious"
    @skip="handleSkip"
    @next="handleNext"
    @submit="handleSubmit"
  />
```

Then create the handler function in your methods collection:

```js
methods: {
  handlePrevious() {
    // do something
  },
  handleSkip(success) {
    // do something
  },
  handleNext(success) {
    // do something
  },
  handleSubmit(success) {
    // do something
  }
}
```

The success argument can be either `true`, which indicates the navigation occured successfully, or an object containing the key `errors` with an array of the error messages.