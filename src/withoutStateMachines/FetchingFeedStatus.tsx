import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons'
import { Spinner, Stack, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import addNewsItems from '../common/services/addNewsItems'
import fetchFeed, { QUERY_FETCH_FEEDS } from '../common/services/fetchFeed'
import purgeFeed from '../common/services/purgeFeed'
import { Feed } from '../common/types'

interface FetchFeedProps {
  feed: Feed
}

const FetchingFeedStatus = ({ feed }: FetchFeedProps) => {
  const { isFetching, isError, error } = useQuery<void, string>([QUERY_FETCH_FEEDS, feed.key], () =>
    fetchFeed(feed).then(async (newsItems) => {
      await addNewsItems(newsItems)
      await purgeFeed(feed)
    })
  )

  return (
    <Stack direction="row" justify="space-between" align="center">
      <Stack direction="column" spacing={0}>
        <Text fontSize="lg">{feed.title}</Text>
        {error && <Text>{error}</Text>}
      </Stack>
      {isFetching ? (
        <Spinner color="blue.500" />
      ) : isError ? (
        <WarningTwoIcon color="orange" />
      ) : (
        <CheckIcon color="green" />
      )}
    </Stack>
  )
}

export default FetchingFeedStatus
