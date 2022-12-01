import Dexie, { Table } from 'dexie'

import { Feed, FeedMeta, NewsItem } from './types'

export class Database extends Dexie {
  feeds!: Table<Feed>
  feedMetas!: Table<FeedMeta>
  newsItems!: Table<NewsItem>

  constructor() {
    super('dayco')
    this.version(1).stores({
      feeds: '++id, &key, title, url, type, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret',
      feedMetas: '++id, feedKey, purgeThreshold',
      newsItems: '++id, title, &url, timestamp, feedKey, read, [url+feedKey]',
    })
  }
}

export const db = new Database()
