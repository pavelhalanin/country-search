import "./repeatButton.css";

export const repeatButton = () => {
  const div = document.createElement("div");
  div.setAttribute("id", "rebeat_button");
  div.classList.add("repeat_button__wrapper");
  return div;
};
