(function () {


  var x_array;
  var y_array;
  var z_array;
    
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
        fold: 'close',
        layers: [bl1,bl3,bl2]
    });
    
// Code to add one sentinel 1 data from geoserver (just for showing)

    var sen1 = new ol.layer.Tile({
            title: '2019_01_10',
            visible: true,
            source: new ol.source.TileWMS({
             url: 'http://localhost:8080/geoserver/wms',
             params: {'LAYERS': 'SAR4NDVI_Sentinel_1:2019_01_10', 'TILED': false},
          // serverType: 'geoserver',
          // // Countries have transparency, so do not fade tiles:
          // transition: 0
        })

})
    var sen1_layers = new ol.layer.Group({
      title: 'Sentinel 1 Data',
      fold: 'open',
      layers: [sen1]
  });
    // Create a group for overlays. Add the group to the map when it's created
    // but add the overlay layers later
    var overlayGroup = new ol.layer.Group({
      title: 'Cloudy Images',
      fold: 'open',
      layers: []
    });

    var overlayGroup2 = new ol.layer.Group({
      title: 'Cloud Free Images',
      fold: 'open',
      layers: []
    });
  
    // Create a map containing two group layers
    var map = new ol.Map({
      target: 'map',
      layers: [baselayers,sen1_layers,overlayGroup,overlayGroup2],
      view: new ol.View({
        center: ol.proj.fromLonLat([ -119.290701,36.261098]),
        zoom: 9
      })
    });
  
    // Create a LayerSwitcher instance and add it to the map
    var layerSwitcher = new ol.control.LayerSwitcher();
    map.addControl(layerSwitcher);


    var fullsc = new ol.control.FullScreen({'label': 'FS'});
    map.addControl(fullsc);
  
    // Add a layer to a pre-exiting ol.layer.Group after the LayerSwitcher has
    // been added to the map. The layer will appear in the list the next time
    // the LayerSwitcher is shown or LayerSwitcher#renderPanel is called.


  //   overlayGroup.getLayers().push(
  //       new ol.layer.Tile({
  //           title: '2019_01_17',
  //           visible: false,
  //             source: new ol.source.TileWMS({
  //               url: 'http://localhost:8080/geoserver/wms',
  //               params: {'LAYERS': 'SAR4NDVI_Sentinel_2:2019_01_17', 'TILED': false},
  //               // serverType: 'geoserver',
  //               // // Countries have transparency, so do not fade tiles:
  //               // transition: 0
  //             })
  //           })
       

  //   );

  //   overlayGroup.getLayers().push(
  //       new ol.layer.Tile({
  //           title: '2019_01_27',
  //           visible: false,
  //             source: new ol.source.TileWMS({
  //               url: 'http://localhost:8080/geoserver/wms',
  //               params: {'LAYERS': 'SAR4NDVI_Sentinel_2:2019_01_27', 'TILED': true},
  //               // serverType: 'geoserver',
  //               // // Countries have transparency, so do not fade tiles:
  //               // transition: 0
  //             })
  //           })
       

  //   );

  //   overlayGroup.getLayers().push(
  //     new ol.layer.Tile({
  //         title: '2019_02_11',
  //         visible: false,
  //           source: new ol.source.TileWMS({
  //             url: 'http://localhost:8080/geoserver/wms',
  //             params: {'LAYERS': 'SAR4NDVI_Sentinel_2:2019_02_11', 'TILED': true},
  //             // serverType: 'geoserver',
  //             // // Countries have transparency, so do not fade tiles:
  //             // transition: 0
  //           })
  //         })
     

  // );


  overlayGroup.getLayers().push(
    new ol.layer.Tile({
        title: '02_20190211',
        visible: false,
          source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/wms',
            params: {'LAYERS': 'SAR4NDVI_Sentinel_2:02_20190211', 'TILED': true},
            // serverType: 'geoserver',
            // // Countries have transparency, so do not fade tiles:
            // transition: 0
          })
        })
   
  
  );

  overlayGroup.getLayers().push(
    new ol.layer.Tile({
        title: '27_20191208',
        visible: false,
          source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/wms',
            params: {'LAYERS': 'SAR4NDVI_Sentinel_2:27_20191208', 'TILED': true},
            // serverType: 'geoserver',
            // // Countries have transparency, so do not fade tiles:
            // transition: 0
          })
        })
    
    
    );

    overlayGroup.getLayers().push(
      new ol.layer.Tile({
          title: '51_20200923',
          visible: false,
            source: new ol.source.TileWMS({
              url: 'http://localhost:8080/geoserver/wms',
              params: {'LAYERS': 'SAR4NDVI_Sentinel_2:51_20200923', 'TILED': true},
              // serverType: 'geoserver',
              // // Countries have transparency, so do not fade tiles:
              // transition: 0
            })
          })
      
      
      );
    
      overlayGroup.getLayers().push(
        new ol.layer.Tile({
            title: '37_20200411',
            visible: false,
              source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {'LAYERS': 'SAR4NDVI_Sentinel_2:37_20200411', 'TILED': true},
                // serverType: 'geoserver',
                // // Countries have transparency, so do not fade tiles:
                // transition: 0
              })
            })
        
        
        );

        overlayGroup.getLayers().push(
          new ol.layer.Tile({
              title: '23_20191019',
              visible: false,
                source: new ol.source.TileWMS({
                  url: 'http://localhost:8080/geoserver/wms',
                  params: {'LAYERS': 'SAR4NDVI_Sentinel_2:23_20191019', 'TILED': true},
                  // serverType: 'geoserver',
                  // // Countries have transparency, so do not fade tiles:
                  // transition: 0
                })
              })
         
        
        );

  overlayGroup.getLayers().push(
    new ol.layer.Tile({
        title: '00_20190117',
        visible: false,
          source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/wms',
            params: {'LAYERS': 'SAR4NDVI_Sentinel_2:00_20190117', 'TILED': true},
            // serverType: 'geoserver',
            // // Countries have transparency, so do not fade tiles:
            // transition: 0
          })
        })
   

);








