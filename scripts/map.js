const CustomMapStyles =
  [
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "saturation": 45
        },
        {
          "weight": 4
        }
      ]
    }
  ];

// Load the google api script
var scriptTag = document.createElement('script');
scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsApiKey}&callback=initMap&libraries=geometry`;
document.body.appendChild(scriptTag);


// function initMap() {
//   var options = {
//     zoom: 18,
//     disableDefaultUI: true,
//     zoomControl: true,
//     mapTypeId: google.maps.MapTypeId.TERRAIN,

//     center: { lat: 45.5500781956339, lng: 13.726913573110096 },
//     styles: CustomMapStyles
//   }
//   var map = new google.maps.Map(document.getElementById('map'), options);
// }


var path = []
      var lastMarker

      function toRadians(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}


function bearing(startLat, startLng, destLat, destLng){
  startLat = toRadians(startLat);
  startLng = toRadians(startLng);
  destLat = toRadians(destLat);
  destLng = toRadians(destLng);

  y = Math.sin(destLng - startLng) * Math.cos(destLat);
  x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  return (brng + 360) % 360;
}

let llFromDistance = function(latitude, longitude, distance, bearing) {
  // taken from: https://stackoverflow.com/a/46410871/13549 
  // distance in KM, bearing in degrees

  const R = 6378.1; // Radius of the Earth
  const brng = bearing * Math.PI / 180; // Convert bearing to radian
  let lat = latitude * Math.PI / 180; // Current coords to radians
  let lon = longitude * Math.PI / 180;

  // Do the math magic
  lat = Math.asin(Math.sin(lat) * Math.cos(distance / R) + Math.cos(lat) * Math.sin(distance / R) * Math.cos(brng));
  lon += Math.atan2(Math.sin(brng) * Math.sin(distance / R) * Math.cos(lat), Math.cos(distance / R) - Math.sin(lat) * Math.sin(lat));

  // Coords back to degrees and return
  return [(lat * 180 / Math.PI), (lon * 180 / Math.PI)];

}

      
      
      function initMap(){
        var options = {
          zoom: 18,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
      
          center: { lat: 45.5500781956339, lng: 13.726913573110096 },
          styles: CustomMapStyles
        }
        var map = new google.maps.Map(document.getElementById('map'), options);

          function getDifference(point1, point2, point3) {

            return google.maps.geometry.spherical.computeHeading(point2,point3)
            var a1 = google.maps.geometry.spherical.computeHeading(point1,point2);
            var a2 = google.maps.geometry.spherical.computeHeading(point2,point3);

            al = (a1>0) ? a1 : 360+a1;
            a2 = (a2>0) ? a2 : 360+a2;
            var angle = Math.abs(a1-a2)+180;
            if (angle > 180){
                angle = 360 - angle;
            }
            return   Math.abs(angle);
            }

          google.maps.event.addListener(map, "click", function(event){

            storeLocation(map, event.latLng);
            // path.push(event.latLng)

            if(lastMarker) {
              lastMarker.setMap(null)
            }
            
            bearingAngle = 0
            if(path.length >= 2) {

              bearingAngle = bearing(path[path.length - 2].lat(), path[path.length - 2].lng(),
                                              path[path.length - 1].lat(), path[path.length - 1].lng())
              
              console.log("Angle: " + bearingAngle)              

              var polyline0 = new google.maps.Polyline({
                map: map,
                path: [path[path.length - 2],  path[path.length - 1]],
                strokeColor: "blue",
                strokeWeight: 3,
                strokeOpacity: 0.5
              });
            }
            
            var icon = {
              //url: "./boat.svg",
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
             // anchor: new google.maps.Point(25,50),
             scale: 2,
              //scaledSize: new google.maps.Size(25,25),              
              rotation : bearingAngle
              //bearingAngle                            
            }
                        
            var marker = new google.maps.Marker({
                position: event.latLng,
                fillColor: "red",
                map: map,
                draggable: false,
                icon: icon
               // zIndex : -20
            })
            lastMarker = marker            

          })

      }

      function logPosition(LatLng){
        console.log(LatLng.Lat())
      }


      function storeLocation(map, location) {
        console.log("Sailor1 -> " + "Latitude: " + location.lat() + "Longitude: " + location.lng());  
        
      
        if(path.length > 1) {
          Lat = location.lat() + Math.random()*0.001;
          Lng = location.lng() + Math.random()*0.001

          
          console.log("Sailor2 -> " + "Latitude: " + Lat  + "Longitude: " + Lng);
      
          var myLatLng = new google.maps.LatLng(Lat, Lng);
          
          var icon = {
            //url: "./boat.svg",
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
           // anchor: new google.maps.Point(25,50),
           scale: 2,
            //scaledSize: new google.maps.Size(25,25),              
            rotation : bearingAngle
            //bearingAngle                            
          }

          latLon = llFromDistance(location.lat(), location.lng(), 1, bearingAngle);
          ll = new google.maps.LatLng(latLon[0], latLon[1]);
          console.log(latLon, ll.lat(), ll.lng());

          var marker1 = new google.maps.Marker({
        
            position: myLatLng,
            fillColor: "red",
            map: map,
            draggable: false,
            icon: icon
           // zIndex : -20
          });
         // console.log(Marker1);      
        }
        else {
          console.log("Sailor2 -> " + "Latitude: " + location.lat() + "Longitude: " + location.lng());
        }
        path.push(location);
      }


function getRandomDisplacement(randomNumber) {

}

