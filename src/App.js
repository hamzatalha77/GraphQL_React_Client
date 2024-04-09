import './App.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Client from './layouts/Client'
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql Error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:7000/graphql' })
])

const client = ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <div>
      <Router>
        <Route path="/client/*" component={Client} />
      </Router>
    </div>
  )
}

export default App
