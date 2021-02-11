# Display Custom Errors
Just as we saw in the [Custom Inputs](customization/custom-components.md) section, its possible to implement your own visualization of the errors if you would prefer.


```html
  <vue-form-wizard>
    <template #errors="errors">
      <div v-for="(error, index) in errors" :key="index">
        <div>{{ index }}: {{ error }}</div>
      </div>
    </template>
  </vue-form-wizard>
```

The template name here must be `errors` as you can see above, and will pass the errors array into the slot scope so that you can loop through it using a `v-for` tag.
