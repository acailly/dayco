import { Flex, Button, Text, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Flex justify="center" align="center" gap={4} p={10} direction="column">
      <Flex justify="center" align="center" gap={20}>
        <Text fontSize="xl" fontWeight="bold">
          <Box as="span" role="img" aria-labelledby="watch" p={1}>
            ⌚
          </Box>
          Dayco
        </Text>
        <Link to="/news">
          <Button colorScheme="blue" variant="link">
            <Box as="span" role="img" aria-labelledby="megaphone" p={1}>
              📢
            </Box>
            Nouveautés
          </Button>
        </Link>
        <Link to="/feeds">
          <Button colorScheme="blue" variant="link">
            <Box as="span" role="img" aria-labelledby="antenna" p={1}>
              📡
            </Box>
            Abonnements
          </Button>
        </Link>
        <Link to="/backup">
          <Button colorScheme="blue" variant="link">
            <Box as="span" role="img" aria-labelledby="package" p={1}>
              📦
            </Box>
            Sauvegarde
          </Button>
        </Link>
      </Flex>
      <Button as={Link} colorScheme="blue" variant="outline" to="/feeds/fetching">
        Télécharger les nouveautés
      </Button>
    </Flex>
  )
}

export default Header
