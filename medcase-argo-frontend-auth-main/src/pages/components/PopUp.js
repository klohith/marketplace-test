import React, { useState } from "react";

function PopUp(props) {
  return props.trigger ? <div className="pop-up">{props.children}</div> : "";
}

export default PopUp;
