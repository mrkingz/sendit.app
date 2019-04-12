/* eslint-disable no-undef */

let map,
  coords = [];

const displayMap = props => {
  const options = {
    zoom: 6
  };
  map = new google.maps.Map(document.getElementById("map"), options);
  Object.keys(props).forEach(key => codeAddress(props[key]));
};

const codeAddress = options => {
  const { address, viewType } = options;
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, (results, status) => {
    if (status === "OK") {
      coords.push(results[0].geometry.location);
      map.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map,
        position: results[0].geometry.location
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div class="info-window">
                    <h3>${viewType}</h3>
                    <p>${address}</p>
                  </div>`,
        maxWidth: 150
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    }
  });
};

export default displayMap;
