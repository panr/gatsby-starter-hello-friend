import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import style from '../styles/post.module.css'

const Post = ({ title, date, path, coverImage, author, excerpt, html }) => (
  <div className={style.post}>
    <h1>{excerpt ? <Link to={path}>{title}</Link> : title}</h1>
    <div className={style.meta}>
      {date} — written by {author}
    </div>
    <Img fluid={coverImage} className={style.coverImage} />
    {excerpt ? (
      <>
        <p>{excerpt}</p>
        <Link to={path} className={style.readMore}>
          Read more →
        </Link>
      </>
    ) : (
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    )}
  </div>
)

Post.propTypes = {
  node: PropTypes.object,
}

export default Post
