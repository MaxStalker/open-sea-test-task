const p5 = require("parse5");
const SerializerStream = require("parse5-serializer-stream");
const Rewriter = require("./Rewriter");
const injectLink = require("./injectLink");

module.exports = (str, db) => {
  let insideLink = false;
  const htmlStream = new Rewriter();

  htmlStream.on("startTag", node => {
    if (node.tagName === "a") {
      insideLink = true;
    }
    htmlStream.emitStartTag(node);
  });

  htmlStream.on("text", (node, text) => {
    if (!insideLink) {
      htmlStream.emitRaw(injectLink(text, db));
    } else {
      htmlStream.emitRaw(text);
    }
  });

  htmlStream.on("endTag", node => {
    if (node.tagName === "a") {
      insideLink = true;
    }
    htmlStream.emitEndTag(node);
  });

  return new SerializerStream(p5.parseFragment(str)).pipe(htmlStream);
};