// code for adding layers in overlay group2 

overlayGroup2.getLayers().push(
  new ol.layer.Tile({
      title: '02_20190211',
      visible: false,
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'SAR4NDVI_Sentinel_2:02_20190211', 'TILED': true},
          // serverType: 'geoserver',
          // // Countries have transparency, so do not fade tiles:
          // transition: 0
        })
      })
 

);

overlayGroup2.getLayers().push(
  new ol.layer.Tile({
      title: '27_20191208',
      visible: false,
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'SAR4NDVI_Sentinel_2:27_20191208', 'TILED': true},
          // serverType: 'geoserver',
          // // Countries have transparency, so do not fade tiles:
          // transition: 0
        })
      })
  
  
  );

  overlayGroup2.getLayers().push(
    new ol.layer.Tile({
        title: '51_20200923',
        visible: false,
          source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/wms',
            params: {'LAYERS': 'SAR4NDVI_Sentinel_2:51_20200923', 'TILED': true},
            // serverType: 'geoserver',
            // // Countries have transparency, so do not fade tiles:
            // transition: 0
          })
        })
    
    
    );
  
    overlayGroup2.getLayers().push(
      new ol.layer.Tile({
          title: '37_20200411',
          visible: false,
            source: new ol.source.TileWMS({
              url: 'http://localhost:8080/geoserver/wms',
              params: {'LAYERS': 'SAR4NDVI_Sentinel_2:37_20200411', 'TILED': true},
              // serverType: 'geoserver',
              // // Countries have transparency, so do not fade tiles:
              // transition: 0
            })
          })
      
      
      );

      overlayGroup2.getLayers().push(
        new ol.layer.Tile({
            title: '23_20191019',
            visible: false,
              source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {'LAYERS': 'SAR4NDVI_Sentinel_2:23_20191019', 'TILED': true},
                // serverType: 'geoserver',
                // // Countries have transparency, so do not fade tiles:
                // transition: 0
              })
            })
       
      
      );

overlayGroup2.getLayers().push(
  new ol.layer.Tile({
      title: '00_20190117',
      visible: false,
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'SAR4NDVI_Sentinel_2:00_20190117', 'TILED': true},
          // serverType: 'geoserver',
          // // Countries have transparency, so do not fade tiles:
          // transition: 0
        })
      })
 

);



  var menu = new ol.control.Overlay ({ 
		closeBox : true, 
		className: "slide-left menu", 
		content: $("#menu").get(0)
	});
	map.addControl(menu);

    	// A toggle control to show/hide the menu
	var t = new ol.control.Toggle(
        {	html: '<i class="fa fa-bars" ></i>',
            className: "menu",
            title: "Menu",
            onToggle: function() { menu.toggle(); }
        });
    map.addControl(t);



