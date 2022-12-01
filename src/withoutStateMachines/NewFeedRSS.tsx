import {
  Heading,
  Stack,
  Container,
  Input,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import { useCallback, useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { db } from '../common/db'
import { Feed } from '../common/types'

function validateName(value: string) {
  let error
  if (!value) {
    error = 'Un nom est requis'
  }
  return error
}

function validateUrl(value: string) {
  let error
  if (!value) {
    error = 'Une adresse est requise'
  }
  return error
}

interface FormValues {
  name: string
  url: string
}

const NewFeedRSS = () => {
  const toast = useToast()

  const initialValues: FormValues = useMemo(
    () => ({
      name: '',
      url: '',
    }),
    []
  )

  const onSubmit = useCallback(
    (values: FormValues, actions: FormikHelpers<FormValues>) => {
      const newFeed: Feed = {
        title: values.name,
        url: values.url,
        type: 'rss',
        key: `rss:${values.url}`,
      }
      db.feeds
        .add(newFeed)
        .then(() => {
          toast({
            title: 'Abonnement ajouté',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          actions.resetForm({
            values: initialValues,
          })
        })
        .catch((e) => {
          toast({
            title: "Echec lors de l'ajout de l'abonnement",
            description: e.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        })
        .finally(() => {
          actions.setSubmitting(false)
        })
    },
    [initialValues, toast]
  )

  return (
    <Container maxW="container.md">
      <Stack spacing={6}>
        <Heading>Nouveau flux RSS</Heading>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(props) => (
            <Form>
              <Stack spacing={4}>
                <Field name="name" validate={validateName}>
                  {({ field, form }: FieldProps) => (
                    <FormControl isRequired isInvalid={!!form.errors.name && !!form.touched.name}>
                      <FormLabel htmlFor="name">Nom du flux RSS</FormLabel>
                      <Input {...field} id="name" />
                      <FormErrorMessage>{form.errors.name?.toString()}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="url" validate={validateUrl}>
                  {({ field, form }: FieldProps) => (
                    <FormControl isInvalid={!!form.errors.url && !!form.touched.url}>
                      <FormLabel htmlFor="url">Adresse du flux RSS</FormLabel>
                      <Input {...field} id="url" />
                      <FormErrorMessage>{form.errors.url?.toString()}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button colorScheme="blue" isLoading={props.isSubmitting} type="submit">
                  Ajouter ce flux RSS
                </Button>
                <Button as={RouterLink} colorScheme="blue" variant="outline" to="/feeds">
                  Revenir à la liste des abonnements
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Container>
  )
}

export default NewFeedRSS
