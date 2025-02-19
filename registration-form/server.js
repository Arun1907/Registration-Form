const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = "./RegistrationData/registrationData.json";

if (!fs.existsSync("./RegistrationData")) {
  fs.mkdirSync("./RegistrationData");
}

app.post("/register", (req, res) => {
  const newData = req.body;
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    let jsonData = data ? JSON.parse(data) : [];
    jsonData.push(newData);
    fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving data" });
      res.status(200).json({ message: "Registration successful!" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
