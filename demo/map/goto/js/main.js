require([
  "esri/core/watchUtils",
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "esri/PopupTemplate",
  "esri/renderers/UniqueValueRenderer",
  "esri/symbols/SimpleMarkerSymbol",
  "dojo/dom-construct",
  "dojo/on",
  "dojo/dom",
  "dojo/domReady!"
], function(watchUtils, Map, FeatureLayer, MapView, PopupTemplate, UniqueValueRenderer,
  SimpleMarkerSymbol, domConstruct, on, dom) {

  // Symbol for beaches with Lifeguards
  var lifeSym = new SimpleMarkerSymbol({
    size: 14,
    color: "#4AB541",
    width: 7,
    outline: { // Autocasts as new SimpleLineSymbol()
      color: [255, 255, 255, 0.50], // Autocasts as new Color()
      width: 2
    }
  });

  // Symbol for beaches without Lifeguards
  var nolifeSym = new SimpleMarkerSymbol({
    size: 14,
    color: "#E17D1E",
    width: 7,
    outline: { // Autocasts as new SimpleLineSymbol()
      color: [255, 255, 255, 0.50], // Autocasts as new Color()
      width: 2
    }
  });

  /******************************************************************
   *
   * Set each unique value directly in the renderer's constructor.
   * At least one field must be used (in this case the "Lifeguards" field).
   * Good sample to check out,
   * https://developers.arcgis.com/javascript/latest/sample-code/visualization-location-types/index.html

   *
   ******************************************************************/

  var beachRenderer = new UniqueValueRenderer({
    defaultSymbol: lifeSym,
    defaultLabel: "Beaches with lifeguards",
    field: "Lifeguards",
    uniqueValueInfos: [{
      value: "Y",
      symbol: lifeSym,
      label: "Beaches with lifeguards"
    }, {
      value: "N",
      symbol: nolifeSym,
      label: "Beaches without lifeguards on duty"
    }]
  });

  var popupTemplate = new PopupTemplate({
    title: "<b>Beach: {NAME}</b>",
    // Step 2: Specify the content, first set the display fields
    content: [{
      type: "fields",
      fieldInfos: [{
        fieldName: "ADDRESS",
        visible: true,
        label: "Address: "
      }, {
        fieldName: "Lifeguards",
        visible: true,
        label: "Lifeguards on duty: "
      }, {
        fieldName: "Swimming",
        visible: true,
        label: "Swimming allowed: "
      }, {
        fieldName: "Surfing",
        visible: true,
        label: "Surfing allowed: "
      }, {
        fieldName: "URL",
        visible: true,
        label: "Beach website with additional info: "
      }]
    }, {
      // Step 3: Specify the second type of popup element to display, in this case, images
      // there is an "image" field in the feature service that points to an online image
      type: "media",
      mediaInfos: [{
        type: "image",
        value: {
          sourceURL: "{Image}"
        }
      }]
    }]
  });

  // Create beaches featurelayer and set the renderer on the layer
  var beaches = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/San_Diego_Beaches/FeatureServer/0",

    // Specify the outfields for the featurelayer in addition to passing in the template created above
    outFields: ["*"],
    popupTemplate: popupTemplate,

    // set renderer
    renderer: beachRenderer
  });

  // Create Neighborhoods featurelayer and set opacity on layer
  var hoods = new FeatureLayer({
    url: "http://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0",
    // set opacity
    opacity: 0.50
  });

  var map = new Map({
    basemap: "topo",
    layers: [beaches, hoods]
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 12,
    center: [-117.16866016384272, 32.776725339767964],

    //Set the popup property in the MapView so that docking is enabled
    // and dockoptions are set. In this case, the popup can be docked to the
    //bottom right of the application.
    popup: {
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: true,
        position: "bottom-right"
      }
    }
  });
  view.ui.add(dom.byId("container"), "top-right");
  /******************************************************************
   *
   * LayerFilter example
   *
   ******************************************************************/

  var hoodsLayerView;
  var featuresMap = {};

  view.whenLayerView(hoods).then(function(lyrView) {
    hoodsLayerView = lyrView;
    // Step 2: Make sure that the layer is not updating and currently fetching data
    return watchUtils.whenFalseOnce(hoodsLayerView, "updating");
  })
    .then(function() {
      // Step 3: Query all features in the layerview and return the results
      return hoodsLayerView.queryFeatures();
    })
    .then(function(features) {
      // Step 4: Build a dropdown for each unique value in Neighborhood field
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

  // Step 4: Listen for the change event on the dropdown
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
