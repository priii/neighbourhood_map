var map;
var markers = [];


// Array that contains restaurant details
// venue id taken from fourSquare
var restaurants = [{
        name: "Orean's Hummus",
        caption: ": Cozy Mediterranean restaurant",
        venue_id: "53c2fe37498ef47b8dd63ab1",
        location: {
            lat: 37.3948,
            lng: -122.0787
        }
    },
    {
        name: "Taqueria La Espuela",
        caption: " : Mexican staples",
        venue_id: "49ee3169f964a52036681fe3",
        location: {
            lat: 37.3929,
            lng: -122.0803
        }
    },
    {
        name: "Niji Sushi",
        caption: ": Informal, bustling Japanese eatery",
        venue_id: "501acdfbe4b0981c98c5a8dc",
        location: {
            lat: 37.3922,
            lng: -122.0792
        }
    },
    {
        name: "Crepevine",
        caption: ": sweet & savory crêpes.",
        venue_id: "50269a95e4b0727083f082b1",
        location: {
            lat: 37.3925,
            lng: -122.0800
        }
    },
    {
        name: "Xanh Restaurant",
        caption: ": High-end Vietnamese dishes",
        venue_id: "4a693c9af964a520d1cb1fe3",
        location: {
            lat: 37.394895,
            lng: -122.078572
        }
    }
];

// google map error handling

function mapError() {
    alert('Oops, google maps is not available.');
}

// this code is taken from  Google Maps API Course on Udacity
// initializing the map
function initMap() {

    // Create a styles array to use with the map.

    var styles = [{
        featureType: 'water',
        stylers: [{
            color: '#19a0d8'
        }]
    }, {
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [{
                color: '#ffffff'
            },
            {
                weight: 6
            }
        ]
    }, {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#e85113'
        }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
                color: '#efe9e4'
            },
            {
                lightness: -40
            }
        ]
    }, {
        featureType: 'transit.station',
        stylers: [{
                weight: 9
            },
            {
                hue: '#e85113'
            }
        ]
    }, {
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [{
            visibility: 'off'
        }]
    }, {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
            lightness: 100
        }]
    }, {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
            lightness: -100
        }]
    }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
                visibility: 'on'
            },
            {
                color: '#f0e4d3'
            }
        ]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
                color: '#efe9e4'
            },
            {
                lightness: -25
            }
        ]
    }];

    //Constructor to create a new map.

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.386051,
            lng: -122.083855
        },
        zoom: 13,
        scaleControl: true,
        styles: styles,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    });


    // The following group uses the location array tocreate an array of markers on initialize.

    for (var i = 0; i < restaurants.length; i++) {
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

        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
            toggleBounce(this, marker);
        });
        bounds.extend(markers[i].position);


    }
    //extending the boundaries.
    map.fitBounds(bounds);
    // zooming function
    setTimeout(function() {
        map.setZoom(17);
    }, 150);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        //  infowindow.setContent('<div>' + marker.name + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.setMarker = null;
        });

        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;
        // In case the status is OK, which means the pano was found, compute the
        // position of the streetview image, then calculate the heading, then get a
        // panorama from that and set the options
        function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                    nearStreetViewLocation, marker.position);

                // finding the venue_id for the restaurants
                var rest_idx = 0;
                for (var i = 0; i < restaurants.length; i++) {
                    if (marker.name === restaurants[i].name) { // if the clicked marker's name and restaurants name matches ! return its index
                        rest_idx = i;
                    }
                }
                venue_id = restaurants[rest_idx].venue_id; // passing the index value

                // FourSquare api request
                // getting 3 tips texts from the foursquare api

                var fourSquareurl = 'https://api.foursquare.com/v2/venues/' + venue_id + '/tips?sort=recent&client_id=CI2GYOIPPOSMQEIJ4VT20VCKTBEJ3M23APK1CZ0C335YCQ4G&client_secret=IUIE4BVBKECRGK3UYMRUNQ5P0MJ2F2GXHYZ3PPDYIZGFD4FV&v=20170426';
                $.ajax({
                    url: fourSquareurl,
                    dataType: 'json',
                    data: {
                        async: true
                    },
                    success: function(data) {
                        var tip1 = data.response.tips.items[0].text;
                        var tip2 = data.response.tips.items[1].text;
                        var tip3 = data.response.tips.items[2].text;
                        infowindow.setContent('<div>' + marker.name + '</div><hr><div id="pano"></div><br>' + '<div><br><h3>' + '3 customers reviews from foursquare' + '</h3></div>' + tip1 + '<div><br>' + tip2 + '</div><br>' + '<div>' + tip3 + '</div>');
                        var panoramaOptions = {
                            position: nearStreetViewLocation,
                            pov: {
                                heading: heading,
                                pitch: 30
                            }
                        };
                        var panorama = new google.maps.StreetViewPanorama(
                            document.getElementById('pano'), panoramaOptions);
                    },
                    error: function(data) {
                        alert("Could not load data from foursquare.");
                    }
                });

            } else {
                infowindow.setContent('<div>' + marker.name + '</div>' +
                    '<div>No Street View Found</div>');
            }
        }

        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
}

// marker animation
var toggleBounce = function(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 2000);
    }
};

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).

function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}


// view model

function ViewModel() {
    var self = this;
    self.query = ko.observable('');

    // copying the restaurants details into locations
    self.locations = ko.observableArray(restaurants);

    //search function

    // followed the below demo for search method
    // http://opensoul.org/2011/06/23/live-search-with-knockoutjs/

    self.clicked = ko.computed(function() {
        var query = self.query().toLowerCase();
        return ko.utils.arrayFilter(self.locations(), function(temp_var) {
            var store = temp_var.name.toLowerCase().indexOf(query) >= 0; // checks the each index of query's value and temp_var' value if both matches it will return 0 if not it will return -1(false) nothing will show up!

            if (temp_var.marker) {
                temp_var.marker.setVisible(true);
            }
            if (store === true) {
                return store;
                //  temp_var.marker.setVisible(true);
            } else {
                temp_var.marker.setVisible(false);
            }

        });
    });

    self.showInfoWindow = function(loc) {
        google.maps.event.trigger(loc.marker, 'click');
    };
}
ko.applyBindings(new ViewModel());
