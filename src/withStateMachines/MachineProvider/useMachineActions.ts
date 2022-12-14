import { useToast } from '@chakra-ui/react'
import { useMemo } from 'react'
import { assign, spawn } from 'xstate'

import baseUrl from '../../common/services/baseUrl'
import { Actions, Context, Event } from '../machine.types'

import useAbsoluteNavigate from './useAbsoluteNavigate'
import useCreateTelechargerUnAbonnementMachine from './useCreateTelechargerUnAbonnementMachine'

const useMachineActions = () => {
  const navigate = useAbsoluteNavigate()
  const toast = useToast()
  const { createTelechargerUnAbonnementMachine } = useCreateTelechargerUnAbonnementMachine()

  const actions: Actions = useMemo(() => {
    return {
      afficherPageNouveautes: () => {
        navigate(`${baseUrl}news`)
      },
      afficherPageSauvegarde: () => {
        navigate(`${baseUrl}backup`)
      },
      afficherPageTelechargement: () => {
        navigate(`${baseUrl}feeds/fetching`)
      },
      afficherPageListeAbonnements: () => {
        navigate(`${baseUrl}feeds`)
      },
      afficherPageNouvelAbonnement: () => {
        navigate(`${baseUrl}feeds/new`)
      },
      afficherPageNouvelAbonnementRSS: () => {
        navigate(`${baseUrl}feeds/new/rss`)
      },
      afficherPageNouvelAbonnementTwitter: () => {
        navigate(`${baseUrl}feeds/new/twitter`)
      },
      contexteAbonnement: assign((context: Context, event: Event) => {
        if ('abonnement' in event) {
          return {
            abonnement: event.abonnement,
          }
        }
        return {}
      }),
      messageAbonnementSupprim√©: () => {
        toast({
          title: 'Abonnement supprim√©',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      },
      messageSuppressionAbonnementEchou√©: (context: Context, event: Event) => {
        const error = event.type === 'error.platform' ? event.data : undefined
        toast({
          title: "Echec lors de la suppression de l'abonnement",
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      },
      messageAbonnementCr√©√©: () => {
        toast({
          title: 'Abonnement ajout√©',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      },
      messageCr√©ationAbonnementEchou√©: (context: Context, event: Event) => {
        const error = event.type === 'error.platform' ? event.data : undefined
        toast({
          title: "Echec lors de l'ajout de l'abonnement",
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      },
      viderFormulaireAbonnement: assign((context: Context) => {
        return { ...context, viderFormulaireFlag: new Date().getTime() }
      }),
      contexteArticle: assign((context: Context, event: Event) => {
        if ('article' in event) {
          return {
            article: event.article,
          }
        }
        return {}
      }),
      messageNouveaut√©Archiv√©e: () => {
        toast.closeAll()
        toast({
          title: 'Article archiv√©',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      },
      messageArchivageNouveaut√©Echou√©: (context: Context, event: Event) => {
        const error = event.type === 'error.platform' ? event.data : undefined
        toast({
          title: "Echec lors de l'archivage de l'article",
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      },
      messageNouveaut√©sArchiv√©es: () => {
        toast.closeAll()
        toast({
          title: 'Articles archiv√©s',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      },
      messageArchivageAbonnementEchou√©: (context: Context, event: Event) => {
        const error = event.type === 'error.platform' ? event.data : undefined
        toast({
          title: "Echec lors de l'archivage des articles",
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      },
      contexteAbonnements: assign((context: Context, event: Event) => {
        // FIXME : un peu relou d'avoir √† sp√©cifier ca directement
        if (event.type === 'done.invoke.r√©cup√©rerListeAbonnements') {
          return {
            abonnements: event.data,
          }
        }
        return {}
      }),
      t√©l√©chargerNouveaut√©s: assign((context: Context) => {
        // Inspir√© par l'exemple TodoMVC : https://codesandbox.io/s/xstate-todomvc-33wr94qv1?from-embed
        return {
          t√©l√©chargements: context.abonnements?.map((abonnement) => {
            const t√©l√©chargement = {
              feedKey: abonnement.key,
              actor: spawn<Context, Event>(createTelechargerUnAbonnementMachine(abonnement)),
            }
            return t√©l√©chargement
          }),
        }
      }),
      contexteErreur: assign((context: Context, event: Event) => {
        if (event.type === 'error.platform') {
          return {
            error: event.data,
          }
        }
        return {}
      }),
    }
  }, [createTelechargerUnAbonnementMachine, navigate, toast])

  return actions
}

export default useMachineActions
