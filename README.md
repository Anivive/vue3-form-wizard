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


## Introduction
Vue 3 Form Wizard is a Vue 3 compatable, JSON configurable, fully customizable, form builder that allows developers to easily add dynamic entry components to their Vue projects.

Form elements can be added easily using Javascript Object Notation to create a simple user interaction displaying one question at a time before transitioning to the next.

The package has built in support for the most common input types which can be styled to your liking.

- Input
- Textarea
- Dropdown (filterable)
- Single and Multi Select Options List

Supports validation of inputs before allowing the user to progress through the form.

Gives the flexibility of adding your own custom input types with minimal effort and easily add callbacks to each form navigation.

---
## Table of Contents

* [Introduction](#introduction)
* [Usage](#usage)
* [Documentation](#documentation)
* [Table of Contents](#table-of-contents)
* [Contributing Guidelines](#contributing-guidelines)
* [Code Of Conduct](#code-of-conduct)
* [Bugs and Feature Requests](#bugs-and-feature-requests)
* [Copyright and License](#copyright-and-license)

---
## Usage
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

The `form` property can be configured with objects for each input type very easily:

```json
  [
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
    },
    ...
  ]
```

---

## Documentation
Full documentation can be found [here](https://expert-giggle-ffac66c9.pages.github.io/).

---

## Coming Soon
**Summary view** - Will summarize the user input and allow a quick edit functionality.

**Progress indicator** - This will visually indicate to the user the progress through the form.

**Conditions** - An additional configurable item which will allow for dynamic form generation, based on the answers given, new inputs can be added to the sequence.

**Custom Components** - We also plan to make some out-of-the-box custom components, like a date selector.

---
## Contributing Guidelines
Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions
for opening issues, coding standards, and notes on development.

Moreover, if your pull request contains JavaScript patches or features, you must include relevant
unit tests. All HTML and CSS should conform to the Code Guide, maintained by Mark Otto.

---


## Code Of Conduct
Please read through our [code of conduct](CODE_OF_CONDUCT.md).

---



## Bugs and Feature Requests
Found a bug or have a feature request? Please first read the issue guidelines and search for
existing and closed issues.

If your problem or idea is not addressed yet, please
[open a new issue](https://github.com/Anivive/vue3-form-wizard/issues).



## Thanks
Thank you to all of you who have contributed to this package.
[[Contribute to the Project](CONTRIBUTING.md)]



## Copyright and License
Code and documentation copyright 2021 Anivive Lifesciences Code released under the [MIT License](LICENSE.md).

Docs released under [Creative Commons](https://creativecommons.org/licenses/by/3.0/).

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md).
By participating in this project you agree to abide by its terms.



---



Status badges created using [Shields.io](https://github.com/badges/shields).
