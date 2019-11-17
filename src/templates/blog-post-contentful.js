import React from "react"
import Prism from "prismjs"
import Moment from "moment"
import { Link, graphql } from "gatsby"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Img from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import coffeeIcon from "../../content/assets/coffee-cup.svg"
import dateIcon from "../../content/assets/date-icon.svg"
import "./prism.css"
import "./blog-post-contentful.css"

const SectionHeading = ({ children }) => <h2>{children}</h2>
const ParagraphText = ({ children }) => <p>{children}</p>
const CodeBlock = ({ children }) => (
  <code style={{ display: "block", lineHeight: "250%" }}>{`${children}`}</code>
)

const options = {
  renderMark: {
    [MARKS.CODE]: code => <CodeBlock>{code}</CodeBlock>,
  },
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => (
      <SectionHeading>{children}</SectionHeading>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => {
      const marks = node.content[0].marks[0]
      if (marks && marks.type === "code") return <>{children}</>
      else return <ParagraphText>{children}</ParagraphText>
    },
    [BLOCKS.QUOTE]: (node, children) => {
      if (
        node.content[0].content[0].marks &&
        node.content[0].content[0].marks[0].type === "code"
      )
        return <pre className="language-javascript">{children}</pre>
    },
  },
}

class BlogPostContentfulTemplate extends React.Component {
  componentDidMount() {
    Prism.highlightAll()
  }

  render() {
    const post = this.props.data.contentfulPost
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    console.log(post.content)
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.title} description={post.subtitle} />
        <article className="blog-post">
          <header>
            <h1
              className="title"
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.title}
            </h1>

            <Img
              fluid={post.image.fluid}
              style={{ marginBottom: rhythm(1), marginTop: rhythm(1) }}
            />
            <p className="subtitle">{post.subtitle}</p>

            <div
              className="info-container"
              style={{
                ...scale(-1 / 5),
                marginBottom: 0,
              }}
            >
              <img src={dateIcon} alt="date" />
              <span>
                {Moment(post.datePosted).format("[The] Mo [of] MMMM, YYYY")}
              </span>

              <img src={coffeeIcon} alt="coffee" />
              <span>{`${post.duration} minute read`}</span>
            </div>
          </header>
          <section>
            {documentToReactComponents(post.content.json, options)}
          </section>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.slug} rel="prev">
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.slug} rel="next">
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostContentfulTemplate

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    contentfulPost(slug: { eq: $slug }) {
      title
      subtitle
      datePosted
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      imageAuthor
      imageAuthorLink
      duration
      tags
      content {
        json
      }
    }
  }
`
