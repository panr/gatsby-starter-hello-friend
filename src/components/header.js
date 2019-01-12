import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import MediaQuery from 'react-responsive'

import Icon from './icon'

import style from '../styles/header.module.css'

const MainMenu = ({ mainMenu }) =>
  mainMenu.map((menuItem, index) => (
    <li key={index}>
      <Link to={menuItem.path}>{menuItem.title}</Link>
    </li>
  ))

class Header extends React.Component {
  state = {
    theme:
      (typeof window !== 'undefined' && window.localStorage.getItem('theme')) ||
      this.props.defaultTheme,
    isMobileMenuVisible: false,
  }

  onChangeTheme = this.onChangeTheme.bind(this)

  onToggleMobileMenu = this.onToggleMobileMenu.bind(this)

  onChangeTheme() {
    const { theme } = this.state
    const opositeTheme = theme === 'dark' ? 'light' : 'dark'

    this.setState({ theme: opositeTheme })
    typeof window !== 'undefined' &&
      window.localStorage.setItem('theme', opositeTheme)
  }

  onToggleMobileMenu() {
    const { isMobileMenuVisible } = this.state
    this.setState({ isMobileMenuVisible: !isMobileMenuVisible })
  }

  render() {
    const { siteLogo, logoText, siteTitle, mainMenu } = this.props
    const { theme } = this.state

    return (
      <>
        <Helmet>
          <title>{siteTitle}</title>
          <body className={theme === 'dark' ? 'dark-theme' : 'light-theme'} />
        </Helmet>
        <header className={style.header}>
          <div className={style.inner}>
            <Link to="/">
              <div className={style.logo}>
                {siteLogo.src ? (
                  <img src={siteLogo.src} alt={siteLogo.alt} />
                ) : (
                  <>
                    <span className={style.mark}>></span>
                    <span className={style.text}>{logoText}</span>
                    <span className={style.cursor} />
                  </>
                )}
              </div>
            </Link>
            <span className={style.right}>
              <MediaQuery maxWidth={668}>
                {matches => {
                  if (matches) {
                    return (
                      <>
                        {this.state.isMobileMenuVisible ? (
                          <>
                            {/* eslint-disable */}
                            <div
                              onClick={this.onToggleMobileMenu}
                              className={style.mobileMenuOverlay}
                            />
                            {/* eslint-enable */}
                            <ul className={style.mobileMenu}>
                              <MainMenu mainMenu={mainMenu} />
                            </ul>
                          </>
                        ) : null}
                        <button
                          className={style.menuTrigger}
                          style={{ color: 'inherit' }}
                          onClick={this.onToggleMobileMenu}
                          type="button"
                        >
                          <Icon
                            style={{ cursor: 'pointer' }}
                            size={24}
                            d="M4 34H40V30H4V34ZM4 24H40V20H4V24ZM4 10V14H40V10H4Z"
                          />
                        </button>
                      </>
                    )
                  }

                  return (
                    <ul className={style.menu}>
                      <MainMenu mainMenu={mainMenu} />
                    </ul>
                  )
                }}
              </MediaQuery>
              <button
                className={style.themeToggle}
                onClick={this.onChangeTheme}
                type="button"
              >
                <Icon
                  style={{ cursor: 'pointer' }}
                  size={24}
                  d="M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
                  3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
                  13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z"
                />
              </button>
            </span>
          </div>
        </header>
      </>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteLogo: PropTypes.object,
  logoText: PropTypes.string,
  defaultTheme: PropTypes.string,
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
}

export default Header
