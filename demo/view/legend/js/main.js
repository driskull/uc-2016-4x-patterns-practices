require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/core/watchUtils",
  "esri/widgets/Legend",
  "dojo/dom-construct",
  "dojo/on",
  "dojo/dom",
  "dojo/domReady!"
], function(WebMap, MapView, watchUtils, Legend, domConstruct, on, dom) {

  var map = new WebMap({
    portalItem: { // autocast
      id: "12843e71a82446d89a1df878312d6749"
    }
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 12,
    center: [-117.16866016384272, 32.776725339767964]
  });

  view.ui.add(dom.byId("container"), "top-right");
  /******************************************************************
   *
   * Widget example - Add legend widget
   *
   ******************************************************************/

  view.then(function() {
    var beaches = map.layers.getItemAt(1);
    // Step 1: Create the widget
    var legend = new Legend({
      // Step 2: Specify any additional properties for the legend. In this case,
      // we are just setting the view to where the legend should apply
      view: view,
      layerInfos: [{
        layer: beaches,
        title: "San Diego beaches"
      }]
    });
    // Step 3: Add the widget to the view's UI, specify the docking position as well
    view.ui.add(legend, "bottom-right");
  });
  var hoodsLayerView;
  var featuresMap = {};

  view.then(function() {
    var hoods = map.layers.getItemAt(0);

    view.whenLayerView(hoods).then(function(lyrView) {
      hoodsLayerView = lyrView;
      // Make sure that the layer is not updating and currently fetching data
      return watchUtils.whenFalseOnce(hoodsLayerView, "updating");
    })
      .then(function() {
        // Step 3: Query all features in the layerview and return the results
        return hoodsLayerView.queryFeatures();
      })
      .then(function(features) {
        //  Build a dropdown for each unique value in Neighborhood field
        features.forEach(function(feature) {
          var featureId = feature.attributes.OBJECTID_1;
          var uniqueVal = feature.attributes.NAME;
          domConstruct.create("option", {
            value: featureId,
            innerHTML: uniqueVal
          }, "selectNeighborhood");

          featuresMap[featureId] = feature;
        });
      });

    // Listen for the change event on the dropdown
    // and set the layer's definition expression to the chosen value
    var select = dom.byId("selectNeighborhood");
    on(select, "change", function(e) {
      var featureId = select.value;
      var expr = select.value === "" ? "" : "OBJECTID_1 = '" + featureId + "'";
      hoods.definitionExpression = expr;

      // Navigate to the selected feature;
      view.goTo(featuresMap[featureId]);
    });

  });
});
