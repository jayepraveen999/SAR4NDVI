(function () {


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
        layers: [bl2]
    });



    var layer1 = new ol.layer.Tile({
        title: 'Munich_Full_NDVI',
            visible: false,
              source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {'LAYERS': 'sar4ndvi:Munich_Full_NDVI', 'TILED': false},
                // serverType: 'geoserver',
                // // Countries have transparency, so do not fade tiles:
                // transition: 0
              })

    })

    var layer2 = new ol.layer.Tile({
        title: 'Clip_NDVI',
            visible: true,
              source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {'LAYERS': 'sar4ndvi:Clip_NDVI', 'TILED': false},
                // serverType: 'geoserver',
                // // Countries have transparency, so do not fade tiles:
                // transition: 0
              })

    })
    // Create a group for overlays. Add the group to the map when it's created
    // but add the overlay layers later
    // var overlayGroup = new ol.layer.Group({
    //   title: 'Cloudy Images',
    //   fold: 'open',
    //   layers: [layer1]
    // });

    var overlayGroup = new ol.layer.Group({
        title: 'Cloudy Images',
        fold: 'open',
        layers: [layer1, layer2]
      });
  
    // Create a map containing two group layers
    var map = new ol.Map({
      target: 'map',
      layers: [baselayers, overlayGroup],
      view: new ol.View({
        center: ol.proj.fromLonLat([11.25,48.20]),
        zoom: 12
      })
    });
  
    var layerSwitcher = new ol.control.LayerSwitcher();
    map.addControl(layerSwitcher);


    var fullsc = new ol.control.FullScreen({'label': 'FS'});
    map.addControl(fullsc);

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



  map.on('click', function (evt) {

    document.getElementById('data').innerHTML = '';
    document.getElementById('myChart').innerHTML = '';

    var no_layers = overlayGroup.getLayers().get('length');
    var viewResolution = map.getView().getResolution();
    var proj = map.getView().getProjection()
    var url = new Array();
    var wmsSource = new Array();
    var layer_title = new Array();
    var x_array = [];
    const y_array = [];

    // var z_array = new Array();

    var i;
    for (i = 0; i < no_layers; i++) {
        //alert(overlays.getLayers().item(i).getVisible());
        var visibility = overlayGroup.getLayers().item(i).getVisible();
        //alert(visibility);
        if (visibility == true) {
            //alert(i);
            layer_title[i] = overlayGroup.getLayers().item(i).get('title');
            x_array.push(layer_title[i]);
            // alert(layer_title[i]);
            wmsSource[i] = new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {
                    'LAYERS': layer_title[i]
                },
                serverType: 'geoserver',
                crossOrigin: 'anonymous'
            });
// Below code for html/text output

            url[i] = wmsSource[i].getFeatureInfoUrl(
                evt.coordinate, viewResolution, proj, {
                    'INFO_FORMAT': 'text/html'
                });

                // if (url[i]) {
                //     fetch(url[i])
                //       .then((response) => response.text())
                //       .then((html) => {
                //         console.log(html)
                //         document.getElementById('data').innerHTML += html;
                //       });
                //   }
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
                        // y_array.push(data2);
                        // console.log(y_array);
                        // var obj = data;
                        // obj.features[]
                        document.getElementById('data').innerHTML += data2;
                        y_array.push(data2);

                      }).then(()=>{

                                console.log(y_array);
                                new Chart("myChart", {
                                    type: "line",
                                    data: {
                                      labels: x_array,
                                      datasets: [{
                                        fill: true,
                                        lineTension: 0,
                                        backgroundColor: "rgba(0,0,255,1.0)",
                                        borderColor: "rgba(0,0,255,0.1)",
                                        data: y_array
                                      }]
                                    },
                                    options: {
                                      legend: {display: true},
                                      scales: {
                                        yAxes: [{
                                            type: 'linear',
                                            grace: '5%'
                                          }],
                                      }
                                    }
                                  });

                        
                    })
           

                //   (async () => {                  
                //     const response = await fetch(url[i]);
                //     const data = await response.json();
                //     const data2 = await data.features[0].properties.NDVI_Value;
                //     y_array.push(data2);
                //     // console.log(y_array);
                    
                    
                //   })()
                      
                      
            
            //   y_array.push(data2.properties.NDVI_Value);

        }}
        // console.log(y_array);

        console.log(x_array);

        // // // var z = [0.4745149612426758,0.4745149612426758]


        var xValues = [50,60,70,80,90,100,110,120,130,140,150];
        var yValues = [7,8,8,9,9,9,10,11,14,14,15];
        new Chart("myChart", {
            type: "line",
            data: {
              labels: x_array,
              datasets: [{
                fill: true,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: y_array
              }]
            },
            options: {
              legend: {display: true},
              scales: {
                yAxes: [{
                    type: 'linear',
                    grace: '5%'
                  }],
              }
            }
          });

  });

  
  


  })
  ();


