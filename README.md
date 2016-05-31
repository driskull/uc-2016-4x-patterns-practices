# ArcGIS API 4.0 for JavaScript: Patterns and Best Practices

The ArcGIS API 4.0 for JavaScript is our next-generation web technology for building interactive, compelling web applications that run across any device. There are significant changes to the object model and programming patterns to enable a cleaner, more productive developer experience. Come to this session if you plan to migrate a JS app to the new API, or plan to write one from scratch. You will learn about key aspects of the new API design, and best practices for developing with the API.

http://arcgis.github.io/uc-2016-4x-patterns-practices/#/

# Cover

- Intro / philosophy
  - responsive
- Disclaimers
  - gotchas
  - browser requirements
- 4x signifigant changes?
    - FeatureLayer query vs FeatureLayerView query
    - Hit Test 
    - Events vs watching properties
    - Lots of promises. using .then() instead of waiting for ready or loaded. promiseUtils
      ```
      // map loaded
      if (map.loaded) {
        init();
      } else {
        on.once(map, 'load', init);
      }
      ```
      ```
      view.then(init);
      ```
    - Portal API different - Helper services, proxy, etc have defaults
    - main.css and themes vs just esri.css
    - esri dijits are now widgets
    - dijit theme required if using dojo dijits
    - no need for some things
      - lang.hitch, use .bind(this)
      - ie11+
      - border containers, form widgets. Just use flexbox or native input elements
      - dojo/base/array. Use native array functions.
  - Some widgets renamed
  - Some widgets not converted yet
  - Watch accessor properties instead of listening to events.
  - Accessor.get("my.property.here");
  - watchUtils
  - collections, layers in view
  - SASS for theming
- Cleaner stuff
- How people can be more productive
- migration best practices
-   * Point out 3x - 4x matrix - helps figure out 'new' class names https://developers.arcgis.com/javascript/latest/guide/functionality-matrix/index.html#arcgisdynamicmapservicelayer
- Design changes
  - responsive
- Developing tips
-   *View Padding
-   * UI Components 

# Outline

- Slide 1
- Slide 2
