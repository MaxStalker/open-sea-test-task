# **Instructions**

This challenge asks you to build a small web service. You can use any language and any third-party libraries you like.

1. Make an HTTP service that satisfies the requirements below. If anything is ambiguous, please first refer to the test script provided. Otherwise, feel free to shoot us an email.
2. Test your service using the script provided (`test.sh`). Start your server and then follow the instructions in the script to run it against your service. We will test your service with a different script and also on tens of thousands of names, so please write code that generalizes and scales.
3. Create a README that contains the following:
   - For each API endpoint, state its space and runtime complexities (Big O) and explain why your implementation achieves these. If you considered alternate implementations, explain why you chose the right one. Be clear and concise (no more than a few sentences per endpoint).
   - Include build instructions that tell us how to compile and run your program. You are welcome to use external libraries in your solution, but make sure they are covered by your build instructions.
4. Email it [alex.atallah@opensea.io](mailto:alex.atallah@opensea.io) (cc [devin.finzer@opensea.io](mailto:devin.finzer@opensea.io)) with the subject line, "Challenge Solution - [Your Name]".

**If you're writing in a language like Python or Javascript, please try to submit two single files (readme and program), so we can review it more quickly. For Java/c++ submissions, directories are fine, but (due to Gmail virus scanning), please add @dfinzer and @alexanderatallah to a private git repo for your submission.**


## **What we're looking for**

We evaluate solutions based on maintainability and robustness. We'd like you to strike a balance between the two, with a mild preference towards maintainability.

Don't worry too much about where it falls in the spectrum though; it's more important that when we talk about your code that you recognize the tradeoffs you made and what you can cut/add if asked to move in either direction.

In particular, if there's a (well respected) library or framework that you would like to use as part of your implementation, please use it. We're here to make software that accommodates (some frankly complex) market logic, not to reimplement bcrypt.


## **Requirements**

Create a web service that annotates HTML snippets by hyperlinking names. Names satisfy the following regex: `[A-Za-z0-9]+`. ("Bob09" is an example name. The string "Alex.com" contains 2 names: "Alex" and "com".)

The service should expose an HTTP API that supports the following operations:

1. Create/update the link for a particular name using an HTTP `PUT` on a URL of the form `/names/[name]`. The body of the request contains JSON of the form `{ "url": "[url goes here]" }`.
2. Fetch the information for a given name using an HTTP `GET` on a URL of the form `/names/[name]`. This should return JSON in the following format: `{ "name": "[name goes here]", "url": "[url goes here]" }`
3. Delete all the data on an HTTP `DELETE` on the URL `/names`. (Note: data is NOT required to persist between server restarts.)
4. The `/annotate` endpoint expects a `POST` request with an HTML snippet (valid HTML on one line) in the request body. It returns the snippet with all occurrences of linkable names hyperlinked with the link stored on the server. If a name occurs in an existing hyperlink, then it is unchanged. No element attributes or tag names should be modified. The returned HTML should not have any new newlines or spaces. You should only annotate complete names that are not part of a larger name. For example, if your server contains the names "Alex" (`http://alex.com`) and "Bo" (`http://bo.com`) and the input snippet is `Alex Alexander <a href="http://foo.com" data-Bo="Bo">Some sentence about Bo</a>`, then the expected output is `<a href="http://alex.com">Alex</a> Alexander <a href="http://foo.com" data-Bo="Bo">Some sentence about Bo</a>`. This endpoint should be robust and work on all valid HTML snippets, so you should use an actual HTML parser (not just a simple regexp find-and-replace).
5. Your implementation should scale to storing tens of thousands of names and annotating snippets that are as long as a typical webpage (e.g., `nytimes.com`). All API endpoints at this scale should run in at most a few seconds.
6. For any endpoint that mutates state, the following contract should hold: after a client receives a response, the change should be reflected in all subsequent API calls. E.g., if I have completed a `PUT` of a new name, I should immediately be able to `GET` it.

# **Other guidelines**

All implementation details are up to you. You should use whatever language, tools, and libraries you are *most familiar* with. You are welcome to use any tools or resources at your disposal (e.g., OpenSea documentation, GitHub, Google Search, etc.), but the work must be your own – no collaboration with others.

Your solution should scale to deal with tens of thousands of names and serve a few annotation queries per second.

The test script cares about HTML attribute ordering. However, if your solution emits the correct HTML with attributes in a different order, that's fine.

The test script is provided to help you, but by no means covers a comprehensive set of test cases. **We encourage you to write unit tests to anticipate additional edge cases.**

We estimate that this challenge should take roughly 2 hours to complete. Feel free to reach out to us with any questions/clarifications, and happy coding!

# **Credits**

Quinn Slack @ Sourcegraph for the idea and sample data!
