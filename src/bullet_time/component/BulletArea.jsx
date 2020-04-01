import React from 'react';

export default function BulletArea(props) {
  return (
    <textarea
      className={`bullet-area ${props.disabled ? "disabled" : ""}`}
      value={props.bullets.join("\n")}
      placeholder="Write your bullets here..."
      rows="10"
      onChange={event => props.onChange(event)}
      autofocus="true"
    ></textarea>
  );
}
