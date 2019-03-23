import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-lg">
      <div className="footer-content align-center">
        &copy; Andela bootcamp, {new Date().getFullYear()}. All right reserved
      </div>
    </footer>
  );
};
export default Footer;
