import { List, ListItem, Heading, Stack, Container, Button } from '@chakra-ui/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { Link as RouterLink } from 'react-router-dom'

import { db } from '../common/db'
import { QUERY_FETCH_FEEDS } from '../common/services/fetchFeed'

import FetchingFeedStatus from './FetchingFeedStatus'

const FetchingFeedsStatus = () => {
  const queryClient = useQueryClient()

  const feeds = useLiveQuery(() => db.feeds.toArray())

  const refetchNews = useCallback(() => {
    queryClient.invalidateQueries(QUERY_FETCH_FEEDS)
  }, [queryClient])

  return (
    <Container maxW="container.md">
      <Stack spacing={6}>
        <Stack direction="row" spacing={4} justify="space-between">
          <Heading>Récupération des nouveautés</Heading>
        </Stack>
        <List spacing={4}>
          {feeds?.map((feed) => {
            return (
              <ListItem key={encodeURIComponent(feed.key)}>
                <FetchingFeedStatus feed={feed} />
              </ListItem>
            )
          })}
        </List>
        <Button as={RouterLink} colorScheme="blue" variant="solid" to="/news">
          Aller voir les nouveautés !
        </Button>
        <Button colorScheme="blue" variant="outline" onClick={refetchNews}>
          Récupérer à nouveau les nouveautés
        </Button>
      </Stack>
    </Container>
  )
}

export default FetchingFeedsStatus
