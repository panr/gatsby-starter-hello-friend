const { paginate } = require('gatsby-awesome-pagination')
const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const indexTemplate = path.resolve(`./src/templates/index.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              type
            }
          }
        }
      }
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `).then(result => {
    const {
      allMarkdownRemark,
      site: { siteMetadata },
    } = result.data
    const pages = allMarkdownRemark.edges
    const sortedPages = pages.sort(
      (
        {
          node: {
            frontmatter: { type: typeA },
          },
        },
        {
          node: {
            frontmatter: { type: typeB },
          },
        },
      ) => (typeA > typeB) - (typeA < typeB),
    )

    if (result.errors) {
      return Promise.reject(result.errors)
    }

    paginate({
      createPage,
      items: sortedPages.filter(edge => edge.node.frontmatter.type === 'post'),
      component: indexTemplate,
      itemsPerPage: siteMetadata.postsPerPage,
      pathPrefix: '/',
    })

    sortedPages.forEach(({ node }, index) => {
      const previous = index === 0 ? null : sortedPages[index - 1].node
      const next =
        index === sortedPages.length - 1 ? null : sortedPages[index + 1].node
      const isNextSameType =
        node.frontmatter.type === (next && next.frontmatter.type)
      const isPreviousSameType =
        node.frontmatter.type === (previous && previous.frontmatter.type)

      createPage({
        path: node.frontmatter.path,
        component: pageTemplate,
        context: {
          next: isNextSameType ? next : null,
          previous: isPreviousSameType ? previous : null,
        },
      })
    })

    return sortedPages
  })
}
