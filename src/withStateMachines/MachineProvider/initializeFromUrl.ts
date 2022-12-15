import { ActorRef, InterpreterFrom } from 'xstate'

import { Event } from '../machine.types'
import navigationMachine from '../navigation/navigation.machine'

// FIXME franchement c'est crade et pas maintenable
const initializeFromUrl = (
  currentLocation: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interpretedStateMachine: InterpreterFrom<typeof navigationMachine>
) => {
  console.log('-- Initialize state machine from URL:', currentLocation)

  if (currentLocation.includes('/news')) {
    interpretedStateMachine.send('NOUVEAUTES')
  } else if (currentLocation.includes('/feeds')) {
    interpretedStateMachine.send('ABONNEMENTS')
    const abonnements = interpretedStateMachine.children.get('abonnements') as ActorRef<Event> | undefined

    if (currentLocation.includes('/feeds/new')) {
      abonnements?.send('Ajouter un abonnement')
      if (currentLocation === '/feeds/new/rss') {
        abonnements?.send('Abonnement RSS')
      } else if (currentLocation === '/feeds/new/twitter') {
        abonnements?.send('Abonnement Twitter')
      }
    } else if (currentLocation === '/feeds/fetching') {
      interpretedStateMachine.send('TELECHARGER')
    }
  } else if (currentLocation.includes('/backup')) {
    interpretedStateMachine.send('SAUVEGARDE')
  }
}

export default initializeFromUrl
