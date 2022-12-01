import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'

import { db } from '../common/db'
import { Feed } from '../common/types'

interface DeleteFeedButtonProps {
  feed: Feed
}

const DeleteFeedButton = ({ feed }: DeleteFeedButtonProps) => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const deleteFeed = useCallback(() => {
    setIsLoading(true)
    return db.feeds
      .where('key')
      .equals(feed.key)
      .delete()
      .then(() => {
        toast({
          title: 'Abonnement supprimé',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((e) => {
        toast({
          title: "Echec lors de la suppression de l'abonnement",
          description: e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [feed, toast])

  return (
    <>
      <Popover colorScheme="blue">
        <PopoverTrigger>
          <Button colorScheme="blue" variant="outline" size="xs">
            Supprimer
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton colorScheme="blue" />
          <PopoverBody>Êtes vous sur de vouloir supprimer cet abonnement ?</PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button colorScheme="red" isLoading={isLoading} onClick={deleteFeed}>
                Supprimer
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default DeleteFeedButton
