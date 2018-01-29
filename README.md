# react-websokkit :electric_plug:
[![license](https://img.shields.io/github/license/mmckeaveney/react-websokkit.svg)](https://github.com/mmckeaveney/react-websokkit/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/react-websokkit.svg)](https://www.npmjs.com/package/react-websokkit)



A declarative Render Prop Component and Higher Order Component (HOC) for react which deals with websockets and the [STOMP subprotocol](https://stomp.github.io/) in a flexible way. Inspired by the excellent [react-apollo.](https://github.com/apollographql/react-apollo) 

- [react-websokkit](#react-websokkit)
    - [Rationale](#rationale)
    - [Installation](#installation)
    - [Basic Usage](#basic-usage)
    - [API](#api)

## Rationale

**react-websokkit** allows you to:
- Make any component or app websocket aware
- Re-render your component with new data in real time when it is pushed over the websocket from the server 
- Push data through the websocket to the server from your react component
- Show an error message when something goes wrong 
- Interact with different topics through use of the STOMP sub-protocol

 
## Installation
**npm** 
```
npm i react-websokkit 
```

**yarn** 
```
yarn add react-websokkit 
```

## Basic Usage
There are 2 main ways to use react-websokkit. You can either make use of the [render prop](https://reactjs.org/docs/render-props.html) component, or the [HOC (Higher Order Component)](https://reactjs.org/docs/higher-order-components.html). Both do the same thing, however they have a slightly different API.

Importing from `react-websokkit` will by default import the unminified, transpiled ES5 code into your application which you can then bundle yourself. 

If you want to pull in the already minified, production bundle, you will need to import from `react-websokkit/dist/react-websokkit.js`, or create an alias in your bundler configuration. 

### Render Prop Component
---


#### Props
`url` : *String* - The url of the websocket server you want to connect to.

`subscriptions` : *String[]* - The STOMP topics you want the component to subscribe to. 

`render` : *(props) => JSX.Element* - The render prop is what you want to render. All the websocket related props (data, error) will be passed down to your component.  

```javascript
import React, { Component } from "react";
import Socket from "react-websokkit";

const Foo = () => {
    return (
        <Socket 
            url={"url/to/websocket/server"}
            subscriptions={["/some/topic"]}
            render={({ data: { response, error }, send }) => {
                return (
                    <span> Data: { response && response }</span>
                    <span> Error: { error && error }</span>
                    <button onClick={() => send("some/topic", { name: "hey" })}>
                );
            }} 
        />
    )
}

export default Foo;

```


### Higher Order Component 
---

#### Props
The higher order component takes the same props as the render prop component, but in an object. See the example below.

```javascript
import React, { Component } from "react";
import { withSokkit } from "react-websokkit";

const Foo = ({ data: { response, error }, send }) => {
    return (
        <span> Data: { response && response }</span>
        <span> Error: { error && error }</span>
        <button onClick={() => send("some/topic", { name: "hey" })}>
    );
}

export default withSokkit({
    url: "url/to/websocket/server",
    subscriptions: ["/some/topic"]
})(Foo);

```
#### Props passed down by React Websokkit  
When you render a component using `react-websokkit`, you will be provided with some props. Every time data is pushed through the websocket to your component, it will cause a state update and re-render. These are as follows.

`data` : *Object* - Contains either a `response` or `error` key based on whether or not there was a failure when data was pushed through the websocket on the subscribed topics.

`send` : *(topic: String, payload: Object | String) => void* - This function allows you to send data **to** the server on a STOMP topic over a websocket from inside your component.   

## Development

Clone the repo and install dependencies with your favourite package manager. The NPM scripts in the `package.json` are below.

* `build:minified` => builds and minifies the code and outputs a production ready bundle
* `clean` => blows away build folders (`lib`, `dist`) for a clean build
* `dev` => runs a `webpack` development server with hot reloading for development. Access the development playground at `localhost:8081`  
* `prepublish` => runs `prepublish:compile` when executing a `npm publish` 
* `prepublish:compile` => run `clean`, `transpile` and then `build:minified` 
* `test` => runs the jest test suite. 
* `test:watch` => run `test` in `watch` mode, which will re-run when you change files pertaining to your tests. 
* `test:update` => run `test`, but update outdated jest snapshots  
* `transpile` => transpile all files in `src` into the `lib` folder using babel 
