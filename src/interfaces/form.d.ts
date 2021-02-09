export interface iProperties {
  property: string,
  text: string,
  type: string
  options?: iOptionsInput | iOptionsTextarea | iOptionsListFilter | iOptionsList,
  required?: boolean
}

export interface iOptionsInput {
  default?: any
  placeholder: string,
  type: string,
  validations?: iValidationsString | iValidationsNumber
}

export interface iOptionsTextarea {
  default?: any
  placeholder: string,
  maxLength: number
}

export interface iApiOptions {
  url: string
  headers?: object,
  params?: object,
  method?: string,
  body?: any
}

export interface iOptionsListFilter {
  default?: any
  filter: boolean
  list?: object[],
  api?: iApiOptions,
  keys?: {
    id: string,
    value: string
  },
  placeholder: string
}

export interface iOptionsList {
  default?: any
  list?: object[],
  api?: iApiOptions,
  keys?: {
    id: string,
    value: string
  },
  multiSelect?: boolean
}

export interface iValidations {
  max?: {
    value: number,
    message?: string
  },
  min?: {
    value: number,
    message?: string
  }
}

export interface iValidationsString extends iValidations {
  regex?: {
    value: RegExp,
    message?: string
  }
}

export interface iValidationsNumber extends iValidations {
  wholeNumber?: {
    value: boolean,
    message?: string
  }
}
