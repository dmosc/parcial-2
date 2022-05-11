const express = require("express");
const cors = require("cors");
const {loadDDLQueries, getDatabase} = require("./database");
const assert = require("assert");

loadDDLQueries();

const app = express();
app.use(cors());
app.use(express.json());
const database = getDatabase("P2_A01229551");

app.get('/alumnos', (_, res) => {
  const query = `
      SELECT *
      FROM Alumnos;
  `;

  database.query(query, (error, rows) => {
    if (error) res.status(400).json(error);
    res.status(200).json(rows);
  });
});

app.post('/update-alumno', (req, res) => {
  const payload = req.body;
  assert(payload && payload.id, "A student id is required to be able to update its information");
  const attributes = [
    payload?.name ? `name = "${payload?.name}"` : undefined,
    payload?.enrollment_id ? `enrollment_id = "${payload?.enrollment_id}"` : undefined,
    payload?.email ? `email = "${payload?.email}"` : undefined,
    payload?.major ? `major = "${payload?.major}"` : undefined
  ];
  const query = `
      UPDATE Alumnos
      SET ${attributes.filter(Boolean).join(",")}
      WHERE id = ${payload.id};
  `;
  database.query(query, (error, rows) => {
    if (error) res.status(400).json(error);
    res.status(200).json(rows);
  });
});

app.post('/delete-alumno', (req, res) => {
  const payload = req.body;
  assert(payload && payload.id, "A student id is required to be able to update its information");
  const query = `
      DELETE
      FROM Alumnos
      WHERE id = ${payload.id};
  `;
  database.query(query, (error, rows) => {
    if (error) res.status(400).json(error);
    res.status(200).json(rows);
  });
});

app.listen(4000, () => console.log('Listening on port 4000'));