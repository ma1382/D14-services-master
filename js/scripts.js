//instantiate map into container with set view, turn off scroll wheel
var map = L.map('mapcontainer', {
	scrollWheelZoom: false,
}).setView([40.848132, -73.901580], 14);

//add a light basemap from carto's free basemaps 
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
      }).addTo(map);


// load GeoJSON from an external file
    /*$.getJSON("health_hs.geojson",function(data){

    
// add GeoJSON layer to the map once the file is loaded
    var HHS = L.geoJson(data).addTo(map);
});*/

// load GeoJSON from an external file
   /* $.getJSON("polygon2.geojson",function(data){

    
// add GeoJSON layer to the map once the file is loaded
    var studyarea = L.geoJson(data).addTo(map);
});
*/

// load GeoJSON from an external file
   /* $.getJSON("cc_14_copy.geojson",function(data){
   
	// add GeoJSON layer to the map once the file is loaded
    var cc_14 = L.geoJson(data).addTo(map);
	});
	*/

//define style for poverty

function getColor(d) {
	return 	d > 46 ?    '#B13f64' :
            d > 35 ?    '#D55d6a' :
            d > 23 ?    '#Ea8171' :
            d > 11 ?    '#F3aa84' :
                        '#F6d2a9';
    }

function mystyle1(feature){
	return{
		fillColor: getColor(feature.properties.perpov),
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.8
	};
}

//add poverty rate to map
var bronxpov = L.geoJson(bxpoverty, {style: mystyle1}).addTo(map);



//set up styles for percent disability

function getColor2(d) {
	return 	d > 84 ?  '#006D2C' :
            d > 62 ?  '#2CA25F' :
            d > 40 ?  '#66C2A4' :
            d > 22 ?  '#B2E2E2' :
                      '#EDF8FB';
                    
}

function mystyle2(feature){
	return{
		fillColor: getColor2(feature.properties.perc_disab),
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7
	};
}

//add disabilities to map
var disab = L.geoJson(bronxdisab, {style: mystyle2}).addTo(map);

//add study area polygon to map 
var jeromestudyarea = L.geoJson(studyarea).addTo(map);

//add CC14 polygon to map
var councildistrict = L.geoJson(cc_14).addTo(map);


var HHSmarkers = L.geoJson(health_hs, {
    pointToLayer: function (feature, latlng) {
      var geojsonMarkerOptions = {
        radius: 3,
        fillColor: "black",
        color: "gray",
        weight: 2,
        opacity: .05,
        fillOpacity: 0.8,
        z: 1
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);

//define base and overlay layers for control
var baseLayers = {
	"Percent in Poverty": bronxpov,
	"Percent with Disability": disab
	
};
var overlays = {
	"Jerome Ave Study Area": jeromestudyarea,
	"City Council District 14": councildistrict
	
};


//add control to map
L.control.layers(baseLayers,overlays,{
    collapsed:false,
    position:'topright'
}).addTo(map);


// Set up an invisible HHS layer and bind popup
var HHSinfo = L.geoJson(health_hs, {
	opacity: 0,
	fillOpacity: 0
}).bindPopup(function (layer) {
    return (layer.feature.properties.facname +
    		'</br> Type of Service: ' + layer.feature.properties.factype +
    		'</br> Address: ' + layer.feature.properties.address + 
    		', Bronx, NY ' + layer.feature.properties.zipcode); // +
}).addTo(map);


// reset view
    $('.reset').on('click', function() {
    // alert('#')
    map.flyTo([40.848132, -73.901580], 14);

     console.log("hello");
});