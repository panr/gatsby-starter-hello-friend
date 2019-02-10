import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import Menu from './menu'

import style from '../styles/header.module.css'

class Header extends React.Component {
  state = {
    userTheme:
      (typeof window !== 'undefined' && window.localStorage.getItem('theme')) ||
      null,
    isMobileMenuVisible: false,
    isSubMenuVisible: false,
  }

  onChangeTheme = this.onChangeTheme.bind(this)

  onToggleMobileMenu = this.onToggleMobileMenu.bind(this)

  onToggleSubMenu = this.onToggleSubMenu.bind(this)

  onChangeTheme() {
    const { userTheme } = this.state
    const { defaultTheme } = this.props

    const opositeTheme =
      (userTheme || defaultTheme) === 'light' ? 'dark' : 'light'

    this.setState({ userTheme: opositeTheme })
    typeof window !== 'undefined' &&
      window.localStorage.setItem('theme', opositeTheme)
  }

  onToggleMobileMenu() {
    const { isMobileMenuVisible } = this.state
    this.setState({ isMobileMenuVisible: !isMobileMenuVisible })
  }

  onToggleSubMenu() {
    const { isSubMenuVisible } = this.state
    this.setState({ isSubMenuVisible: !isSubMenuVisible })
  }

  render() {
    const {
      siteLogo,
      logoText,
      siteTitle,
      mainMenu,
      mainMenuItems,
      menuMoreText,
      defaultTheme,
    } = this.props
    const { userTheme, isSubMenuVisible, isMobileMenuVisible } = this.state

    return (
      <>
        <Helmet>
          <title>{siteTitle}</title>
          <body
            className={
              (userTheme || defaultTheme) === 'light'
                ? 'light-theme'
                : 'dark-theme'
            }
          />
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
              <Menu
                mainMenu={mainMenu}
                mainMenuItems={mainMenuItems}
                isMobileMenuVisible={isMobileMenuVisible}
                isSubMenuVisible={isSubMenuVisible}
                menuMoreText={menuMoreText}
                onToggleMobileMenu={this.onToggleMobileMenu}
                onToggleSubMenu={this.onToggleSubMenu}
                onChangeTheme={this.onChangeTheme}
              />
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
  mainMenuItems: PropTypes.number,
  menuMoreText: PropTypes.string,
}

export default Header
