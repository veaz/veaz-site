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
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      <SuperText>Hola</SuperText>
      <div>
        <h1>Mi nombre es Victor Aguilar, mi alter ego veaz.</h1>
        <p>
        Soy un Programador novato pero en constante aprendizaje, HTML, CSS, Javascript son lenguajes que manejo. En ocasiones diseño en Illustrator, tambien se editar en Photoshop y un poco de edicion de videos en Affter Effects.
        </p>
        <p>
        Dedicando mi tiempo libre a explorar todo el Universo Cripto que inicio Bitcoin, con todo lo que eso conlleva, investigar, analizar, invertir y opinar.
        </p>

        <RecentPostsContainer>
          <h1 className="title">A veces escribo cosas</h1>
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
