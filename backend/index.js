const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
}))


app.use(express.json())

const routes = require("./routes/xeroRoutes");
app.use("/api/v1", routes);

const PORT = process.env.PORT || 8967

const dbConnect = require('./config/db');
dbConnect();

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
})

app.get("/", (req, res) => {
    res.send(`<h1>This is Home page</h1>`);
})