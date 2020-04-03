import React from 'react';

export default function BulletArea(props) {
  return (
    <textarea
      className={`bullet-area ${props.disabled ? "disabled" : ""}`}
      value={props.bullets.join("\n")}
      placeholder="Write your bullets here..."
      rows="20"
      onChange={event => props.onChange(event)}
      autofocus="true"
    ></textarea>
  );
}
