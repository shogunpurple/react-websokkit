# react-websokkit :cyclone: :electric_plug:
[![license](https://img.shields.io/github/license/mmckeaveney/react-websokkit.svg)](https://github.com/mmckeaveney/react-websokkit/blob/master/LICENSE)


A declarative Render Prop Component and Higher Order Component (HOC) for react which deals with websockets and the STOMP protocol in a declarative, flexible way. Inspired by the excellent [react-apollo.](https://github.com/apollographql/react-apollo) 

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

## API

## Development

Clone the repo and install dependencies with your favourite package manager. The NPM scripts in the `package.json` are below.

* `build:minified` => builds and minifies the code and outputs a production ready bundle
* `clean` => blows away build folders (`lib`, `dist`) for a clean build
* `dev` => runs a `parcel` development server with hot reloading for development. Access the development playground at `localhost:1234`  
* `prepublish` => runs `prepublish:compile` when executing a `npm publish` 
* `prepublish:compile` => run `clean`, `transpile` and then `build:minified` 
* `test` => runs the jest test suite. 
* `test:watch` => run `test` in `watch` mode, which will re-run when you change files pertaining to your tests. 
* `test:update` => run `test`, but update outdated jest snapshots  
* `transpile` => transpile all files in `src` into the `lib` folder using babel 
