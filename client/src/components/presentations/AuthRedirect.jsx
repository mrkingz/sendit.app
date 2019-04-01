import React from "react";

const AuthRedirect = ({ text, path, prompt }) => {
  return (
    <div className="control-group">
      <div className="auth-redirect">
        <span>
          {prompt}
          <a href={path} className="bold auth-link">
            {text}
          </a>
        </span>
      </div>
    </div>
  );
};

export default AuthRedirect;