// code for legend:

    function legend() {

      $('#legend').empty();
  
      var nl = overlayGroup.getLayers().get('length');
      var no_layers_2 = overlayGroup.getLayers().get('length');
  
      var head = document.createElement("h4");
  
      var txt = document.createTextNode("Legend: Cloudy Images");
  
      head.appendChild(txt);

      var element = document.getElementById("legend");
      element.appendChild(head);
      var ar = [];
      var i;
      for (i = 0; i < nl; i++) {
          ar.push("http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + overlayGroup.getLayers().item(i).get('title'));
          //alert(overlays.getLayers().item(i).get('title'));
      }
      for (i = 0; i < nl; i++) {
          var head = document.createElement("p");
  
          var txt = document.createTextNode(overlayGroup.getLayers().item(i).get('title'));
          //alert(txt[i]);
          head.appendChild(txt);
          var element = document.getElementById("legend");
          element.appendChild(head);
          var img = new Image();
          img.src = ar[i];
  
          var src = document.getElementById("legend");
          src.appendChild(img);
  
      }

      
  
  }
  
  legend();

  function legend2() {

    // $('#legend').empty();

    var nl = overlayGroup2.getLayers().get('length');
    // var no_layers_2 = overlayGroup.getLayers().get('length');

    var head = document.createElement("h4");

    var txt = document.createTextNode("Legend: Cloud Free Images");

    head.appendChild(txt);

    var element = document.getElementById("legend");
    element.appendChild(head);
    var ar = [];
    var i;
    for (i = 0; i < nl; i++) {
        ar.push("http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + overlayGroup2.getLayers().item(i).get('title'));
        //alert(overlays.getLayers().item(i).get('title'));
    }
    for (i = 0; i < nl; i++) {
        var head = document.createElement("p");

        var txt = document.createTextNode(overlayGroup2.getLayers().item(i).get('title'));
        //alert(txt[i]);
        head.appendChild(txt);
        var element = document.getElementById("legend");
        element.appendChild(head);
        var img = new Image();
        img.src = ar[i];

        var src = document.getElementById("legend");
        src.appendChild(img);

    }

    

}

legend2();

//code for legend
  


    map.on('click', function (evt) {

      var viewResolution = map.getView().getResolution();
      var proj = map.getView().getProjection();

      document.getElementById('data').innerHTML = '';
      document.getElementById('data2').innerHTML = '';

      document.getElementById('myChart').innerHTML = '';
      document.getElementById('myChart2').innerHTML = '';


      var no_layers = overlayGroup.getLayers().get('length');
      var no_layers_2 = overlayGroup2.getLayers().get('length');

      var url = new Array();
      var url_2 = new Array();

      var wmsSource = new Array();
      var wmsSource_2 = new Array();

      var layer_title = new Array();
      var layer_title_2 = new Array();

      var x_array = new Array();
      var x_array_2 = new Array();


      var y_array = new Array();
      var z_array = new Array();



  
      var i;
      for (i = 0; i < no_layers; i++) {
          //alert(overlays.getLayers().item(i).getVisible());
          var visibility = overlayGroup.getLayers().item(i).getVisible();
          //alert(visibility);
          if (visibility == true) {
              //alert(i);
              layer_title[i] = overlayGroup.getLayers().item(i).get('title');
              x_array.push(layer_title[i])
              // alert(layer_title[i]);
              wmsSource[i] = new ol.source.TileWMS({
                  url: 'http://localhost:8080/geoserver/wms',
                  params: {
                      'LAYERS': layer_title[i]
                  },
                  serverType: 'geoserver',
                  crossOrigin: 'anonymous'
              });
              //alert(wmsSource[i]);
              //var coordinate2 = evt.coordinate;
              // alert(coordinate);

      // Below code for html output.

              // url[i] = wmsSource[i].getFeatureInfoUrl(
              //     evt.coordinate, viewResolution, proj, {
              //         'INFO_FORMAT': 'text/html'
              //     });
  
              //     if (url[i]) {
              //         fetch(url[i])
              //           .then((response) => response.text())
              //           .then((html) => {
              //             console.log(html)
              //             document.getElementById('data').innerHTML += html;
              //           });
              //       }

      // Below code for JSON output which is useful for graph plotting.

            url[i] = wmsSource[i].getFeatureInfoUrl(
              evt.coordinate, viewResolution, proj, {
                  'INFO_FORMAT': 'application/json'
              });

              // let data2 = [];
              fetch(url[i])
                    .then((response) => response.json())
                    .then((data) => {
                      var data2 = data.features[0].properties.NDVI_Value;
                      // var numb = 0.476879348;
                      data2 = data2.toFixed(3);
                      // y_array.push(data2);
                      // console.log(y_array);
                      // var obj = data;
                      // obj.features[]
                      // document.getElementById('data').innerHTML += data2;
                      y_array.push(data2);

                    }).then(()=>{

                              console.log(y_array);
                              new Chart("myChart", {
                                  type: "line",
                                  data: {
                                    labels: x_array,
                                    datasets: [{
                                      fill: true,
                                      fillColor: 'red',
                                      lineTension: 0,
                                      backgroundColor: "rgba(255,0,0,1.0)",
                                      borderColor: "red",
                                      data: y_array
                                    }]
                                  },
                                  options: {
                                    legend: {display: false},
                                    scales: {
                                      yAxes: [{
                                          type: 'linear',
                                          grace: '5%'
                                        }],
                                    }
                                  }
                                });

                      
                  })


  
  
          }}

      var j;
      for (j = 0; j < no_layers_2; j++) {
          //alert(overlays.getLayers().item(i).getVisible());
          var visibility = overlayGroup2.getLayers().item(j).getVisible();
          //alert(visibility);
          if (visibility == true) {
              //alert(i);
              layer_title_2[j] = overlayGroup2.getLayers().item(j).get('title');
              x_array_2.push(layer_title_2[j]);
              // alert(layer_title[i]);
              wmsSource_2[j] = new ol.source.TileWMS({
                  url: 'http://localhost:8080/geoserver/wms',
                  params: {
                      'LAYERS': layer_title_2[j]
                  },
                  serverType: 'geoserver',
                  crossOrigin: 'anonymous'
              });
              //alert(wmsSource[i]);
              //var coordinate2 = evt.coordinate;
              // alert(coordinate);


    // Below code for html output.

              // url_2[j] = wmsSource_2[j].getFeatureInfoUrl(
              //     evt.coordinate, viewResolution, proj, {
              //         'INFO_FORMAT': 'text/html'
              //     });
  
              //     if (url_2[j]) {
              //         fetch(url_2[j])
              //           .then((response) => response.text())
              //           .then((html) => {
              //             console.log(html)
              //             document.getElementById('data2').innerHTML += html;
              //           });
              //       }


    // Below code for JSON output which is useful for graph plotting.

            url_2[j] = wmsSource_2[j].getFeatureInfoUrl(
              evt.coordinate, viewResolution, proj, {
                  'INFO_FORMAT': 'application/json'
              });

              // let data2 = [];
              fetch(url_2[j])
                    .then((response) => response.json())
                    .then((data) => {
                      var data2 = data.features[0].properties.NDVI_Value;
                      data2 = data2.toFixed(3);

                      // y_array.push(data2);
                      // console.log(y_array);
                      // var obj = data;
                      // obj.features[]
                      // document.getElementById('data2').innerHTML += data2;
                      z_array.push(data2);

                    }).then(()=>{

                              console.log(z_array);
                              new Chart("myChart2", {
                                  type: "line",
                                  data: {
                                    labels: x_array_2,
                                    datasets: [{
                                      fill: true,
                                      lineTension: 0,
                                      backgroundColor: "rgba(0,255,0,1.0)",
                                      borderColor: "green",
                                      data: z_array
                                    }]
                                  },
                                  options: {
                                    legend: {display: false},
                                    scales: {
                                      yAxes: [{
                                          type: 'linear',
                                          grace: '5%'
                                        }],
                                    }
                                  }
                                });

                      
                  })
  
  
          }}
  

    });





  })

  ();


