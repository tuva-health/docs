import React from 'react'
import { DiscussionEmbed } from 'disqus-react'
import { useBlogPost } from '@docusaurus/theme-common/internal'
import BlogPostItem from '@theme-original/BlogPostItem'

export default function BlogPostItemWrapper(props) {
  const { metadata } = useBlogPost()
  const { frontMatter, slug, title } = metadata
  const { comments = true } = frontMatter

  return (
    <>
      <BlogPostItem {...props} />
      {comments && (
        <DiscussionEmbed
          shortname='www-thetuvaproject-com'
          config={{
            url: slug,
            identifier: slug,
            title,
            language: 'en_US',
          }}
        />
      )}
    </>
  )
}