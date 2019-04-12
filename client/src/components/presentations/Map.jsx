import React, { Component } from "react";
import displayMap from "@utils/map";
import PropTypes from "prop-types";

class Map extends Component {
  componentDidMount() {
    if (!window.google) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyB4fuZVukoacZf3oVilqibcN9DXvi-84Tg";
      const x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(script, x);

      script.addEventListener("load", () => {
        displayMap({
          from: { address: this.props.from, viewType: "Pick up location" },
          to: { address: this.props.to, viewType: "Parcel destination" },
          PresentLocation: {
            address: this.props.location,
            viewType: "Present location"
          }
        });
      });
    } else {
      displayMap({
        from: { address: this.props.from, viewType: "Pick up location" },
        to: { address: this.props.to, viewType: "Parcel destination" },
        PresentLocation: {
          address: this.props.location,
          viewType: "Present location"
        }
      });
    }
  }

  render() {
    return (
      <div className="section">
        <div className="outter-div-wrapper">
          <div className="inner-div-wrapper">
            <div id="map" />
          </div>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  to: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  location: PropTypes.string
};

export default Map;
