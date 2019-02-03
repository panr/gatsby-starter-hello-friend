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
            }
            fileAbsolutePath
          }
        }
      }
      posts: allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                title
              }
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
      allMarkdownRemark: { edges: markdownPages },
      posts: { edges: posts },
      site: { siteMetadata },
    } = result.data
    const sortedPages = markdownPages.sort(
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
      items: posts,
      component: indexTemplate,
      itemsPerPage: siteMetadata.postsPerPage,
      pathPrefix: '/',
    })

    sortedPages.forEach(({ node }, index) => {
      const pageTypeRegex = /src\/(.*?)\//
      const getType = el => el.fileAbsolutePath.match(pageTypeRegex)[1]

      const previous = index === 0 ? null : sortedPages[index - 1].node
      const next =
        index === sortedPages.length - 1 ? null : sortedPages[index + 1].node
      const isNextSameType = getType(node) === (next && getType(next))
      const isPreviousSameType =
        getType(node) === (previous && getType(previous))

      createPage({
        path: node.frontmatter.path,
        component: pageTemplate,
        context: {
          type: getType(node),
          next: isNextSameType ? next : null,
          previous: isPreviousSameType ? previous : null,
        },
      })
    })

    return sortedPages
  })
}
