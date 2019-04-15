import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import classnames from "classnames";

export const AuthRedirect = ({
  text,
  path,
  prompt,
  wrapperStyles,
  linkStyles
}) => {
  return (
    <div className="control-group">
      <div className={classnames(`auth-redirect ${wrapperStyles}`)}>
        <span>
          {prompt}
          <Link
            className={classnames(`bold auth-link ${linkStyles}`)}
            to={path}
          >
            {text}
          </Link>
        </span>
      </div>
    </div>
  );
};

AuthRedirect.defaultProps = {
  prompt: ""
};

AuthRedirect.propTypes = {
  text: PropTypes.string,
  path: PropTypes.string,
  prompt: PropTypes.string,
  styles: PropTypes.string,
  wrapperStyles: PropTypes.string,
  linkStyles: PropTypes.string
};
export default AuthRedirect;
