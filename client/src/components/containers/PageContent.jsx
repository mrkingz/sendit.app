import React, { Component } from "react";
import Template from "@containers/Template";
import PropTypes from "prop-types";

class PageContent extends Component {
  render() {
    return (
      <Template>
        <div className="row no-gutters bounceIn animate">
          <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12">
            <div className="page">
              <div className="page-header">
                <span className="page-title">{this.props.pageTitle}</span>
              </div>
              <div className="page-content">{this.props.children}</div>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

PageContent.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.object
};
export default PageContent;
