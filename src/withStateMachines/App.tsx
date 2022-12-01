import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Outlet, Route, Routes } from 'react-router-dom'

import FakeDataButton from '../common/components/FakeDataButton'

import Feeds from './abonnements/Feeds'
import NewFeed from './abonnements/NewFeed'
import NewFeedRSS from './abonnements/NewFeedRSS'
import NewFeedTwitter from './abonnements/NewFeedTwitter'
import Header from './navigation/Header'
import News from './nouveautes/News'
import Backup from './sauvegarde/Backup'
import FetchingFeedsStatus from './telecharger/FetchingFeedsStatus'

const queryClient = new QueryClient()
queryClient.setDefaultOptions({
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
  mutations: {
    retry: false,
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          element={
            <>
              <Header />
              <Outlet />
              <FakeDataButton />
            </>
          }
        >
          <Route path="/news" element={<News />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/feeds/new" element={<NewFeed />} />
          <Route path="/feeds/new/rss" element={<NewFeedRSS />} />
          <Route path="/feeds/new/twitter" element={<NewFeedTwitter />} />
          <Route path="/feeds/fetching" element={<FetchingFeedsStatus />} />
          <Route path="/backup" element={<Backup />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
