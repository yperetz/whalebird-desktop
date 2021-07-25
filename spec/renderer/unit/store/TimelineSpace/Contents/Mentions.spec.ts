import { Entity } from 'megalodon'
import Mentions, { MentionsState, MUTATION_TYPES } from '@/store/TimelineSpace/Contents/Mentions'

const account1: Entity.Account = {
  id: '1',
  username: 'h3poteto',
  acct: 'h3poteto@pleroma.io',
  display_name: 'h3poteto',
  locked: false,
  created_at: '2019-03-26T21:30:32',
  followers_count: 10,
  following_count: 10,
  statuses_count: 100,
  note: 'engineer',
  url: 'https://pleroma.io',
  avatar: '',
  avatar_static: '',
  header: '',
  header_static: '',
  emojis: [],
  moved: null,
  fields: null,
  bot: false
}

const account2: Entity.Account = {
  id: '2',
  username: 'h3poteto',
  acct: 'h3poteto@mstdn.io',
  display_name: 'h3poteto',
  locked: false,
  created_at: '2019-03-26T21:30:32',
  followers_count: 10,
  following_count: 10,
  statuses_count: 100,
  note: 'engineer',
  url: 'https://mstdn.io',
  avatar: '',
  avatar_static: '',
  header: '',
  header_static: '',
  emojis: [],
  moved: null,
  fields: null,
  bot: false
}

const status1: Entity.Status = {
  id: '1',
  uri: 'http://example.com',
  url: 'http://example.com',
  account: account1,
  in_reply_to_id: null,
  in_reply_to_account_id: null,
  reblog: null,
  content: 'hoge',
  created_at: '2019-03-26T21:40:32',
  emojis: [],
  replies_count: 0,
  reblogs_count: 0,
  favourites_count: 0,
  reblogged: null,
  favourited: null,
  muted: null,
  sensitive: false,
  spoiler_text: '',
  visibility: 'public',
  media_attachments: [],
  mentions: [],
  tags: [],
  card: null,
  poll: null,
  application: {
    name: 'Web'
  } as Entity.Application,
  language: null,
  pinned: null,
  emoji_reactions: [],
  bookmarked: false,
  quote: false
}

const status2: Entity.Status = {
  id: '2',
  uri: 'http://example.com',
  url: 'http://example.com',
  account: account1,
  in_reply_to_id: null,
  in_reply_to_account_id: null,
  reblog: null,
  content: 'hoge',
  created_at: '2019-03-26T21:40:32',
  emojis: [],
  replies_count: 0,
  reblogs_count: 0,
  favourites_count: 0,
  reblogged: null,
  favourited: null,
  muted: null,
  sensitive: false,
  spoiler_text: '',
  visibility: 'public',
  media_attachments: [],
  mentions: [],
  tags: [],
  card: null,
  poll: null,
  application: {
    name: 'Web'
  } as Entity.Application,
  language: null,
  pinned: null,
  emoji_reactions: [],
  bookmarked: false,
  quote: false
}

const rebloggedStatus: Entity.Status = {
  id: '3',
  uri: 'http://example.com',
  url: 'http://example.com',
  account: account1,
  in_reply_to_id: null,
  in_reply_to_account_id: null,
  reblog: status2,
  content: 'hoge',
  created_at: '2019-03-26T21:40:32',
  emojis: [],
  replies_count: 0,
  reblogs_count: 0,
  favourites_count: 0,
  reblogged: null,
  favourited: null,
  muted: null,
  sensitive: false,
  spoiler_text: '',
  visibility: 'public',
  media_attachments: [],
  mentions: [],
  tags: [],
  card: null,
  poll: null,
  application: {
    name: 'Web'
  } as Entity.Application,
  language: null,
  pinned: null,
  emoji_reactions: [],
  bookmarked: false,
  quote: false
}

