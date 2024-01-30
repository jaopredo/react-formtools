# React Formtools
Note: A website for this library is being made, soon it will be published here ;)

## What is it?
React formtools is an GUI library made to make life of devs easier with forms.
The main problem of making forms is the amount of code that is needed to make a funcional form.
Even with frameworks like [react-hook-form](https://react-hook-form.com/), forms can be a pain in the ass!
Thinking on this type of situations, I made a library with ready-to-go components, like inputs, selects, and masks inputs, and you just need to pass some args to them!

## Warning
This library still on develop, so if you find a bug, or have any suggestion to contribute on the project, try making an issue, we will see it for sure :D

## Dependencies
1. [React Hook Form](https://react-hook-form.com/)
2. [Styled Components](https://styled-components.com/)
3. [React IMask](https://imask.js.org/guide.html#getting-started)

## Basic usage
After installing the library, the first thing you'll want to do is make the form:

```
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
![Minion](https://i.ibb.co/xsj8X43/Wrapper.png)
This is the global component that wraps all other components. **Notice** that depending on what component you are using, the **input's container structure** can change.

### Global Properties
```
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
* **Help**: Set a text that helps the user to understand what he have to do
* **Before Icon** and **After Icon**: The before and after icon must be a React Element, any element that returns some JSX will be able to put something onto the container, but it is recommended that only Icons must be passed, a good library recommended to use is [react-icons](https://react-icons.github.io/react-icons/)
* **Validation**: An object representing the validations that will be made. It is the same object passed on the **React Hook Form** **register** function. (see it [here](https://react-hook-form.com/docs/useform/register))
