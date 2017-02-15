# String Change Detector
[![Build Status](https://travis-ci.org/convergencelabs/string-change-detector.svg?branch=master)](https://travis-ci.org/convergencelabs/string-change-detector)

This module provides a set of utilities to bind plain HTML Input / Form Elements to a Convergence model. The module provides simple two way data binding between the HTML input element and a particular field in the Convergence data model. The module currently supports the following input elements:



## Installation
`npm install --save @string-change-detector`
<br/> 
or
<br/>
`npm install --save-dev @convergence/string-change-detector`

## Example Usage

```JavaScript
const detector = new StringChangeDetector({
  value: "Hello World",
  onInsert: function(index, value) {
    console.log("'" + value + "' was inserted at index " + index);
    console.log("The value is now: '" + detector.getValue() + "'");
  }, onRemove: function(index, length) {
    console.log(length + " characters were removed at index " + index);
    console.log("The value is now: '" + detector.getValue() + "'");
  }
});

detector.processNewValue("Hello Jim");
```

Outputs:

```
5 characters were removed at index 6
The value is now: 'Hello '
'Jim' was inserted at index 6
The value is now: 'Hello Jim'
```

## API
```JavaScript
constructor(options)
```
Constructs a new StringChangeDetector.

```JavaScript
insertText(index, value)
```
Updates the current value by inserting characters at the specified index.

```JavaScript
removeText(index, length)
```
Removes the specified number of characters at the specified index.
  
```JavaScript
setValue(value)
```
Sets the current value.
  
```JavaScript
getValue()
```
Gets the current value of the string.

```JavaScript
processNewValue(newValue)
```
Processes a new string that is the result of a single modification from the current value.  Will fire the onInsert and onRemove callbacks as appropriate.
