require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));

});

/*   PRODUCTS handle     */

app.get('/api/products', (req, res, next) => {
  const sql = `
          SELECT "productId",
                "name",
                "price",
                "image",
                "shortDescription",
                "longDescription"
            FROM "products";
        `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  const values = [productId];
  const sql = `
          SELECT *
            FROM "products"
          WHERE "productId" = $1;
        `;
  db.query(sql, values)
    .then(result => {
      if (result.rows.length < 1) {
        return next(new ClientError('Cannot find with provided input', 404));
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

/*   CART handle     */

app.get('/api/cart', (req, res, next) => {
  const sql = `
           SELECT "c"."cartItemId",
                  "c"."price",
                  "p"."productId",
                  "p"."image",
                  "p"."name",
                  "p"."shortDescription"
             FROM "cartItems" as "c"
             JOIN "products" as "p" using ("productId")
            WHERE "c"."cartId" = $1
          `;
  const values = [req.session.cartId];
  if (!req.session.cartId) {
    return res.json([]);
  }

  db.query(sql, values)
    .then(result => {
      return res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const productId = req.body.productId;
  const values = [productId];
  const sql = `
            SELECT "price"
            FROM "products"
            WHERE "productId" = $1
            `;

  if (productId < 1) {
    return res.status(400).json({ error: 'Id must be a positive number' });
  }

  db.query(sql, values)
    .then(result => {
      if (result.rows.length < 1) {
        throw (new ClientError('Cannot find product with that provided input', 400));
      }
      if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: result.rows[0].price
        };
      }
      const createSql = `
                  INSERT INTO "carts" ("cartId", "createdAt")
                  VALUES (default, default)
                  RETURNING "cartId"
                  `;

      return (db.query(createSql)
        .then(cartResult => {
          return {
            cartId: cartResult.rows[0].cartId,
            price: result.rows[0].price
          };
        })
      );
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const cartItemSql = `
              INSERT INTO "cartItems" ("cartId", "productId", "price")
              VALUES ($1, $2, $3)
              RETURNING "cartItemId"
              `;
      const values = [data.cartId, productId, data.price];

      return (
        db.query(cartItemSql, values)
          .then(cartItemResult => {
            return {
              cartItemId: cartItemResult.rows[0].cartItemId
            };
          })
      );
    })
    .then(answer => {
      const newCartItemSql = `
               SELECT "c"."cartItemId",
                      "c"."price",
                      "p"."productId",
                      "p"."image",
                      "p"."name",
                      "p"."shortDescription"
                FROM "cartItems" as "c"
                JOIN "products" as "p" using ("productId")
                WHERE "c"."cartItemId" = $1
                `;
      const values = [answer.cartItemId];
      return (
        db.query(newCartItemSql, values)
          .then(data => {
            return res.status(201).json(data.rows[0]);
          })
      );
    })
    .catch(err => next(err));
});

/**   DELETE from Cart */
app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const { cartItemId } = req.params;
  const sql = `
          DELETE FROM "cartItems"
              WHERE "cartItemId" = $1
              RETURNING *;
          `;
  const values = [cartItemId];
  db.query(sql, values)
    .then(response => {
      res.status(204).json(response.rows);
    })
    .catch(err => next(err));
});

/*   ORDERS handle     */
app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(400).json({ error: 'Invalid cart' });
  }
  if (!req.body.name || !req.body.creditCard || !req.body.shippingAddress) {
    return res.status(400).json({ error: 'Must fill out all input fields' });
  }

  const orderSql = `
            INSERT INTO "orders" ("cartId", "name", "creditCard", "shippingAddress")
            VALUES ($1, $2, $3, $4)
            RETURNING * ;
            `;
  const values = [
    req.session.cartId,
    req.body.name,
    req.body.creditCard,
    req.body.shippingAddress
  ];

  db.query(orderSql, values)
    .then(result => {
      req.session.destroy();
      res.status(201).json(result.rows[0]);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
