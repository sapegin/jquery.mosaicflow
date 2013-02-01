# Mosaic Flow

Pinterest like responsive image grid for jQuery that doesn’t sucks. See [live example](http://sapegin.github.com/jquery.mosaicflow/).


## Features

- Simple and easy to install.
- Responsive (shows as many columns as needed).
- Very fast.
- You can add some HTML: info overlay for example.


## Installation

Include jQuery and `jquery.mosaicflow.js` onto your page:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="jquery.mosaicflow.js"></script>
```

Add some CSS for column layout and to make your content responsive:

```css
.mosaicflow__column {
	float:left;
	}
.mosaicflow__item img {
	display:block;
	width:100%;
	height:auto;
}
```

Add `.mosaicflow` CSS class to your content’s contaier:

```html
<div class="clearfix mosaicflow">
	<div class="mosaicflow__item">
		<img width="500" height="300" src="1.jpg" alt="">
	</div>
	<div class="mosaicflow__item">
		<img width="500" height="500" src="2.jpg" alt="">
	</div>
	…
</div>
```

Image sizes should be specified in HTML.


## Configuration and manual initialization

You can difine options via HTML data attributes or via JavaScript object (manual initialization).

```html
<div class="clearfix mosaicflow" item-selector=".item" min-item-width="300">
```

```javascript
$('#mycontainer').mosaicflow({
	itemSelector: '.item'
	minItemWidth: 300
});
```

Don’t add `.mosaicflow` class when you manually initialize Mosaic Flow—it will make Mosaic Flow initializes twice.

Note that option names in JavaScript should be in camelCase but in HTML it should be data-attributes-with-dashes.


### Options

`itemSelector` (default: `> *`)

jQuery selector of content item.

`columnClass` (default: `mosaicflow__column`)

CSS class of column element.

`minItemWidth` (default: 240)

Minimun item (or column) width. Decrease this number if you want more columns, or increase if you want less.


## Events

`mosaicflow-layout`

Fire on every layout change: initialization or change number of columns after window resize.


---

## License

The MIT License, see the included `License.md` file.