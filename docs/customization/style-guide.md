# Styling Customization
The easiest way to style Vue 3 Form Wizard, is to import our css file by adding this to your component:

```js
  import 'vue3-form-wizard/dist/index.css';
```

### CSS Variables

You can use the following css variables to easily change some of the basic styling to meet your needs:

```css
  --button-background-standard
  --button-border-standard

  --background-disabled
  --border-disabled

  --hover-background
  --hover-border

  --input-background-standard
  --input-border

  --text-standard
  --text-disabled
  --text-button

  --border-radius
  --transition-time

  --option-background-standard
  --option-background-active
  --option-border-standard
  --option-border-active
  --option-outer-standard
  --option-outer-active
  --option-inner-standard
  --option-inner-active

  --error
```

### Custom CSS

If you prefer, you can create your own css for each of the components, to assist, simplified HTML markup for each of the components is below:

#### Input Component
```html
  <div class="input-component">
    <label>
      {{ text }}
      <input type="text | number | email">
    </label>
  </div>
```

#### Textarea Component
```html
  <div class="textarea-component">
    <label>
      {{ text }}
      <textarea />
    </label>
  </div>
```

#### Dropdown Component
```html
<div class="dropdown-component">
    <div>
      <label>
        {{ text }}
        <span class="input-wrapper">
          <input
            class="('readonly') ('open')"
            type="text"
          >
        </span>
      </label>
      <div class="dropdown-list" class="open">
        <span
          class="option clickable"
          class="('selected')"
        >
          {{ value }}
        </span>
        <span class="no-results">
          No results.
        </span>
      </div>
    </div>
  </div>
```

#### Option Component
```html
  <div class="options-component">
    {{ text }}
    <div class="options-list">
      <label
        class="clickable ('selected')"
      >
        <input
          type="checkbox | radio"
          checked="true | false"
        >
        <span>{{ value }}</span>
      </label>
    </div>
  </div>
```

***Note*** - Classes within (brackets) can be present or not depending on the component state.