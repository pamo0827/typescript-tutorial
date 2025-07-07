// server.js
const fastify = require('fastify')({ logger: true });

// ルートの定義
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// サーバーの起動
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();