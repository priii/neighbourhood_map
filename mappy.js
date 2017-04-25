var map;
var markers =[];
// restaurant details

var restaurants = [
  { name: "Orean's Hummus",
    caption: ": Cozy Mediterranean restaurant",
    location: {lat: 37.3948, lng: -122.0787}
  },
  {
    name:"Taqueria La Espuela",
    caption:" : Mexican staples",
     location: {lat: 37.3929, lng: -122.0803}
  },
 {
   name: "Niji Sushi",
   caption:": Informal, bustling Japanese eatery",
   location: {lat: 37.3922, lng: -122.0792}
 },
 {
   name:"Crepevine",
   caption:": sweet & savory crêpes.",
   location: {lat: 37.3925, lng: -122.0800}
 },
 {
   name:"Xanh Restaurant",
   caption:": High-end Vietnamese dishes",
   location: {lat: 37.3949, lng: -122.0786}
    }
];

// // this code is taken from  Google Maps API Course on Udacity
function initMap(){
  //Constructor to create a new map.
  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: 37.386051, lng: -122.083855},
    zoom: 13
  });

  // The following group uses the location array tocreate an array of markers on initialize.

  for(var i=0;i< restaurants.length; i++){
    // get the position from the location array.
    var position = restaurants[i].location;
    var name = restaurants[i].name;
    //create a marker per location, and put into markers array.

    var marker = new google.maps.Marker({
      map: map,
      position: position,
      name: name,
      animation: google.maps.Animation.DROP,
      id: i
    });
    var largeInfowindow = new google.maps.InfoWindow();

      var bounds = new google.maps.LatLngBounds();
  restaurants[i].marker = marker;
  // push the marker
  markers.push(marker);

  marker.addListener('click', function(){
    populateInfoWindow(this, largeInfowindow);
    });
  bounds.extend(markers[i].position);
}
//extending the boundaries.
map.fitBounds(bounds);
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
      infowindow.setMarker = null;
    });
  }
}

// view model
function vm() {
  var self = this;
  self.query =  ko.observable('');
  self.locations = ko.observableArray(restaurants);

  //search function
  // followed the below demo for search method
  // http://opensoul.org/2011/06/23/live-search-with-knockoutjs/

  self.clicked = ko.computed(function(){
    var query = self.query().toLowerCase();
      return ko.utils.arrayFilter(restaurants, function(restaurant){
        return restaurant.name.toLowerCase().indexOf(query)>=0;
    });

  });

  self.showInfoWindow = function(loc) {
    google.maps.event.trigger(loc.marker, 'click');
  };
}
ko.applyBindings(new vm);
