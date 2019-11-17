import React from "react"
import Moment from "moment"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "./index.css"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulPost.edges

    const renderTags = node =>
      node.tags.map(tag => (
        <Link to={`/tags/${tag}`} key={tag}>{`#${tag}`}</Link>
      ))

    const renderPosts = posts => {
      return posts.map(({ node }) => {
        const title = node.title || node.slug
        return (
          <article key={node.slug} className="article-preview">
            <header>
              <h3
                className="title"
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link to={node.slug}>{title}</Link>
              </h3>
              <small>
                {Moment(node.datePosted).format("[The] Mo [of] MMMM, YYYY")}
              </small>
            </header>
            <section>
              <p className="subtitle">{node.subtitle}</p>
              <div className="tags">{renderTags(node)}</div>
            </section>
          </article>
        )
      })
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {renderPosts(posts)}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      edges {
        node {
          title
          subtitle
          datePosted
          slug
          duration
          tags
        }
      }
    }
  }
`
