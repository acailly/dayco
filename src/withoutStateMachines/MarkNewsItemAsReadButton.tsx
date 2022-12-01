import { CheckIcon } from '@chakra-ui/icons'
import { Button, Stack, Text, useToast } from '@chakra-ui/react'
import { useCallback, useState } from 'react'

import { db } from '../common/db'
import { NewsItem } from '../common/types'

interface MarkNewsItemAsReadButtonProps {
  newsItem: NewsItem
}

const MarkNewsItemAsReadButton = ({ newsItem }: MarkNewsItemAsReadButtonProps) => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const markNewsItemAsRead = useCallback(() => {
    setIsLoading(true)
    return db.newsItems
      .where({
        url: newsItem.url,
        feedKey: newsItem.feedKey,
      })
      .modify({ read: 1 })
      .then(() => {
        toast.closeAll()
        toast({
          title: 'Nouveautée marquée comme lue',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((e) => {
        toast({
          title: 'Echec lors du traitement de la nouveautée',
          description: e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [newsItem.feedKey, newsItem.url, toast])

  return (
    <Button colorScheme="blue" variant="outline" minW="20" size="xs" isLoading={isLoading} onClick={markNewsItemAsRead}>
      <Stack direction="row" spacing={1} align="center">
        <Text>Lu</Text> <CheckIcon />
      </Stack>
    </Button>
  )
}

export default MarkNewsItemAsReadButton
