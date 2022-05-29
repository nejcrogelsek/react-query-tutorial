import { FC } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'

//Partials
import Header from './components/partials/Header/Header'
import Routes from './routes/Routes'

const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Routes />
    </QueryClientProvider>
  )
}

export default App
