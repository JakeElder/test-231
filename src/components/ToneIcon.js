import React from 'react'

const Rising = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="12"
    viewBox="0 0 18 12"
  >
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g fill={color} fillRule="nonzero" transform="translate(-788 -373)">
        <g transform="translate(342 297)">
          <g transform="translate(178 69)">
            <g transform="translate(264 1)">
              <g>
                <path
                  d="M22.3621058 13.0825L22.3621058 11.0825 10.3621058 11.0825 10.3621058 7.0825 3.69210581 12.0825 10.3621058 17.0825 10.3621058 13.0825z"
                  transform="scale(-1 1) rotate(30 0 -36.535)"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const Falling = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="12"
    viewBox="0 0 18 12"
  >
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g fill={color} fillRule="nonzero" transform="translate(-850 -373)">
        <g transform="translate(342 297)">
          <g transform="translate(178 69)">
            <g transform="translate(264 1)">
              <g transform="translate(62)">
                <path
                  d="M22.3621058 13.0825L22.3621058 11.0825 10.3621058 11.0825 10.3621058 7.0825 3.69210581 12.0825 10.3621058 17.0825 10.3621058 13.0825z"
                  transform="scale(-1 1) rotate(-30 0 60.7)"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const Level = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="11"
    viewBox="0 0 20 11"
  >
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g fill={color} fillRule="nonzero" transform="translate(-818 -374)">
        <g transform="translate(342 297)">
          <g transform="translate(178 69)">
            <g transform="translate(264 1)">
              <g transform="translate(31)">
                <path
                  d="M22.3621058 13.0825L22.3621058 11.0825 10.3621058 11.0825 10.3621058 7.0825 3.69210581 12.0825 10.3621058 17.0825 10.3621058 13.0825z"
                  transform="matrix(-1 0 0 1 26.054 0)"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export function PureToneIcon({ type, white }) {
  const color = white ? '#fff' : '#bbb'
  switch (type) {
    case 'rising':
      return <Rising color={color} />
    case 'falling':
      return <Falling color={color} />
    case 'level':
      return <Level color={color} />
    default:
      return null
  }
}
