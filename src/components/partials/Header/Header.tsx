import { FC } from 'react'
import { Link } from 'react-router-dom'

const Header: FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        padding: '1rem',
      }}
    >
      <Link style={{ marginRight: '1rem' }} to="/">
        Home
      </Link>
      <Link style={{ marginRight: '1rem' }} to="/superheroes">
        Basic
      </Link>
      <Link to="/rq-superheroes">React query</Link>
    </header>
  )
}

export default Header
