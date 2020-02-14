import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Link } from 'gatsby'

const PostTitle = styled.h1`
  padding-bottom: 0;
  margin-bottom: 0;
`

const PostListing = ({ slug, title, description, date }) => {
  return (
    <React.Fragment key={`${slug}`}>
      <Link to={`/blog/${slug}`}>
        <PostTitle>{title}</PostTitle>
      </Link>
      <sub>{moment(date).format('LL')}</sub>
      <p>{description}</p>
    </React.Fragment>
  )
}
export default PostListing
