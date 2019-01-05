import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import Icon from './icon'

import style from '../styles/header.module.css'

class Header extends React.Component {
  state = {
    theme: window.localStorage.getItem('theme') || this.props.defaultTheme,
  }

  onChangeTheme = this.onChangeTheme.bind(this)

  onChangeTheme() {
    const { theme } = this.state
    const opositeTheme = theme === 'dark' ? 'light' : 'dark'

    this.setState({ theme: opositeTheme })
    window.localStorage.setItem('theme', opositeTheme)
  }

  render() {
    const { siteLogo, logoText, siteTitle } = this.props
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
              <span className={style.themeToggle} onClick={this.onChangeTheme}>
                <Icon
                  style={{ cursor: 'pointer' }}
                  size={24}
                  d="M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
                  3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
                  13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z"
                />
              </span>
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
}

export default Header
