# Mosaic Flow

[![Powered by You](http://sapegin.github.io/powered-by-you/badge.svg)](http://sapegin.github.io/powered-by-you/)
[![Build Status](https://travis-ci.org/sapegin/jquery.mosaicflow.svg)](https://travis-ci.org/sapegin/jquery.mosaicflow)
[![Bower version](https://badge.fury.io/bo/jquery.mosaicflow.svg)](http://badge.fury.io/bo/jquery.mosaicflow)

Pinterest like responsive image or HTML grid for jQuery that doesn’t suck. See [live example](http://sapegin.github.com/jquery.mosaicflow/).


## Features

- Simple and easy to install.
- Responsive (shows as many columns as needed).
- Very fast.
- Only 1.5 KB (minified gzipped).
- You can use bare `<img>` tags or arbitrary HTML.


## Installation

Include jQuery and `jquery.mosaicflow.min.js` onto your page:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="jquery.mosaicflow.min.js"></script>
```

Add some CSS for column layout and to make your content responsive:

```css
.mosaicflow__column {
  float: left;
}
.mosaicflow__item img {
  display: block;
  width: 100%;
  height: auto;
}
```

Add `.mosaicflow` CSS class to your content’s contaier:

```html
<div class="clearfix mosaicflow">
  <div class="mosaicflow__item">
    <img src="1.jpg" width="500" height="300" alt="">
  </div>
  <div class="mosaicflow__item">
    <img src="2.jpg" width="500" height="500" alt="">
  </div>
  …
</div>
```

Image sizes should be specified in HTML in conjunction with option `itemHeightCalculation = 'attribute'` for even a better performance.


You can also use custom HTML as items:

```html
<div class="clearfix mosaicflow">
  <div class="mosaicflow__item">
    <h4>Lorem ipsum dolor sit amet</h4>
    <p>Excepteur sint occaecat cupidatat non proident</p>
  </div>
  <div class="mosaicflow__item">
    <h4>Lorem ipsum dolor sit amet</h4>
    <p>Excepteur sint occaecat cupidatat non proident</p>
  </div>
  …
</div>
```



## Configuration and manual initialization

You can define options via HTML data attributes or via JavaScript object (manual initialization).

```html
<div class="clearfix mosaicflow" data-item-selector=".item" data-min-item-width="300">
```

```javascript
$('#mycontainer').mosaicflow({
  itemSelector: '.item',
  minItemWidth: 300
});
```

Don’t add `.mosaicflow` class when you manually initialize Mosaic Flow—it will ignore options specified through Javascript.

Note that option names in JavaScript should be in camelCase but in HTML it should be data-attributes-with-dashes.


### Options

#### `itemSelector` (default: `> *`)

jQuery selector of content item.

#### `columnClass` (default: `mosaicflow__column`)

CSS class of column element.

#### `minColumns` (default: `2`)

Minimum number of columns. Especially useful for mobile devices.

#### `minItemWidth` (default: `240`)

Minimum item (or column) width. Decrease this number if you want more columns, or increase if you want less.

#### `itemHeightCalculation` (default: `auto`)

Method of calculation items’ heights:

* `auto`—will calculate automatically each item’s height after being placed in a column, so it is smart enough if your items are responsive and height is being modified as width is (which will happen as columns shrink or expand).

* `attribute`—will try to grab the value placed in `height` attribute of `<img>` tags when these are used as items. This is faster than `auto` because no calculation is done.


### Events

#### `mosaicflow-layout`

Fire on every layout change: initialization or change number of columns after window resize.

#### `mosaicflow-start` / `mosaicflow-ready`

Fire before / after the mosaicflow init it's work.

#### `mosaicflow-fill` / `mosaicflow-filled`

Fire before / after reorganized columns.

#### `mosaicflow-item-add` / `mosaicflow-item-added`

Fire before / after adding items.

#### `mosaicflow-item-remove` / `mosaicflow-item-removed`

Fire before / after removing items.


### Methods

#### `add`

Add any html element into next smallest column.

Example:

```javascript
// Init mosaicflow
var container = $('#mycontainer').mosaicflow();

// Create new html node and append to smallest column
var elm = $('<div>A new added element</div>');
container.mosaicflow('add', elm);
```

#### `remove`

Remove a given element from its column and updates columns height accordingly. It does not removes the node, just detaches it from document.
Example:

```javascript
// Init mosaicflow
var container = $('#mycontainer').mosaicflow();

// Select the desired element to be removed
var elm = $('#item-3');

// Tell mosaicflow to detach element from its column
container.mosaicflow('remove', elm);

// Now you can place detached node in another location or remove it if you don't need it anymore.
elm.remove();
```


## Release History

The changelog can be found in the `Changelog.md` file.

---

## License

The MIT License, see the included `License.md` file.
