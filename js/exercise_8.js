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
  var jsonPayload = JSON.stringify({
    locations:[
      {lat: frm[1], lon: frm[0]},
      {lat: to[1], lon: to[0]}
    ],
    costing: 'pedestrian',
    units: 'miles'
  })
  $.ajax({
    url:'http://valhalla.mapzen.com/route',
    data:{
      json: jsonPayload,
      api_key: 'valhalla-gwtf3x2'
    }
  }).done(function(data){
    var routeShape = polyline.decode(data.trip.legs[0].shape);
    routeLine.setGeoJSON({
      type:'Feature',
      geometry:{
        type:'LineString',
        coordinates: routeShape
      },
      properties:{
        "stroke": '#ed23f1',
        "stroke-opacity": 0.8,
        "stroke-width": 8
      }
    })
   $('#directions').fadeIn(400, function(){
      $('#summary').empty();
      $('#distance').text((Math.round(data.trip.summary.length * 100) / 100) + data.trip.units);
      $('#time').text((Math.round(data.trip.summary.time / 60 * 100) / 100) + ' min');

      data.trip.legs[0].maneuvers.forEach(function(item){
        var direction = '';
        direction += '<li class="instruction" data-begin=' + item.begin_shape_index + ' data-end=' + item.end_shape_index + '>';
        if(item.verbal_post_transition_instruction) direction += '<p class="post-transition">' + item.verbal_post_transition_instruction + '</p>';
        if(item.verbal_pre_transition_instruction) direction += '<p class="pre-transition">' + item.verbal_pre_transition_instruction + '</p>';
        direction += '</li>';
        $('#summary').append(direction);
      })
    })
map.on('click', function(){
  routeLine.clearLayers();
})

}
