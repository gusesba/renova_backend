const express = require("express");
const cors = require("cors");
const app = express();

const clients = require("./routes/clients");
const products = require("./routes/products");
const sells = require("./routes/sells");
const notFound = require("./middleware/not-found");
const port = process.env.PORT || 5000;

require("./db/index");
app.use(cors());
app.use(express.json());

app.use("/api/v1/clients", clients);
app.use("/api/v1/products", products);
app.use("/api/v1/sells", sells);

app.use(notFound);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
