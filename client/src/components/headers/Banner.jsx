import React from "react";

const Banner = () => {
  return (
    <div className="bg-image">
      <div className="overlay">
        <div className="row no-gutters">
          <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-12 offset-sm-0">
            <br />
            <br />
            <div className="welcome welcome-index">
              <p>
                Welcome to{" "}
                <span>
                  SendIT<sup className="size-12">&trade;</sup>
                </span>
              </p>
              <p className="size-12">
                Join our parcel delivery portal to enjoy our services
              </p>
            </div>
            <div className="align-center note">
              ...we offer delivery services to meet your needs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
