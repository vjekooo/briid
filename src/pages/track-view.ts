// import type { APIRoute } from 'astro'
// import { createClient } from 'contentful-management'
//
// export const GET: APIRoute = async ({ request }) => {
//   const client = createClient(
//     {
//       accessToken: import.meta.env.CONTENTFUL_MANAGEMENT_TOKEN,
//     },
//     {
//       defaults: {
//         spaceId: import.meta.env.CONTENTFUL_SPACE_ID,
//         environmentId: import.meta.env.CONTENTFUL_ENVIRONMENT ?? 'master',
//       },
//     }
//   )
//
//   try {
//     console.log('request.url:', request.url)
//
//     const url = new URL(request.url)
//     const slug = url.searchParams.get('slug')
//
//     console.log('slug:', slug)
//
//     const entries = await client.entry.getMany({
//       query: {
//         content_type: 'article',
//         'fields.slug': slug,
//         limit: 1,
//       },
//     })
//
//     if (entries.items.length === 0) {
//       return new Response(JSON.stringify({ error: 'Article not found' }), {
//         status: 404,
//       })
//     }
//
//     const entryId = entries.items[0].sys.id
//     const article = await client.entry.get({
//       entryId,
//     })
//
//     const currentViews = article.fields.views
//       ? article.fields.views['en-US'] || 0
//       : 0
//
//     article.fields.views = {
//       'en-US': (article.fields.views?.['en-US'] ?? 0) + 1,
//     }
//
//     await client.entry.update(
//       {
//         entryId,
//       },
//       article
//     )
//
//     return new Response(
//       JSON.stringify({
//         success: true,
//         previousViews: currentViews,
//         newViews: currentViews + 1,
//       }),
//       { status: 200 }
//     )
//   } catch (error: any) {
//     console.error('Error updating article views:', error)
//
//     return new Response(
//       JSON.stringify({
//         error: 'Failed to update views',
//         details: error?.message ?? 'Unknown error',
//       }),
//       { status: 500 }
//     )
//   }
// }
