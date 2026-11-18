const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')

/* GET index data. */
router.get('/statistics', async (req, res) => {
  const added_todos = await redis.getAsync('added_todos')

  res.send({
    added_todos: Number(added_todos)
  });
});

router.get('/', async (req, res) => {
  const visits = await redis.getAsync('visits')

  await redis.setAsync('visits', Number(visits) + 1)

  res.send({
    ...configs,
    visits: Number(visits) + 1
  });
});

module.exports = router;
