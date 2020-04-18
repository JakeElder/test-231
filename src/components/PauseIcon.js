import React from 'react'

export default function({ on }) {
  const color = on ? '#fff' : '#777'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="15"
      viewBox="0 0 13 15"
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill={color} fillRule="nonzero" transform="translate(-373 -335)">
          <g transform="translate(340 323)">
            <g transform="translate(17.05 12.438)">
              <path d="M19.05 0c.85 0 1.5.65 1.5 1.5v10.85c0 .85-.7 1.55-1.5 1.55H17.5c-.85 0-1.5-.65-1.5-1.5V1.5c0-.85.65-1.5 1.5-1.5h1.55zm7.55 0c.85 0 1.5.65 1.5 1.5v10.85c0 .85-.65 1.55-1.5 1.55h-1.55c-.8 0-1.5-.65-1.5-1.5V1.5c0-.85.7-1.5 1.5-1.5h1.55z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
