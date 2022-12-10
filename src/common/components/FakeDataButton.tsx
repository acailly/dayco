import { Button } from '@chakra-ui/react'

import { db } from '../db'
import downloadJson from '../services/downloadJson'

const loadFakeData = async () => {
  const feeds = await db.feeds.toArray()
  downloadJson(feeds, 'dayco-feeds.json')

  await db.feedMetas.clear()

  await db.feeds.clear()
  await db.feeds.add({
    title: 'Blog React',
    url: 'https://reactjs.org/feed.xml',
    type: 'rss',
    key: 'rss:https://reactjs.org/feed.xml',
  })
  await db.feeds.add({
    title: 'Blog Angular',
    url: 'https://blog.angular.io/feed',
    type: 'rss',
    key: 'rss:https://blog.angular.io/feed',
  })
  await db.feeds.add({
    title: 'Blog Vue',
    url: 'https://blog.vuejs.org/feed.rss',
    type: 'rss',
    key: 'rss:https://blog.vuejs.org/feed.rss',
  })

  await db.newsItems.clear()
  await db.newsItems.add({
    feedKey: 'rss:https://reactjs.org/feed.xml',
    read: 0,
    title: 'React v18.0',
    url: 'https://reactjs.org/blog/2022/03/29/react-v18.html',
    timestamp: new Date('2022-03-29 02:00:00'),
  })
  await db.newsItems.add({
    feedKey: 'rss:https://reactjs.org/feed.xml',
    read: 0,
    title: "React Labs: What We've Been Working On – June 2022",
    url: 'https://reactjs.org/blog/2022/06/15/react-labs-what-we-have-been-working-on-june-2022.html',
    timestamp: new Date('2022-06-15 02:00:00'),
  })
  await db.newsItems.add({
    feedKey: 'rss:https://blog.vuejs.org/feed.rss',
    read: 0,
    title: 'Vue 2.7 "Naruto" Released',
    url: 'https://blog.vuejs.org/posts/vue-2-7-naruto.html',
    timestamp: new Date('2022-07-01 14:00:00'),
  })
  await db.newsItems.add({
    feedKey: 'rss:https://blog.angular.io/feed',
    read: 0,
    title: 'Angular v15 is now available!',
    url: 'https://blog.angular.io/angular-v15-is-now-available-df7be7f2f4c8?source=rss----447683c3d9a3---4',
    timestamp: new Date('2022-11-16 22:49:19'),
  })
}

const FakeDataButton = () => {
  return (
    <Button colorScheme="blue" variant="outline" position="fixed" bottom="1rem" right="1rem" onClick={loadFakeData}>
      Charger les données fictives
    </Button>
  )
}

export default FakeDataButton
