import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Outlet } from 'react-router'
import { Navigate, Route, Routes } from 'react-router-dom'

import FakeDataButton from '../common/components/FakeDataButton'

import Backup from './Backup'
import Feeds from './Feeds'
import FetchingFeedsStatus from './FetchingFeedsStatus'
import Header from './Header'
import Login from './Login'
import NewFeed from './NewFeed'
import NewFeedRSS from './NewFeedRSS'
import NewFeedTwitter from './NewFeedTwitter'
import News from './News'

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
        <Route path="/" element={<Navigate to="/news" />} />
        <Route path={`/login/*`} element={<Login />} />

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
