const contentfulManagement = require('contentful-management')

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
})

// @ts-ignore
exports.default = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { slug } = req.body

  if (!slug) {
    return res.status(400).json({ error: 'Article slug is required' })
  }

  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID)
    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT || 'master'
    )

    const entries = await environment.getEntries({
      content_type: 'article',
      'fields.slug': slug,
      limit: 1,
    })

    if (entries.items.length === 0) {
      return res.status(404).json({ error: 'Article not found' })
    }

    const entryId = entries.items[0].sys.id
    const article = await environment.getEntry(entryId)

    const currentViews = article.fields.views
      ? article.fields.views['en-US'] || 0
      : 0
    const newViews = currentViews + 1

    article.fields.views = {
      'en-US': newViews,
    }

    const updatedArticle = await article.update()
    await updatedArticle.publish()

    return res.status(200).json({
      success: true,
      previousViews: currentViews,
      newViews: newViews,
    })
  } catch (error) {
    console.error('Error updating article views:', error)
    return (
      res
        .status(500)
        // @ts-ignore
        .json({ error: 'Failed to update views', details: error.message })
    )
  }
}
