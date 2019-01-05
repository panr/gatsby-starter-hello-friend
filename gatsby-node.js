const { paginate } = require('gatsby-awesome-pagination')
const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const indexTemplate = path.resolve(`./src/templates/index.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges

    if (result.errors) {
      return Promise.reject(result.errors)
    }

    paginate({
      createPage,
      items: posts,
      component: indexTemplate,
      itemsPerPage: 5,
      pathPrefix: '/',
    })

    posts.forEach(({ node }, index) => {
      const previous = index === 0 ? null : posts[index - 1].node
      const next = index === posts.length - 1 ? null : posts[index + 1].node

      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          next,
          previous,
        },
      })
    })
  })
}
