import React from 'react'

import style from '../styles/icon.module.css'

const Icon = props => {
  const { d, size = '1em', label, onClick, style: styles } = props

  return (
    <span className={style.root} onClick={onClick} style={styles}>
      <svg
        version="1.1"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={d} className={style.icon} />
      </svg>
      {label && <span className={style.label}>{label}</span>}
    </span>
  )
}

export default Icon
