<!-- .slide: data-background="./reveal.js/img/title.png" -->

<!-- Presenter: Matt -->
# ArcGIS API 4.0 for JavaScript: Patterns and Best Practices

### Kelly Hutchins – [@kellyhutchins](https://twitter.com/kellyhutchins)
### Matt Driscoll – [@driskull](https://twitter.com/driskull)

---

# Welcome

![Welcome][https://media.giphy.com/media/aCpvwi2tuFQUE/giphy.gif]

---

# Overview

- 4x Goals
- Migration
- Signifigant changes
- Best Practices
- Resources

---

## Goals: 4x JavaScript API

- 2D/3D Visiualization
  - web maps and scenes
- Improved developer experience
  - consistency
  - promises
- Widget and API redesigns
  - Model/View Model separation
  - Library/Framework agnostic
- Documentation enhancements
- Integration with Portal
- Use cutting edge features

---

## Major Design Changes

- Map/View separation
- Widget View/ViewModel separation

---

## Supported Browsers (modernization)

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

---

## Autocasting

---

## Map/View separation

Separation of data vs presentation

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
require(["esri/Map", "esri/views/MapView", "esri/views/SceneView", "dojo/domReady!"], function(Map, MapView) {

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

## FeatureLayer


---

### Loadable

---

##  Theming

- Sass 

---

<!-- Briefly -->
## Portal changes

---

## Basemaps

---

## Accessor

---

<!-- Presenter: Kelly -->
## Graphics Layer

---

## watchUtils

---

## Collections

---

## Responsive General changes

---

## Layer/LayerView

---

## Webmap

---

<!-- Briefly -->
## WebScene

---

## UI Components

---

# 4.x Best practices & tips

---

## View padding

---

## UI Components

---

<!-- Presenter: Matt -->
## New widget stuff

---

## deprecated stuff

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

<!-- (responsive, etc, detailed) -->
## Cleaner stuff

- 1 Popup: Popups/PopupTemplates

---

<!-- Presenter: Kelly + Matt -->
# Additional Resources

- Geonet/support/rene/github/sass (Kelly)
- [Documentation - 4.0 beta](https://developers.arcgis.com/javascript/beta/)

---

# Please take our Survey

## Your feedback allows us to help maintain high standards and to help presenters

![Rate us](./images/rate-us.png)

---

# Q & A

Questions?

---

<!-- .slide: data-background="./reveal.js/img/end.png" -->
