# dialogLoader
As of January 2018, browser support for the HTML dialog element is poor, but there does exist a "polyfill".

The dialogLoader finds and registers all dialog elements with the dialog polyfill for cross-browser support.

## Install
dialogLoader is an ES6 module. Consequently, you'll nee an ES6 transpiler ([Babel](https://babeljs.io) is an option) and a module loader as part of your Javascript workflow.

If you are already using NPM for your project, you can install dialogLoader with the following command:

```
$ npm install @degjs/dialog-loader
```

### Dependencies
NPM will automatically installs and configures this module's dependencies for you. However, if you manually install this module without using NPM, you will also need to manually install these dependencies:

* [dialog-polyfill](https://github.com/GoogleChrome/dialog-polyfill)
* dialogLoader requires [SystemJS](https://github.com/systemjs/systemjs) and will only work with v0.19.x or earlier, as it uses its `System.import()` method to load modules.
* [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## CSS Notes
Include the following CSS in a project to prevent unwanted IE issues:
```
.dialog {
  &:not([open]) {
    display: none;
  }
}
```

## Browser Support
dialogLoader depends on the following browser APIs:

+ forEach: [Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) | [Polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill) -- only necessary if IE9 is a supported browser on your project

To support legacy browsers, you'll need to include polyfills for the above APIs.
