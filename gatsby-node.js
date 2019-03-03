const { paginate } = require('gatsby-awesome-pagination')
const { forEach, uniq } = require('rambdax')
const path = require('path')
const { toKebabCase } = require('./src/helpers')

const pageTypeRegex = /src\/(.*?)\//
const getType = node => node.fileAbsolutePath.match(pageTypeRegex)[1]

exports.createPages = ({ actions, graphql, getNodes }) => {
  const { createPage } = actions
  const allNodes = getNodes()

  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const indexTemplate = path.resolve(`./src/templates/index.js`)
  const tagsTemplate = path.resolve(`./src/templates/tags.js`)

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
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const {
      allMarkdownRemark: { edges: markdownPages },
      site: { siteMetadata },
    } = result.data

    const sortedPages = markdownPages.sort((pageA, pageB) => {
      const typeA = getType(pageA.node)
      const typeB = getType(pageB.node)

      return (typeA > typeB) - (typeA < typeB)
    })

    const posts = allNodes.filter(
      ({ internal, fileAbsolutePath }) =>
        internal.type === 'MarkdownRemark' &&
        fileAbsolutePath.indexOf('/posts/') !== -1,
    )

    // Create posts index with pagination
    paginate({
      createPage,
      items: posts,
      component: indexTemplate,
      itemsPerPage: siteMetadata.postsPerPage,
      pathPrefix: '/',
    })

    // Create each markdown page and post
    forEach(({ node }, index) => {
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
    }, sortedPages)

    // Create tag pages
    let tags = []

    forEach(post => {
      const { frontmatter } = post

      if (frontmatter.tags) {
        tags = tags.concat(frontmatter.tags)
      }
    }, posts)

    tags = uniq(tags)

    forEach(tag => {
      const postsWithTag = posts.filter(post =>
        post.frontmatter.tags.indexOf(tag),
      )

      paginate({
        createPage,
        items: postsWithTag,
        component: tagsTemplate,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: `/tag/${toKebabCase(tag)}`,
        context: {
          tag,
        },
      })
    }, tags)

    return {
      sortedPages,
      tags,
    }
  })
}

exports.onCreateNode = ({ node, getNodes }) => {
  const allNodes = getNodes()
  const posts = allNodes.filter(
    ({ internal }) => internal.type === 'MarkdownRemark',
  )
  const atLeastOnePostHasCoverImage =
    posts.filter(({ frontmatter }) => frontmatter.coverImage).length > 0
  const coverImagePlaceholder = atLeastOnePostHasCoverImage ?
    null :
    '../images/placeholder/image-placeholder.png'

  if (node.internal.type === 'MarkdownRemark') {
    node.frontmatter = {
      ...node.frontmatter,
      coverImage: node.frontmatter.coverImage || coverImagePlaceholder,
      excerpt: node.frontmatter.excerpt || '',
      tags: node.frontmatter.tags || [],
    }
  }

  return node
}
