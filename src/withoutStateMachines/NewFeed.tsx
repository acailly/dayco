import { List, ListItem, Heading, Stack, Container, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const NewFeed = () => {
  return (
    <Container maxW="container.md">
      <Stack spacing={6}>
        <Heading>Nouvel abonnement</Heading>
        <List spacing={3}>
          <ListItem>
            <Link as={RouterLink} color="blue.500" to="/feeds/new/rss">
              <Text fontSize="lg">Ajouter un Flux RSS</Text>
            </Link>
            <Text as="i">Récupérer le flux d&apos;actualité sous format RSS</Text>
          </ListItem>
          <ListItem>
            <Link as={RouterLink} color="blue.500" to="/feeds/new/twitter">
              <Text fontSize="lg">Ajouter votre timeline Twitter</Text>
            </Link>
            <Text as="i">Récupérer les dernières tweet dans votre timeline Twitter</Text>
          </ListItem>
        </List>
      </Stack>
    </Container>
  )
}

export default NewFeed
