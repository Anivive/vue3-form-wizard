# Form Configuration
Vue 3 Form Wizard is built to easily add support for the most common user interface types: 

- Input
- Textarea
- Dropdown - Filterable
- Options List - Single/Multi Select

Each property type begins with the same options for config:

```json
    "property": "data-name",
    "text": "This text is what the user sees",
    "type": "input" | "textarea" | "dropdown" | "options",
    "required": true | false,
    "options": { 
      // type specific - see below
    },
```

## Property
 This is the name of the property that the data from this item will be modeled with, it could match an api field name for example.

## Text 
This will be the information provided to the user.

## Type 
This denotes the type of user interface element to be presented to the user and can be any of the following values.

## Required 
**Optional**

**Default** `false`

The required property will prevent the user from navigating to the next question until there is a response.

```json
"input" | "textarea" | "dropdown" | "options"
```
It is also possible to use your own custom-types which can translate into your own custom UI components, see the [Create Custom Inputs](customization/configuration.md) documentation for more information.


## Options
Each input type has a different sub-set of options, they can each be found here:

- [Input Type](getting_started/input.md)
- [Textarea Type](getting_started/textarea.md)
- [Dropdown Type](getting_started/dropdown.md)
- [Options Type](getting_started/options.md)


