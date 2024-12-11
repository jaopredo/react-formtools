# React Formtools
Note: A website for this library is being made, soon it will be published here and soon we will have a page if you want to donate to the project.

## What is it?
React formtools is an GUI library made to make life of devs easier with forms.
The main problem of making forms is the amount of code that is needed to make a funcional form.
Even with frameworks like [react-hook-form](https://react-hook-form.com/), forms can be a pain in the ass!
Thinking on this type of situations, I made a library with ready-to-go components, like inputs, selects, and masks inputs, and you just need to pass some args to them!

## Disclaimer
This library was inspired by the Vue library **Formkit**. Access it [here](https://formkit.com/)

## Warning
This library still on develop, so if you find a bug, or have any suggestion to contribute on the project, try making an issue, we will see it for sure :D

## Dependencies
1. [React Hook Form](https://react-hook-form.com/)
2. [Styled Components](https://styled-components.com/)
3. [React IMask](https://imask.js.org/guide.html#getting-started)

## Installation
### Npm
```
npm install formtools-react
```

### Yarn
```
yarn add formtools-react
```

## Basic usage
After installing the library, the first thing you'll want to do is make the form:

```tsx
interface UserLogin {
    email: string,
    password: string,
}

<FormtoolsForm<UserLogin> onSubmit={(data) => console.log(data)}>
    <FormtoolsInput
        name="email"
        type="email"
        label="Type your email:"
    />
    <FormtoolsPassword
        name="password"
        label="Type your password"
        validation={{
            minLength: {
                value: 8,
                message: "Your password must have at least 8 chars"
            }
        }}
    />
</FormtoolsForm>
```

You probably looking at it and thinking: "Ok, but what is all this? What are the props? How does it work?". I shown this first, so you can understand that you **CAN NOT** use the components **OUTSIDE** the **FormtoolsForm** component, because of the context provided by **React Hook Form**. Said it, let's see the **GLOBAL PROPERTIES** of components

## Components
Here, you'll see all of the components and how to use them, also their properties and types

### Global Structure
All of the components follow a pre-made structure, made for you to have a easy access to the components class so you can style it easily

![Global Structure](https://i.ibb.co/KVm3VSb/Container.png)

This is the global component that wraps all other components. **Notice** that depending on what component you are using, the **input's container structure** can change.

### Styling
The structure shown on the previous topic, isn't named like that for nothing. Those containers have each of them a class, named 'formtools-{container name}', for example, the error container class is named 'formtools-error'. **Have in mind that all component's structures that will be shown follow the same logic**.

### Global Properties
```tsx
    import { GenericIcon } from 'react-icons/generic'

    <FormtoolsComponent
        name=""
        label=""
        help=""
        beforeicon={<GenericIcon/>}
        aftericon={<GenericIcon>}
        validation={{
            required: true,
            ...
        }}
    />
```

* **Name**: The name of the key returned on the "onSubmit" data parameter (See it on **FormtoolsForm**)
* **Label**: The input label
* **Help**: Set a text that helps the user to understand what he has to do
* **Before Icon** and **After Icon**: The before and after icon must be a React Element, any element that returns some JSX will be able to put something onto the container, but it is recommended that only Icons must be passed, a good library recommended to use is [react-icons](https://react-icons.github.io/react-icons/)
* **Validation**: An object representing the validations that will be made. It is the same object passed on the **React Hook Form** **register** function. (see it [here](https://react-hook-form.com/docs/useform/register))

#### Type
These properties are listed on the **DefaultProps** interface
```ts
import type { RegisterOptions, FieldValues } from 'react-hook-form'

interface DefaultProps {
    name: string,
    label: string,
    help?: string,
    beforeicon?: ReactElement,
    aftericon?: ReactElement,
    validation?: RegisterOptions<FieldValues, string>,
}
```

### Form Component
The form component is the primary component. It handle the context of the form and provide the necessary informations to the nested inputs.
```tsx
import { FormtoolsForm, FormtoolsInput } from "formtools-react"

interface UserValues {
    name: string
}

function TestForm() {
    function onSubmit(data: UserValues) {
        console.log(data)
    }

    return <FormtoolsForm<UserValues>
        onSubmit={onSubmit}
    >
        <FormtoolsInput
            name="name"
            label="Name: "
            help="Tell us your name"
        />
    </FormtoolsForm>
}
```
This component always need to be around all your form, without it, the form breaks.
#### Properties
| Props | Type | Description |
| ----- | ---- | ----------- |
| onSubmit | (data: T or FormData) | Function that runs when the form is submited |
| setMethods | Function | A setMethod that updates the state with the methods of the **useForm** return. (react-hook-form) |
| multipart | boolean | Tells if the form is a multipart-form, if it's set to true, the onSubmit receives an FormData object |

#### Types
```ts
interface FormtoolsFormProps<T> {
	children?: ReactNode | ReactNode[],
	onSubmit: (data: T|FormData) => void,
	setMethods?: Function,
	multipart?: boolean
}
```

#### Usage Example
```tsx
import { useState } from 'react'
import { FormtoolsForm, FormtoolsInput, FormtoolsFile } from "formtools-react"

interface UserValues {  // Declaring my form fields
    name: string
    photo: FileList
}

function TestForm() {  // Creating the component
    const [ methods, setMethods ] = useState()

    // Declaring the function executed before
    function onSubmit(data: FormData) {
        for (value of data) {
            console.log(value)
        }
    }
    
    // Making the basic form
    return <FormtoolsForm<UserValues>
        onSubmit={onSubmit}
        setMethods={setMethods}
        multipart
    >
        <FormtoolsInput
            name="name"
            label="Name: "
            help="Tell us your name"
        />
        <FormtoolsFile
            name="photo"
            label="Image: "
            help="Submit your picture"
        />
    </FormtoolsForm>
}
```


### Input Component
The Input component is the simplest one. It shows a simple Input Component. Its attributes are most likely an normal input. You can specify the type, aria values, etc.


#### Input Structure
![Input Structure](https://i.ibb.co/KVm3VSb/Container.png)

#### Type
```ts
type InputProps = DefaultProps & Omit<HTMLProps<HTMLInputElement>, keyof DefaultProps>
```


### Password Component
The password component is like an Input, but it already has an change password visibility function. Unlike the original structure, **it doesn't have a after-icon property**, instead, it has other 2 properties:

| Property | Type | Description |
| - | - | - |
| stateshowicon | () => Element | Set what icon is shown when the password is visible |
| statehideicon | () => Element | Set what icon is shown when the password is invisible |

Bellow you see an example on how to use this properties with the [react-icons](https://react-icons.github.io/react-icons/) library

```tsx
import { IoIosEye, IoIosEyeOff } from "react-icons/io"

...
<FormtoolsPassword
    name="password"
    label="Password: "
    help="Insert your password"

    stateshowicon={IoIosEye}
    statehideicon={IoIosEyeOff}
/>
...
```

#### Password Structure
![Input Structure](https://i.ibb.co/KVm3VSb/Container.png)

#### Type
```ts
interface PasswordProps extends Omit<DefaultProps, 'aftericon'> {
    stateshowicon: Function,
    statehideicon: Function
}
```


### Mask Component
The mask component uses a third-party library called [react-imask](https://imask.js.org/guide.html#getting-started), but not all of it's properties, just the basic one (mask) (This will be implemented in future library's versions), but you can use it normally like a common component.

```tsx
<FormtoolsMask
    name="phone"
    label="Set your phone:"
    mask="(00)00000-0000"
    onChange={(value) => {
        console.log(value)
    }}
    // Brazilian Phone Pattern
/>
```

#### Mask Structure
![Input Structure](https://i.ibb.co/KVm3VSb/Container.png)

#### Types
```ts
interface MaskProps extends ReactMaskProps<HTMLInputElement>, DefaultProps {
    mask: string,
    className?: string
}
```


### File Component
The file component it's made to handle the file inputs, so it has a better way to be styled. Yes you can make a normal `<FormtoolsInput type="file"/>` component, but the default file input isn't that easy to style. So we made a better structured file input.

#### File Structure
![File](https://i.ibb.co/sJ34Dxx/FIle-Component.png)

#### Types
```ts
interface FileProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	multiple?: boolean,

    fileInputClassName?: string,
    fileListClassName?: string,
    fileListItemClassName?: string
}
```


### Checkbox Component
The checkbox component is capable of showing multiple checkboxes, or just a simple checkbox. You can pass the options property to tell the multiple props that will be shown

##### Unique Checkbox
```tsx
<FormtoolsCheckbox
    name="terms"
    label="Terms: "
    placeholder="Yes, i read and agreed with the terms and conditions"
/>
```

##### Multiple Checkboxes
```tsx
<FormtoolsCheckbox
    name="order"
    label="Select your pizza's flavor"
    options={[
        { label: "Pepperoni", value: "Pepperoni" },
        { label: "Cheese", value: "Cheese" },
    ]}
/>
```

#### Checkbox Structure
##### Multiple Checkbox
![Multiple Checkbox](https://i.ibb.co/wW70Bhz/Multiple-Checkboxes-Component.png)

##### Single Checkbox
![Single Checkbox](https://i.ibb.co/3ycZR80/Single-Checkbox-Component.png)

#### Types
```ts
interface CheckboxProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	options?: OptionType[]

    labelClassName?: string
    itemClassName?: string
}
```


### Radio Component
Is really similar to the **Checkbox Component**, but you can't do a single Radio option, you **need** to pass a list of **options**

```tsx
<FormtoolsRadio
    name="order"
    label="Select your pizza's border"
    options={[
        { label: "Pepperoni", value: "Pepperoni" },
        { label: "Cheese", value: "Cheese" },
    ]}
/>
```

#### Radio Structure
![Multiple Checkbox](https://i.ibb.co/Rc0jKJT/Multiple-Radios-Component.png)

#### Types
```ts
interface RadioProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	options: OptionType[]

    radioListClassName?: string
    radioListItemClassName?: string
    radioLabelClassName?: string
}
```


### Toggle Component
The toggle component is a made component that simulates a toggle button. It has some custom properties:
| Property | Type | Description |
| -------- | ---- | ----------- |
| toggled | boolean | Tells if the toggle button is already toggled |
| turnedOnValue | any | Value that will be set when the button is ON |
| turnedOffValue | any | Value that will be set when the button is OFF |

#### Toggle Structure
![Toggle](https://i.ibb.co/sqQpFwh/Toggle-Component.png)

#### Types
```ts
interface ToggleProps extends DefaultProps, OmitedProps<HTMLInputElement> {
	toggled?: boolean,

	turnedOffValue?: any,
	turnedOnValue?: any

    labelClassName?: string
}
```


### Select Component
The select component is a component that shows a lot of options passed by the dev or loaded asynchronous.
| Property | Type | Description |
| -------- | ---- | ----------- |
| options | OptionType[] | The options that will be shown (Optional) |
| asyncLoad | Promise<any> | The async function that loads all the options (Optional) |

#### Example
##### Sync Load
```tsx
<FormtoolsSelect
    name="worker"
    label="Select a Worker:"
    type="options"
    options={[
        { label: 'João Pedro', value: 1 },
        { label: 'Márcio', value: 2 },
        { label: 'Gabriel', value: 3 },
    ]}
/>
```
##### Async Load

This example shows a demonstration of a resolve Promise and an axios call.


**Warning**: Important to notice is that the return of this API is the same strucutre of the option type `{label: string, value: any}`, so if you made you own API, or is getting from another API, make sure to have a map function that returns the values as they are supposed to be.
```tsx
<FormtoolsSelect
    name="worker"
    label="Select a Worker:"
    asyncLoad={() => new Promise<OptionType[]>((resolve) => {
        axios.get('http://localhost:3000/workers').then(resp => {
            resolve(resp.data)
        })
    })}
/>
```

#### Select Structure
##### With sync load
![Sync Select](https://i.ibb.co/XCnW8Vs/Select-Sync-Component.png)

##### With async load
![Async Select](https://i.ibb.co/k5WjjLG/Select-Async-Component.png)

#### Types
```ts
type SelectProps = Omit<DefaultProps, 'aftericon'> & OmitedProps<HTMLSelectElement> & {
    selectOptionsClassName?: string
    selectOptionClassName?: string
    selectLoadClassName?: string
} & ({
    type: 'options'
	options: OptionType[]
} | {
    type: 'async'
	asyncLoad: () => Promise<any>
})
```


### Taglist Component
The taglist component is similar to the **select component**, but it is possible to **not pass any option**. You choose a option from the list and it appears on the container of the component, or type it and press a key passed in the **addKeys** property

| Property | Type | Description |
| -------- | ---- | ----------- |
| addKeys | string[] | In this property, you pass the keys that, when pressed, will add the tags onto the taglist |
| type | async, options, typing | This property tells how the component will handle the inputs and the options. **Async** you need to pass the asyncLoad property. **Options** you need to pass the options property. **Typing** you don't have to pass any options loader or array, it will set the tags when you press **,** |
| options | OptionType[] | The options that will be shown (Optional) |
| asyncLoad | Promise<any> | The async function that loads all the options (Optional) |


#### Structure
##### Options Structure
![Options Taglist](https://i.ibb.co/XW8vNHv/Taglist-Options-Component.png)

##### Async Structure
![Taglist Async](https://i.ibb.co/2FZp0YF/Taglist-Async-Component.png)

##### Typing Structure
![Taglist Typing](https://i.ibb.co/cQzL62g/Taglist-Typing-Component.png)

#### Types
```ts
type TaglistProps = Omit<DefaultProps, 'aftericon'> & OmitedProps<HTMLInputElement> & {
    addKeys: string[]

    taglistClassName?: string
    taglistOptionsClassName?: string
    taglistLoadClassName?: string
    taglistTagClassName?: string
    taglistOptionClassName?: string
} & ({
	type: 'options'
	options: OptionType[]
} | {
    type: 'async'
	asyncLoad: () => Promise<any>
} | {
    type: 'typing'
})
```


### Search Component
The search component is similar to the select component, but you can type into it, and as you type something, the options show will be filtered.

| Property | Type | Description |
| -------- | ---- | ----------- |
| url | string | The url that the request will be sent |
| multiple | boolean | Tells if can select more than one option |
| mapper | Function | This functions receives request values, needs to return a OptionType, use it to filter the correct properties from the API request response, for example, if your api return the entry name as "name", you'll return something like: { label: entry.name, ... } |
| filterSchema | Function | This functions will filter the string typed on the search input. It needs to return a object that will be turned into the url parameters, so make a object that will be read by the url and filter the options correctly |

#### Example
This is workers.json
```json
[
    { "name": "João Pedro", "id": 1 },
    { "name": "Márcio", "id": 2 },
    { "name": "Gabriel", "id": 3 }
]
```
The `http://localhost:3000/workers` returns this same json, and the `?name_like=xxx` parameter will return the workers with the the name property like the passed.

```tsx
<FormtoolsSearch
    label="Worker"
    name="worker"

    url="http://localhost:3000/workers"
    mapper={function (worker: { name: string, id: number }) {
        return {
            label: worker.name,
            value: worker.id
        }
    }}
    filterSchema={function (value: string) {
        return {
            name_like: value
        }
    }}
/>
```

#### Structure
![Search Component](https://i.ibb.co/55zhjJn/Search-Component.png)

#### Types
```ts
interface SearchProps extends Omit<DefaultProps, 'aftericon'>, OmitedProps<HTMLSelectElement> {
	url: string
	filterSchema: (value: any) => string | string[][] | Record<string, string> | URLSearchParams | undefined
	mapper?: (data: any) => OptionType[]
	multiple?: boolean

    searchListClassName?: string
    searchListItemClassName?: string
    searchOptionsClassName?: string
    searchLoadClassName?: string
    searchOptionClassName?: string
}
```


### Group Component
This component just wraps other components as a group, you can name a title to it

```tsx
<FormtoolsGroup title="Login">
    ...
</FormtoolsGroup>
```

#### Structure
![Group Component](https://i.ibb.co/k3yr99D/Group-Component.png)

#### Type
```ts
type GroupProps = {
    title?: string,
    titleClassName?: string
} & HTMLProps<HTMLFieldSetElement>
```

## Schema
Schema is a special component. It works using a JSON object, turning it into a functional form.
```tsx
<FormtoolsSchema
    schema={[
        {
            formtool: 'email',
            name: 'email',
            label: 'Email',
            help: 'Insert your email'
        },
        {
            formtool: 'password',
            name: 'password',
            label: 'password',
            help: 'Insert your password',
            validation: {
                minLength: {
                    value: 8,
                    message: "You password needs to have at least 8 characters"
                }
            }
        }
    ]}
>
```
or
```tsx
const schema: SchemaProps = [
    {
        formtool: 'email',
        name: 'email',
        label: 'Email',
        help: 'Insert your email'
    },
    {
        formtool: 'password',
        name: 'password',
        label: 'password',
        help: 'Insert your password',
        validation: {
            minLength: {
                value: 8,
                message: "You password needs to have at least 8 characters"
            }
        }
    }
]
<FormtoolsSchema
    schema={schema}
>
```

Is the same as

```tsx
<FormtoolsInput
    type="email"
    name="email"
    label="Email"
    help="Insert your email"
/>
<FormtoolsPassword
    name="password"
    label="password"
    help="Insert your password"
    validation={{
        minLength: {
            value: 8,
            message: "You password needs to have at least 8 characters"
        }
    }}
/>
```

The group component also accepts the `schema` property (When is into the json object, the normal JSX component doesn't accepts it)


### Custom Components
When you are creating your form, you might not find any input here useful, so you decide creating your own input! That is very very easy by the way. And another great tip: **Your custom component can be inserted in the schema, so it can be passed as a JSON**.

#### 1. How to create a custom component?
First, you'll create your file exporting your component. Next, you'll import the **useFormContext** from the **react-hook-form** library. This function will allow you to register your input into the form. Next, you will create your input and register it with the name and the validation you would like.
This example shows a component that will receive the name and the validation by properties, and have the same default structure as the other components, using the **Wrapper** component provided.

```tsx
import React from 'react'
import {
    Wrapper,
    DefaultProps
} from 'react-formtools'
import { useFormContext } from 'react-hook-form'

interface CustomProps extends DefaultProps {
    customProp: string
}

export default function CustomComponent(props: CustomProps) {
    const { register } = useFormContext()

    return <Wrapper {...props}>
        <input {...register(props.name, props.validation)}/>
    </Wrapper>
}
```

#### 2. Now, how can I make it possible to pass it on the Schema?
This is very simple too. You need to pass a configuration provider, provided by the library.
`import { ConfigContextProvider } from 'react-formtools'`
This provider receives some informations that will be used by **all forms nested**. The configuration we are looking for is `customComponents`. You will also like to use the `createCustomComponent` function, because the schema uses a specific structure, nothing complex, but you will like it for organization and for future updates

```tsx
// Required imports for creating the Context
import type { ReactNode } from 'react'
import { ConfigContextProvider, ConfigInterface, createCustomComponent } from 'react-formtools'

const config: ConfigInterface = {
    customComponents: {
        customComponent: createCustomComponent(CustomComponent)
    }
}

function MyCustomComponentsProvider({ children: ReactNode }) {
    return <ConfigContextProvider config={config}>
        {children}
    </ConfigContextProvider>
}
```

After creating the context, you can pass it on the root of your project and use your component on any form schema across it.

```tsx
// After using it in the root of your project (Or wherever you want to)

const schema = [
    {
        formtool: 'customComponent',
        customProp: 'This is my custom property'
    }
]

...

return <FormtoolsForm {...}>

<FormtoolsSchema
    schema={schema}
/>

</FormtoolsForm>
```
