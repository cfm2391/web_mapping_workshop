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
           {lat: frm[1], lon: frm[0]},
           {lat: to[1], lon: to[0]}
         ],
         costing: 'pedestrian',
         units: 'miles'
     })
     $.ajax({
         url: 'https://valhalla.mapzen.com/route',
         data: {
             json: jsonPayLoad,
             api_key: 'valhalla-gwtf3x2'
         }
     }).done(function(data){
          var routeShape = polyline.decode(data.trip.legs[0].shape);
          routeLine.setGeoJSON({
              type: 'Feature',
              geometry: {
                  type: 'LineString',
                  coordinates: routeShape
              },
              properties: {
                   "stroke": "#ed23f1",
                   "stroke-opacity": 0.8,
                   "stroke-width": 8
      }
    })
        
      
    $('#directions').fadeIn(400, function(){
        var summary = data.trip.summary
        $('#summary').empty();
        $('#distance').text((Math.round(summary.Length * 100)
  / 100) + data.trip.units);
        $('#time').text((Math.round(summary.time / 60 * 100) /
  100) + ' min');                        
    })     
   })
}
