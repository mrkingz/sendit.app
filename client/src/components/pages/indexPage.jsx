import React, { Component, Fragment } from "react";
import map from "../../../assets/images/bg.jpg";
import fast from "../../../assets/images/fast.jpg";
import Banner from "../headers/Banner";
import Template from "../containers/Template";
import ImageCard from "../presentations/ImageCard";
import NotePanel from "../presentations/NotePanel";

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * Add card Element to the page
   *
   * @param {int} pos the card position
   * @returns {ImageCard}
   * @memberof IndexPage
   */
  addImageCard(pos) {
    const cards = {
      1: {
        image: map,
        text:
          "At <b>SendIT</b>,  we are not restricted by geograpghy! <br /> Our service is nation wide. We offer parcel delivery services that cut accros boundaries..."
      },
      2: {
        image: fast,
        text:
          "Our delivery is service is top notch... <br/> We pride in our umatched ability to lead the path of secure, fast and reliable delivery"
      }
    };
    return <ImageCard {...cards[pos]} />;
  }

  render() {
    return (
      <Fragment>
        <Template>
          <Banner />
          <div className="row no-gutters">
            <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12">
              <NotePanel />
            </div>
          </div>
          <div className="sides">
            <div className="row no-gutters">
              <div className="col-lg-6 col-md-6 col-sm-12">
                {this.addImageCard(1)}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                {this.addImageCard(2)}
              </div>
            </div>
          </div>
        </Template>
      </Fragment>
    );
  }
}
export default IndexPage;
