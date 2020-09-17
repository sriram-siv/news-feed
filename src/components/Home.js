import React from 'react'

import { getKeywords } from '../lib/feed'
import { getEverything } from '../lib/api'
import NewsCard from './NewsCard'

class Home extends React.Component {

  state = {
    keywords: []
  }

  async componentDidMount() {
    const keywords = getKeywords()
    if (!keywords) return
    const keywordsObj = await this.getArticles(keywords)
    this.setState({ keywords: keywordsObj })
  }

  async getArticles(keywords) {

    const keywordsObj = []

    for (let i = 0; i < keywords.length; i++) {
      const response = await getEverything({ query: keywords[i], pageSize: 5 })
      keywordsObj.push({ query: keywords[i], articles: response.data.articles })
    }

    return keywordsObj
  }


  render() {
    return (
      <>
        <section className={`hero is-info is-bold ${!this.state.keywords[0] ? 'is-fullheight-with-navbar' : ''}`}>
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1 has-text-centered has-text-black">
                News Feed
                {/* <span role="img" aria-label="cheese emoji">🧀</span> */}
              </h1>
            </div>
          </div>
        </section>
        <div className="news-grid">
          {this.state.keywords[0] && this.state.keywords.map(keyword => {
            return (
              <>
                <h3>{keyword.query}</h3>
                {keyword.articles.map((article, i) => <NewsCard key={i} {...article} />)}
              </>
            )
          })}
        </div>
      </>
    )
  }
}

export default Home