const db = require("../database/db.js");

const products = db.prepare(/*sql*/ `
    SELECT 
        id,
        name,
        quantity_per_unit,
        FORMAT('£%.2f', unit_price) AS unit_price,
        units_in_stock,
        FORMAT('£%.2f', unit_price * units_in_stock) AS stock_value,
        units_on_order
    FROM products

`);
function listProducts() {
  return products.all();
}
const nameProducts = db.prepare(/*sql*/ `
    SELECT 
        id,
        name
    FROM products
    WHERE name LIKE '%' || ? || '%'
`);
function searchProducts(str) {
  return nameProducts.all(str);
}
const productById = db.prepare(/*sql*/ `
    SELECT
        products.id,
        products.name,
        categories.name AS category_name,
        categories.description AS category_description
    FROM products
    JOIN categories ON products.category_id = categories.id
    WHERE products.id = ?
`);
function getProduct(id) {
  return productById.get(id);
}
module.exports = { listProducts, searchProducts, getProduct };
