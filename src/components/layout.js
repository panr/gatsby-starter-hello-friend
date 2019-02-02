import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, withPrefix } from 'gatsby'

import Header from './header'

import '../styles/layout.css'

const Layout = ({ children }) => (
  <>
    <Helmet>
      <link
        rel="preload"
        as="font"
        href={withPrefix('fonts/Inter-UI-Regular.woff')}
        type="font/woff"
      />
      <link
        rel="preload"
        as="font"
        href={withPrefix('fonts/Inter-UI-Italic.woff')}
        type="font/woff"
      />
      <link
        rel="preload"
        as="font"
        href={withPrefix('fonts/Inter-UI-Medium.woff')}
        type="font/woff"
      />
      <link
        rel="preload"
        as="font"
        href={withPrefix('fonts/Inter-UI-MediumItalic.woff')}
        type="font/woff"
      />
      <link
        rel="preload"
        as="font"
        href={withPrefix('fonts/Inter-UI-Bold.woff')}
        type="font/woff"
      />
      <link
        rel="preload"
        as="font"
        href={withPrefix('fonts/Inter-UI-BoldItalic.woff')}
        type="font/woff"
      />
    </Helmet>
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              logo {
                src
                alt
              }
              logoText
              defaultTheme
              copyrights
              mainMenu {
                title
                path
              }
              showMenuItems
              menuMoreText
            }
          }
        }
      `}
      render={data => (
        <div className="container">
          <Header
            siteTitle={data.site.siteMetadata.title}
            siteLogo={data.site.siteMetadata.logo}
            logoText={data.site.siteMetadata.logoText}
            defaultTheme={data.site.siteMetadata.defaultTheme}
            mainMenu={data.site.siteMetadata.mainMenu}
            mainMenuItems={data.site.siteMetadata.showMenuItems}
            menuMoreText={data.site.siteMetadata.menuMoreText}
          />
          <div className="content">{children}</div>
          <footer>
            {data.site.siteMetadata.copyrights ? (
              data.site.siteMetadata.copyrights
            ) : (
              <>
                <span className="footerCopyrights">
                  © 2019 Built with{' '}
                  <a href="https://www.gatsbyjs.org">Gatsby</a>
                </span>
                <span className="footerCopyrights">
                  Starter created by{' '}
                  <a href="https://radoslawkoziel.pl">panr</a>
                </span>
              </>
            )}
          </footer>
        </div>
      )}
    />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
