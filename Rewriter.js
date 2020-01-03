const RewritingStream = require("parse5-html-rewriting-stream");

class Rewriter extends RewritingStream {
  emitStartTag(token) {
    let res = `<${token.tagName}`;

    const attrs = token.attrs;
    for (let i = 0; i < attrs.length; i++) {
      const haveDoubleQuote = attrs[i].value.includes('"');
      let qt = haveDoubleQuote ? `'` : `"`;
      res += ` ${attrs[i].name}=${qt}${attrs[i].value}${qt}`;
    }

    res += token.selfClosing ? "/>" : ">";
    this.push(res);
  }
}

module.extends = Rewriter;
