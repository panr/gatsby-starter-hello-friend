import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import MediaQuery from 'react-responsive'

import Icon from './icon'

import style from '../styles/header.module.css'

const MainMenu = ({ mainMenu, mainMenuItems, isMobileMenu }) => {
  const menu = mainMenu.slice(0)
  !isMobileMenu && menu.splice(mainMenuItems)

  return menu.map((menuItem, index) => (
    <li key={index}>
      <Link to={menuItem.path}>{menuItem.title}</Link>
    </li>
  ))
}

const SubMenu = ({ mainMenu, mainMenuItems, onToggleSubMenu }) => {
  const menu = mainMenu.slice(0)
  menu.splice(0, mainMenuItems)

  const items = menu.map((menuItem, index) => (
    <li key={index}>
      <Link to={menuItem.path}>{menuItem.title}</Link>
    </li>
  ))

  return (
    <>
      {items}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={style.subMenuOverlay}
        role="button"
        tabIndex={0}
        onClick={onToggleSubMenu}
      />
    </>
  )
}

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
    const opositeTheme =
      userTheme === 'dark' || userTheme === null ? 'light' : 'dark'

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
      theme,
    } = this.props
    const { userTheme, isSubMenuVisible, isMobileMenuVisible } = this.state
    const isSubMenu = !(mainMenuItems >= mainMenu.length) && mainMenuItems > 0

    return (
      <>
        <Helmet>
          <title>{siteTitle}</title>
          <body
            className={
              (userTheme || theme) === 'light' ? 'light-theme' : 'dark-theme'
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
              <MediaQuery maxWidth={668}>
                {matches => {
                  if (matches) {
                    return (
                      <>
                        {isMobileMenuVisible ? (
                          <>
                            {/* eslint-disable */}
                            <div
                              onClick={this.onToggleMobileMenu}
                              className={style.mobileMenuOverlay}
                            />
                            {/* eslint-enable */}
                            <ul className={style.mobileMenu}>
                              <MainMenu mainMenu={mainMenu} isMobileMenu />
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
                      <MainMenu
                        mainMenu={mainMenu}
                        mainMenuItems={mainMenuItems}
                      />
                      {isSubMenu ? (
                        <>
                          <button
                            className={style.subMenuTrigger}
                            onClick={this.onToggleSubMenu}
                            type="button"
                          >
                            {menuMoreText || 'Menu'}{' '}
                            <span className={style.menuArrow}>></span>
                          </button>
                          {isSubMenuVisible ? (
                            <ul className={style.subMenu}>
                              <SubMenu
                                mainMenu={mainMenu}
                                mainMenuItems={mainMenuItems}
                                onToggleSubMenu={this.onToggleSubMenu}
                              />
                            </ul>
                          ) : null}
                        </>
                      ) : null}
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
  theme: PropTypes.string,
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  mainMenuItems: PropTypes.number,
  menuMoreText: PropTypes.string,
}

SubMenu.propTypes = {
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  mainMenuItems: PropTypes.number,
  onToggleSubMenu: PropTypes.func,
}

export default Header
