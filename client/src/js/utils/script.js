let oDropdown;
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
const dropdown = id => {
  if (oDropdown && oDropdown.id !== id) {
    oDropdown.classList.remove("show");
  }
  oDropdown = document.getElementById(id);
  if (oDropdown) {
    oDropdown.classList.toggle("show");
  }
};

//Close the dropdown menu if the user clicks outside of it
window.onclick = event => {
  if (
    !event.target.matches(".dropbtn") &&
    !event.target.matches(".dropbtn *")
  ) {
    let dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach(d => {
      if (d.classList.contains("show")) {
        d.classList.remove("show");
        oDropdown = null;
      }
    });
  }
};

export default dropdown;
