import algoliasearch from 'algoliasearch'
import siteMetadata from '../data/siteMetadata.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import path from 'path'
import dotenv from 'dotenv'

// load .env file
dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
})

const rebuildSearchIndex = async () => {
  const client = algoliasearch(
    siteMetadata.search.algoliaConfig.appId,
    process.env.ALGOLIA_ADMIN_API_KEY
  )
  const index = client.initIndex(siteMetadata.search.algoliaConfig.indexName)
  // convert tha data retrieved by contentlayer
  // into the desired Algolia format
  const algoliaPosts = allBlogs.map((blog) => {
    return {
      objectID: blog._id,
      title: blog.title,
      excerpt: blog.summary,
      slug: blog.slug,
      date: blog.date,
    }
  })
  // save all posts info to Algolia
  await index.replaceAllObjects(algoliaPosts)

  console.log('Algolia search index generated...')
}

rebuildSearchIndex()
