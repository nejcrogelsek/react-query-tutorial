import { FC } from 'react'

//Partials
import Header from './components/partials/Header/Header'
import Routes from './routes/Routes'

const App: FC = () => {
  return (
    <>
      <Header />
      <Routes />
    </>
  )
}

export default App
