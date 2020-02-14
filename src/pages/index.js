import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../layout/layout'

import Container from '../layout/Container'
import SuperText from '../components/SuperText'
import SEO from '../components/SEO'
import PostListing from '../components/PostListing'

const RecentPostsContainer = styled.div`
  padding-top: 20vh;
  text-align: left;

  .title {
    font-size: 2em;
    color: var(--text);
  }
`

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => (
  <Layout>
    <Container>
      <SEO title="Victor Aguilar ~ VEAZ" />
      <SuperText>Hola</SuperText>
      <div>
        <h1>Mi nombre es Victor Aguilar.</h1>
        <p>
          Explorando las criptomonedas y todo lo que implica.
        </p>
        <p>
          Dedicando mi tiempo libre a {' '}
          <a href="http://criptoexplora.com">Cripto Explora</a>.
        </p>

        <RecentPostsContainer>
          <h1 className="title">En ocasiones escribo</h1>
          <div id="recent-posts">
            {edges.map(post => (
              <PostListing key={post.node.id} {...post.node.frontmatter} />
            ))}
          </div>
        </RecentPostsContainer>
      </div>
    </Container>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      limit: 3
      filter:{fileAbsolutePath: {regex: "/(\/content\/posts)/.*\\.md$/"}}, 
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            description
            date
          }
        }
      }
    }
  }
`
