const api = require("fastify")({ logger: false });
const { parseStream } = require("./rewriter");

// Since we don't need to persist data between server restarts, we can simply
// utilize Javascript object as our key-store "database"
const db = {
  names: {}
};


// GET - Fetch url info for specific name, return 404 if name is not inside db
api.get("/names/:name", (request, reply) => {
  const { name } = request.params;
  const data = db.names[name];
  if (!data) {
    return api.notFound(request, reply);
  }
  reply.code(200).send({
    name,
    ...data
  });
});


// PUT - Add new url info for specific name that we want to annotate
api.put("/names/:name", (request, reply) => {
  const { name } = request.params;
  db.names[name] = request.body;
  reply.code(204).send();
});


// POST - Annotate html fragment in request payload
api.post("/annotate", async (request, reply) => {
  const response = parseStream(request.body, db);
  reply.code(200).send(response);
});


// DELETE - clear all the names from "database"
api.delete("/names", (request, reply) => {
  db.names = {};
  reply.code(204).send();
});


// Decorator to handle 404 response
api.decorate("notFound", (request, reply) => {
  reply
    .code(404)
    .type("text/html")
    .send("Not Found");
});
api.setNotFoundHandler(api.notFound);


// Run the server!
const start = async () => {
  try {
    await api.listen(3000);
    api.log.info(`server listening on ${api.server.address().port}`);
  } catch (err) {
    api.log.error(err);
    process.exit(1);
  }
};
start();
