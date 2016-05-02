// exercise 7
var clickHandler = function(e){
  $('#info').empty();

  var feature = e.target.feature;

  $('#info').fadeIn(400,function(){
    var info = '';

    info += '<div>'
    info += '<h2>' + feature.properties.name + '</h2>'
    if(feature.properties.phone) info +=   '<p>'  + feature.properties.cuisine + '</p>'
    if(feature.properties.phone) info +=   '<p>'  + feature.properties.phone + '</p>'
    if(feature.properties.phone) info +=   '<p><a href="' + feature.properties.website + '">'  + feature.properties.website + '</a></p>'
    info += '</div>'

    $('#info').append(info);
  });
};     
     var myGeoJSON = myLocation.getGeoJSON();
     getDirections(myGeoJSON.geometry.coordinates, feature.geometry.coordinaters)
}
 var myGeoJSON = myLocation.getGeoJSON();
     getDirections(myGeoJSON.geometry.coordinates, feature.geometry.coordinaters)
featureLayer.on('ready', function(){
  this.eachLayer(function(layer){
    layer.on('click', clickHandler);
  });
});

map.on('click',function(e){
	$('#info').fadeOut(200);
  $('#info').empty();
});




