(function () {
    
    var bl1 = new ol.layer.Tile({
    // A layer must have a title to appear in the layerswitcher
    title: 'Terrain',
    // Again set this layer as a base layer
    type: 'base',
    visible: false,
    source: new ol.source.Stamen({
        layer: 'terrain'
    })
    });

    var bl3 = new ol.layer.Tile({
        title: 'Satellite',
        type: 'base',
        visible: false,
        source: new ol.source.XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          maxZoom: 19
        })
      });

    var bl2 = new ol.layer.Tile({
    // A layer must have a title to appear in the layerswitcher
    title: 'OSM',
    // Again set this layer as a base layer
    type: 'base',
    visible: true,
    source: new ol.source.OSM()
    });

    var baselayers = new ol.layer.Group({
        title: 'Basemaps',
        fold: 'open',
        layers: [bl1,bl3,bl2]
    });
    // Create a group for overlays. Add the group to the map when it's created
    // but add the overlay layers later
    var overlayGroup = new ol.layer.Group({
      title: 'Overlays',
      fold: 'open',
      layers: []
    });
  
    // Create a map containing two group layers
    var map = new ol.Map({
      target: 'map',
      layers: [baselayers,overlayGroup],
      view: new ol.View({
        center: ol.proj.fromLonLat([11.25,48.20]),
        zoom: 12
      })
    });
  
    // Create a LayerSwitcher instance and add it to the map
    var layerSwitcher = new ol.control.LayerSwitcher();
    map.addControl(layerSwitcher);
  
    // Add a layer to a pre-exiting ol.layer.Group after the LayerSwitcher has
    // been added to the map. The layer will appear in the list the next time
    // the LayerSwitcher is shown or LayerSwitcher#renderPanel is called.


    overlayGroup.getLayers().push(
        new ol.layer.Tile({
            title: 'Munich Full NDVI',
            visible: false,
              source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/sar4ndvi/wms',
                params: {'LAYERS': 'sar4ndvi:Munich_Full_NDVI', 'TILED': false},
                // serverType: 'geoserver',
                // // Countries have transparency, so do not fade tiles:
                // transition: 0
              })
            })
       

    );

    overlayGroup.getLayers().push(
        new ol.layer.Tile({
            title: 'Munich Clip NDVI',
            visible: true,
              source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/sar4ndvi/wms',
                params: {'LAYERS': 'sar4ndvi:Clip_NDVI', 'TILED': true},
                // serverType: 'geoserver',
                // // Countries have transparency, so do not fade tiles:
                // transition: 0
              })
            })
       

    );

  })();