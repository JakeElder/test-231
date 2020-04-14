import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import googleIconSrc from '../images/google-icon.svg'
import facebookIconSrc from '../images/facebook-icon.svg'
import instagramIconSrc from '../images/instagram-icon.svg'

const Root = styled.div`
  height: 33px;
  display: flex;
  > *:not(:last-child) {
    margin-right: 10px;
  }
`

const GoogleIcon = ({ url }) => (
  <a href={url}>
    <img alt="Google" src={googleIconSrc} />
  </a>
)

const FacebookIcon = ({ url }) => (
  <a href={url}>
    <img alt="Facebook" src={facebookIconSrc} />
  </a>
)

const InstagramIcon = ({ url }) => (
  <a href={url}>
    <img alt="Instagram" src={instagramIconSrc} />
  </a>
)

const SocialIcons = () => {
  const data = useStaticQuery(graphql`
    query SocialIcons {
      textFragments: prismicTextFragments {
        data {
          google
          facebook
          instagram
        }
      }
      links: prismicLinks {
        data {
          facebook {
            url
          }
          google {
            url
          }
          instagram {
            url
          }
        }
      }
    }
  `)

  const textFragments = data.textFragments.data
  const urls = data.links.data

  const links = {
    google: [textFragments.google, urls.google.url],
    facebook: [textFragments.facebook, urls.facebook.url],
    instagram: [textFragments.instagram, urls.instagram.url]
  }

  return (
    <Root>
      <GoogleIcon url={links.google[1]} />
      <FacebookIcon url={links.facebook[1]} />
      <InstagramIcon url={links.instagram[1]} />
    </Root>
  )
}

export default SocialIcons
