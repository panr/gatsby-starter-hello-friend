import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/post'
import SEO from '../components/seo'

const BlogPostTemplate = ({ data, pageContext }) => {
  const {
    frontmatter: { title, date, path, author, coverImage },
    id,
    html,
  } = data.markdownRemark
  const { next, previous } = pageContext
  const post = data.markdownRemark

  return (
    <Layout>
    <SEO title={post.frontmatter.title} meta={post.excerpt} />
      <Post
        key={id}
        title={title}
        date={date}
        path={path}
        author={author}
        coverImage={coverImage}
        html={html}
        previousPost={previous}
        nextPost={next}
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
