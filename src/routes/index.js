// routes/index.js
import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({ hi: there });
});

export default router;
