import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { Twitter } from 'styled-icons/feather/Twitter'
import { Mail } from 'styled-icons/feather/Mail'

const ICON_SIZE = '32'

const Link = styled.a`
  padding: 1em;
`
const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  align-content: center;
  flex-wrap: wrap;
  max-width: 200px;

  a {
    svg {
      &:hover {
        color: var(--text);
      }
    }
  }
`
const SocialMediaLinks = () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            twitter
            email
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { twitter, email }
      }
    }) => {
      return (
        <SocialMediaContainer>
          <Link href={twitter} alt='Twitter' aria-label='Link to Twitter'>
            <Twitter size={ICON_SIZE} />
          </Link>
          <Link
            href={`mailto:${email}`}
            alt='E-mail'
            aria-label='Link to Send Email'
          >
            <Mail size={ICON_SIZE} />
          </Link>
        </SocialMediaContainer>
      )
    }}
  />
)

export default SocialMediaLinks
