import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/post'

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const nextPost = pageContext.next
  const previousPost = pageContext.previous

  return (
    <Layout>
      <Post
        key={post.id}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        path={post.frontmatter.path}
        author={post.frontmatter.author}
        coverImage={post.frontmatter.coverImage}
        html={post.html}
        previousPost={previousPost}
        nextPost={nextPost}
      />
    </Layout>
  )
}

export default BlogPostTemplate

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
}

export const pageQuery = graphql`
  query($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
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
      id
      html
    }
  }
`
