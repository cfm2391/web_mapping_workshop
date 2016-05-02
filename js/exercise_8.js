// exercise 8
var myLocation = L.mapbox.featureLayer().addTo(map);
map.on('locationfound', function(e) {

    myLocation.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });

});
map.locate({setView:true});
var routeLine = L.mapbox.featureLayer().addTo(map);
function getDirections(frm, to){
     var jsonPayLoad = JSON.stringify({
         locations: [
           {lat: frm[1]  lon: frm[0]},
           {lat: to[1], lon: to[0]}}
         ],
         costing: 'pedestrian',
         units: 'miles'
     })
     $.ajax({
         url: 'http://valhalla.mapzen.comn/route',
         data: {
             json: jsonPayLoad,
             api_key: 'valhalla-gwtf3x2'
         }
     }).done(function(data){
          var routeShape = polyLine.decode(data.trip.legs[0].shape);
          routeLine.setGeoJSON({
              type: 'Feature',
              geometry: {
                  type: 'LineString',
                  coordinaes: routeShape
              },
              properties: {
                   "stroke: "#ed23f1",
                   "stroke-opacity": 0.8,
                   "stroke-width": 8
              }
    
          })    
      })
}
