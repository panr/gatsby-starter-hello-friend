import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/post'

const Index = ({ data }) => {
  return (
    <Layout>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Post
          key={node.id}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          path={node.frontmatter.slug}
          author={node.frontmatter.author}
          coverImage={node.frontmatter.coverImage.childImageSharp.fluid}
          excerpt={node.frontmatter.excerpt || node.excerpt}
        />
      ))}
    </Layout>
  )
}

Index.propTypes = {
  data: PropTypes.any,
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            slug
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