const notification1: Entity.Notification = {
  id: '1',
  account: account2,
  status: status1,
  type: 'mention',
  created_at: '2019-04-01T17:01:32'
}

const notification2: Entity.Notification = {
  id: '2',
  account: account2,
  status: rebloggedStatus,
  type: 'mention',
  created_at: '2019-04-01T17:01:32'
}

describe('TimelineSpace/Contents/Mentions', () => {
  describe('mutations', () => {
    let state: MentionsState
    beforeEach(() => {
      state = {
        lazyLoading: false,
        heading: true,
        mentions: []
      }
    })

    describe('appendMentions', () => {
      describe('heading', () => {
        describe('normal', () => {
          beforeEach(() => {
            state = {
              lazyLoading: false,
              heading: true,
              mentions: [notification1]
            }
          })
          it('should update mentions', () => {
            Mentions.mutations![MUTATION_TYPES.APPEND_MENTIONS](state, notification2)
            expect(state.mentions).toEqual([notification2, notification1])
          })
        })

        describe('duplicated status', () => {
          beforeEach(() => {
            state = {
              lazyLoading: false,
              heading: true,
              mentions: [notification2, notification1]
            }
          })
          it('should not be updated mentions', () => {
            Mentions.mutations![MUTATION_TYPES.APPEND_MENTIONS](state, notification2)
            expect(state.mentions).toEqual([notification2, notification1])
          })
        })
      })

      describe('not heading', () => {
        describe('normal', () => {
          beforeEach(() => {
            state = {
              lazyLoading: false,
              heading: false,
              mentions: [notification1]
            }
          })
          it('should update mentions', () => {
            Mentions.mutations![MUTATION_TYPES.APPEND_MENTIONS](state, notification2)
            expect(state.mentions).toEqual([notification2, notification1])
          })
        })

        describe('duplicated status', () => {
          beforeEach(() => {
            state = {
              lazyLoading: false,
              heading: false,
              mentions: [notification2, notification1]
            }
          })
          it('should not be updated mentions', () => {
            Mentions.mutations![MUTATION_TYPES.APPEND_MENTIONS](state, notification2)
            expect(state.mentions).toEqual([notification2, notification1])
          })
        })
      })
    })

    describe('insertMentions', () => {
      beforeEach(() => {
        state = {
          lazyLoading: false,
          heading: false,
          mentions: [notification2]
        }
      })
      it('should be inserted', () => {
        Mentions.mutations![MUTATION_TYPES.INSERT_MENTIONS](state, [notification1])
        expect(state.mentions).toEqual([notification2, notification1])
      })
    })

    describe('updateToot', () => {
      beforeEach(() => {
        state = {
          lazyLoading: false,
          heading: false,
          mentions: [notification2, notification1]
        }
      })
      it('should be updated', () => {
        const favourited: Entity.Status = Object.assign(status1, {
          favourited: true
        })
        Mentions.mutations![MUTATION_TYPES.UPDATE_TOOT](state, favourited)
        expect(state.mentions[0].status!.favourited).toEqual(null)
        expect(state.mentions[1].status!.favourited).toEqual(true)
      })
    })

    describe('deleteToot', () => {
      describe('message is not reblogged', () => {
        beforeEach(() => {
          state = {
            lazyLoading: false,
            heading: true,
            mentions: [notification2, notification1]
          }
        })
        it('should be deleted', () => {
          Mentions.mutations![MUTATION_TYPES.DELETE_TOOT](state, notification1.status!.id)
          expect(state.mentions.length).toEqual(1)
        })
      })
      describe('message is reblogged', () => {
        beforeEach(() => {
          state = {
            lazyLoading: false,
            heading: true,
            mentions: [notification2, notification1]
          }
        })
        it('should be deleted', () => {
          Mentions.mutations![MUTATION_TYPES.DELETE_TOOT](state, notification2.status!.id)
          expect(state.mentions.length).toEqual(1)
        })
      })
    })
  })
})
