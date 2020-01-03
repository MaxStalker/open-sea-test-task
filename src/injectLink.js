const wrap = (str, url) => `<a href="${url}">${str}</a>`;

module.exports = (html, db) => {
  return html.replace(/[A-Za-z0-9]+/g, match => {
    const data = db.names[match];
    return data ? wrap(match, data.url) : match;
  });
};
