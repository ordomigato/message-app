import React from "react";

const ChatBubble = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="67"
    height="66"
    viewBox="0 0 67 66"
  >
    <defs></defs>
    <path
      id="Shape"
      style={{ fill: color }}
      d="M17.66,62.079A20.213,20.213,0,0,1,5.873,65.93a17.625,17.625,0,0,1-2.649-.2A3.119,3.119,0,0,1,.6,63.139,3.061,3.061,0,0,1,2.318,59.9a12.692,12.692,0,0,0,5.369-5.86A32.664,32.664,0,0,1,9.8,9.67a33.844,33.844,0,0,1,47.371,0,32.616,32.616,0,0,1,.014,46.661A33.884,33.884,0,0,1,17.66,62.079Z"
      transform="translate(0)"
    />
  </svg>
);

export default ChatBubble;
