// Here is the javascript setup for a basic map:

// Enter your mapbox map id here to reference it for the base layer,
// this one references the ugly green map that I made.
var mapId = 'cmoser2.019i55ba';

// And this is my access token, use yours.
var accessToken = 'https://a.tiles.mapbox.com/v4/cmoser2.019i55ba/page.html?access_token=pk.eyJ1IjoiY21vc2VyMiIsImEiOiJTUnlSdklzIn0.fLdMmX-JC-xCuQuKK_AH4g#3/0.00/0.00';

// Create the map object with your mapId and token,
// referencing the DOM element where you want the map to go.
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId);

// Set the initial view of the map to the whole US
map.setView([39, -96], 4);

// Great, now we have a basic web map!
