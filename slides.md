<!-- .slide: data-background="./reveal.js/img/title.png" -->

<!-- Presenter: Matt -->
# ArcGIS API 4.0 for JavaScript: Patterns and Best Practices

![qr](./images/qr.jpg)

### Kelly Hutchins – [@kellyhutchins](https://twitter.com/kellyhutchins)
### Matt Driscoll – [@driskull](https://twitter.com/driskull)

---

![Welcome](./images/welcome.gif)

---

# Agenda

- 4x Goals
- 3x &#8594; 4x Migration
- 4x Signifigant changes
- 4x Best Practices
- Resources

---

# Goals: 4x JavaScript API

- 2D/3D Visiualization
  - web maps and scenes
- Improved developer experience
  - consistency
  - predictable
  - promises
- Widgets
  - Modernize
  - Library/Framework agnostic
  - User experience
- Enhance documentation
- Improve integration with Portal
- Use cutting edge browser features

---

# Major Design Changes

- Map/View separation
- Widget View/ViewModel separation
- Accessor class
- Autocasting
- Popups

---

# Supported Browsers (modernization)

- Chrome
- Firefox
- Edge
- Safari 7.1+
- OS Safari
- IE11*

*The WebGL implementation of Internet Explorer is not optimized for memory-intensive applications and it might not work reliably when opening certain scenes.

---

<!-- Presenter: Kelly -->
# 4.x Migration

![Migration](./images/migration.gif)

---

## Matrix

---

## CSS Theme

---

## New SDK

---

## More to come
- Still more to do!

---

<!-- Presenter: Matt -->
# 4.x Signifigant changes

![more](./images/more.gif)

---

<!-- Presenter: Matt -->
# Signifigant changes: [Autocasting](https://developers.arcgis.com/javascript/latest/guide/autocasting/index.html)

```js
var symbol = new SimpleMarkerSymbol({
  style: "diamond",
  color: [255, 128, 45],  // No need to write new Color()
  outline: {              // No need for new SimpleLineSymbol()
    style: "dash-dot",
    color: [255, 128, 45] // Again, no need for new Color()
  }
});
```

VS

```js
var symbol = new SimpleMarkerSymbol({
  style: "diamond",
  color: new Color([255, 128, 45]),
  outline: new SimpleLineSymbol({
    style: "dash-dot",
    color: new Color([255, 128, 45])
  })
});
```

---

## Accessor

- New class inherited by most Esri classes
- Handles getting/setting properties
- Handles watching properties
- Provides a common developer experience

---

## Accessor properties

accessorClass.property = "set property";

var getter = accessorClass.property;

---

## watchUtils

Watch accessor properties instead of listening to events.

```js
watchUtils.init(accessorClass.property, function(){
 // todo
});
```

---

## Collections

// todo

---

# Signifigant changes: Promises

- Easier, more consistent way for watching load
- uses .then(), .always(), .otherwise()
- much simpler

---

## promises

### 3.x
```javascript
// map loaded
if (map.loaded) {
  init();
} else {
  on.once(map, 'load', init);
}

```

### 4.x
```javascript
view.then(init);

```

---

### Loadable

// todo what is loadable

---

### Layer Loadable

---

## Layer/LayerView

---

## FeatureLayer

todo: needs to be after layerview

- Has a LayerView
- FeatureLayerView
- Create from portal item
- Create from array of graphics
- Client definitionExpression support

---

## Graphics Layer

---

## Group Layer

---

# Signifigant changes: Widgets

esri dijits are now widgets

---

##  Theming

- Sass 

---

<!-- Presenter: Kelly -->
# Signifigant changes: Map

---

## Basemaps

todo: ask what should go here

---

# Signifigant changes: View

---

## Map & View separation

Map (data) and view (presentation) are broken apart.

### 3.x
```javascript
var map = new Map( ... );
```

### 4.x
```javascript
var myMap = new Map({
  basemap: "streets"
});
var view = new MapView({
  map: myMap,  // References a Map instance
  container: "viewDiv"  // References the ID of a DOM element
});
```

---

## Map/View separation: Multiple views

```javascript
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/views/SceneView"
], function(Map, MapView, SceneView) {

  var myMap = new Map({
    basemap: 'streets'
  });

  var 2dView = new MapView({
    map: myMap
  });

  var 3dView = new SceneView({
    map: myMap
  });
});
```

---

## Map/View separation: Camera

---

## Map/View separation: Navigation

view.goTo()

---

## Map/View separation: Demo

todo: Demo webmap with 2d/3d view

---

# Signifigant changes: Webmap + Webscene

---

## Webmap

---

<!-- Briefly -->
## WebScene

---

# Signifigant changes: Portal

---

<!-- Briefly -->
## Portal changes

todo: ask what should go here?

---

<!-- Presenter: Matt -->
# 4.x Best practices & tips

![changes](./images/changes.gif)

---

## Accessor

- Accessor.get("my.property.here");

---

## Widget best practices

---

## deprecated stuff

- no need for some things
      - lang.hitch, use .bind(this)
      - ie11+
      - border containers, form widgets. Just use flexbox or native input elements
      - dojo/base/array. Use native array functions.

---

## Renamed constant string values

- `simplemarkersymbol` &#8594; `simple-marker-symbol`
- `picturemarkersymbol` &#8594; `picture-marker-symbol`
- `simplelinesymbo`l &#8594; `simple-line-symbol`

---

<!-- (responsive, etc, detailed) -->
## Cleaner stuff

- 1 Popup: Popups/PopupTemplates

---

<!-- Presenter: Kelly -->
## Responsive General changes

---

## View padding

---

## UI Components

---

<!-- Presenter: Kelly + Matt -->
# Additional Resources

- Geonet/support/rene/github/sass (Kelly)
- [Documentation - 4.0 beta](https://developers.arcgis.com/javascript/beta/)
- [4x What's new](https://developers.arcgis.com/javascript/latest/guide/whats-new/index.html)
- [4x FAQ](https://developers.arcgis.com/javascript/latest/guide/faq/index.html)

---

# Get The Code

## [bit.ly/4xpatterns](http://bit.ly/4xpatterns)

![code](./images/code.gif)

---

# Please take our survey

## Your feedback allows us to help maintain high standards and to help presenters

![Rate us](./images/rate-us.png)

---

# Questions?

![questions](./images/questions.gif)

---

![Thanks](./images/thanks.gif)

---

<!-- .slide: data-background="./reveal.js/img/end.png" -->
