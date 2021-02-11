
# Dropdown
The available options values are described here:

```json
  "options": {
    "list": [
      // see below
    ],
    "keys": {
      // see below
    },
    "api": {
      // see below
    },
    "default": {
      // see below
    },
    "filter": true | false,
    "placeholder": "Enter the text."
  }
```

## List 
In its simplest form, the dropdown can use an array of objects, for example: 

```json
  {
    "id": 1,
    "value": "First value"
  },
  {
    "id": 2,
    "value": "Second value"
  },
  {
    "id": 3,
    "value": "Third value"
  }
```

The `id` property is the default property to use for indexing and the `value` property is the default for the display value.

## Keys 
**Optional**

It is possible to override the properties that are used for the `id` and `value` properties by mapping them in an object like this:

```json
  "keys": {
    "id": "id-key"
    "value": "value-key"
  },
```

This allows you to then use custom property names in your list array like so:

```json
  {
    "id-key": 1,
    "value-key": "First value"
  }
```

## Api 
**Optional**

It is also possible to utilize the calling of an API as the dropdown item is mounted, the options available are below: 

```json
  "url": "",
  "header: { },
  "params": { },
  "method": "GET",
  "body": ""
```

**Url** - Url is the resource location and should return a JSON encoded array of objects, you can use the `api` configuration with the `keys` to select the data items that you would like to use for the `id` and `value`.

**Header** [Optional] - If desired, header properties can be configured, such as to add authorization headers required by the api call.

**Params** [Optional] - Can be used to append key value pairs into the query string of the url, the url can also be used with the query string already present, in which case this is not needed.

**Method** [Optional] [Default = 'GET'] - This is needed if the requested resource needs to use a method other than a `Get` method.

**Body** [Optional] - A body can be passed if required, correct encoding should be handled by the developer utilizing this feature and should match the `fetch` specification.

***Note*** - If an Api configuration is present, it will override the list property.

## Default
**Optional**

The default property can be used in one of two ways:

```json
  "default": 0
```
As an integer, describing the position in the array, or:

```json
  "default": {
    "keyA": 2,
    "keyB": "abc",
    ...
  },
```
As an object describing key value pairs which will be matched. The more keys equates to more matches to be made, all the keys have to match to return a default, so it's better to keep this as simple as possible.

## Filter
**Optional**

**Default** `true`

The filter property can be either `true` or `false` and controls if the options can be filtered with a text search.

## Placeholder
**Optional**

Presets the input with placeholder text which can be used to instruct the user on the nature of the input type.



