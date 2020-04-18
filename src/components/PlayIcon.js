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
        <g fill={color} fillRule="nonzero" transform="translate(-357 -335)">
          <g transform="translate(340 323)">
            <g transform="translate(17.05 12.438)">
              <path d="M11.85 5.762L2.25.212c-1-.6-2.25.15-2.25 1.3v11.15c0 1.15 1.25 1.9 2.25 1.3l9.65-5.55c.95-.65.95-2.05-.05-2.65z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
