import { Button, Container, Heading, Stack, Textarea, useToast } from '@chakra-ui/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useCallback, useRef } from 'react'

import { db } from '../common/db'

const Backup = () => {
  const toast = useToast()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const feeds = useLiveQuery(() => db.feeds.toArray())

  const copyDatabaseInClipboard = useCallback(() => {
    textAreaRef.current?.select()
    document.execCommand('copy')
    toast({
      title: 'Base de donnée copiée dans le presse papier',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }, [toast])

  return (
    <Container maxW="container.lg">
      <Stack spacing={6}>
        <Heading>Sauvegarde</Heading>
        <Stack direction="row" spacing={4} justify="space-between">
          <Heading size="lg">Contenu de la base de donnée</Heading>
          <Button colorScheme="blue" variant="solid" onClick={copyDatabaseInClipboard}>
            Copier
          </Button>
        </Stack>
        <Textarea
          ref={textAreaRef}
          colorScheme="blue"
          variant="filled"
          minH="xs"
          value={JSON.stringify(feeds, null, 2)}
        />
      </Stack>
    </Container>
  )
}

export default Backup
