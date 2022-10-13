function condenseNYTimesData(response) {
    var articles = [];
    for(const a of data.response.docs) {
        articles.push({
            "title": a.headline,
            "image": "https://nytimes.com/" + a.multimedia[0].url,
            "lead_text": a.lead_paragraph,
            "authors": a.byline.person,
            "word_count": a.word_count,
            "url": a.web_url
        });
    }
    return articles;
}