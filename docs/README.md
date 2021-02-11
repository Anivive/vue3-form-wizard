<div style="text-align:center" align="center">

<!-- ![Package Logo]() -->

# Vue 3 Form Wizard

[![MIT License](https://img.shields.io/badge/license-MIT-brightgreen)](/templates/LICENSE.md)
[![Vue](https://img.shields.io/badge/vue-3.0.5-%2342b883)](https://v3.vuejs.org/)
[![Typescript](https://img.shields.io/badge/typescript-4.1.3-blue)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/jest-26.6.3-red)](https://jestjs.io/en/)
[![Docsify](https://img.shields.io/badge/docsify-4.11.6-green)](https://docsify.js.org/#/)
[![Testing Coverage](https://img.shields.io/badge/coverage-100%25-green)](https://github.com/Anivive/vue-package-starter)

</div> 

### Introduction
Vue 3 Form Wizard is a Vue 3 compatable, JSON configurable, fully customizable, form builder that allows developers to easily add dynamic entry components to their Vue projects.

Form elements can be added easily using Javascript Object Notation to create a simple user interaction displaying one question at a time before transitioning to the next.

The package has built in support for the most common input types which can be styled to your liking.

- Input
- Textarea
- Dropdown (filterable)
- Single and Multi Select Options List

Supports validation of inputs before allowing the user to progress through the form.

Gives the flexibility of adding your own custom input types with minimal effort and easily add callbacks to each form navigation.


### Usage
Install the package using the node package manager. 

```npm
npm install vue3-form-wizard
```

import onto your component and add to the `components` key.

```js
import VueFormWizard from 'vue3-form-wizard'

// If you want to use our styling
import 'vue3-form-wizard/dist/index.css'; 

export default {
  components: {
    VueFormWizard
  }
}
```

You can then add the component to your template, where the `form` property is an array of objects for generating the form and `v-model` is where to store the data on your component.

```html
<vue-form-wizard :form="config" v-model="formData" />
```

[How to build the form](getting_started/quickstart.md)