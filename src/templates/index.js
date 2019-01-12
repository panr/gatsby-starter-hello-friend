import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/post'
import Navigation from '../components/navigation'

const Index = ({ data, pageContext: { nextPagePath, previousPagePath } }) => (
  <Layout>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Post
        key={node.id}
        title={node.frontmatter.title}
        date={node.frontmatter.date}
        path={node.frontmatter.path}
        author={node.frontmatter.author}
        coverImage={node.frontmatter.coverImage}
        excerpt={node.frontmatter.excerpt || node.excerpt}
      />
    ))}

    <Navigation
      previousPath={previousPagePath}
      previousLabel="Newer posts"
      nextPath={nextPagePath}
      nextLabel="Older posts"
    />
  </Layout>
)

Index.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
}

export const blogListQuery = graphql`
  query($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts//" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            path
            author
            excerpt
            coverImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`

export default Index
