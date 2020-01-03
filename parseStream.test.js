const parseStream = require("./parseStream");

// Simple utility method to convert streams into strings
async function readableToString(readable) {
  let result = "";
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}

test("single name in a string", async () => {
  const db = {
    names: {
      alex: {
        url: "http://alex.com"
      }
    }
  };
  const fragment = "alex";
  const correctAnswer = `<a href="http://alex.com">alex</a>`;
  const response = await readableToString(parseStream(fragment, db));
  expect(response).toBe(correctAnswer);
});
test("single name - data attribute", async () => {
  const db = {
    names: {
      alex: {
        url: "http://alex.com"
      }
    }
  };
  const fragment = `<div data-alex="alex">alex</div>`;
  const correctAnswer = `<div data-alex="alex"><a href="http://alex.com">alex</a></div>`;
  const response = await readableToString(parseStream(fragment, db));
  expect(response).toBe(correctAnswer);
});
test("single name - tricky case", async () => {
  const db = {
    names: {
      name: {
        url: "https://name.com"
      }
    }
  };
  const fragment = "<div class='<div class=\"name\">name</a>'>name</div>";
  const correctAnswer = `<div class='<div class="name">name</a>'><a href="https://name.com">name</a></div>`;
  const response = await readableToString(parseStream(fragment, db));
  expect(response).toBe(correctAnswer);
});
test("single name - deeper inside link", async () => {
  const db = {
    names: {
      alex: {
        url: "http://alex.com"
      }
    }
  };
  const fragment = '<a href="http://otherplace.com"><div>alex</div></a>';
  const correctAnswer = fragment;
  const response = await readableToString(parseStream(fragment, db));
  expect(response).toBe(correctAnswer);
});
test("many matches, but inside a link", async () => {
  const db = {
    names: {
      alex: {
        url: "http://alex.com"
      },
      bo: {
        url: "http://bo.com"
      }
    }
  };
  const fragment = `<a href="http://neverlend.com">alex is bob and casey friend</a>`;
  const response = await readableToString(parseStream(fragment, db));
  expect(response).toBe(fragment);
});
test("no matches in string", async () => {
  const db = {
    names: {
      alex: {
        url: "http://alex.com"
      }
    }
  };
  const fragment = "todd is a nice guy";
  const response = await readableToString(parseStream(fragment, db));
  expect(response).toBe(fragment);
});
test("single name in a longer string", async () => {
  const db = {
    names: {
      alex: {
        url: "http://alex.com"
      }
    }
  };
  const fragment = "alex, bo and casey went to a bar";
  const correctAnswer = `<a href="http://alex.com">alex</a>, bo and casey went to a bar`;
  const response = await readableToString(parseStream(fragment, db));
  expect(response).toBe(correctAnswer);
});
test("many names in a longer string", async () => {
  const db = {
    names: {
      alex: {
        url: "http://alex.com"
      },
      bo: {
        url: "http://bo.com"
      }
    }
  };
  const fragment = "alex, bo and casey went to a bar";
  const correctAnswer = `<a href="http://alex.com">alex</a>, <a href="http://bo.com">bo</a> and casey went to a bar`;
  const response = await readableToString(parseStream(fragment, db));
  expect(response).toBe(correctAnswer);
});
test("many names and matches", async () => {
  const db = {
    names: {
      alex: {
        url: "http://alex.com"
      },
      bo: {
        url: "http://bo.com"
      }
    }
  };
  const fragment = "alex alexander alexandria alexbocasey";
  const correctAnswer = `<a href="http://alex.com">alex</a> alexander alexandria alexbocasey`;
  const response = await readableToString(parseStream(fragment, db));
  expect(response).toBe(correctAnswer);
});
test("single name - svg tags", async () => {
  const db = {
    names: {
      alex: {
        url: "http://alex.com"
      },
      bo: {
        url: "http://bo.com"
      }
    }
  };
  const fragment = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="0" y="20" font-family="Verdana" font-size="24" fill="blue">alex</text></svg>`;
  const correctAnswer = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="0" y="20" font-family="Verdana" font-size="24" fill="blue"><a href="http://alex.com">alex</a></text></svg>`;
  const response = await readableToString(parseStream(fragment, db));
  expect(response).toBe(correctAnswer);
});
