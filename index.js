const express = require("express");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { getDocs, collection, query, where } = require("firebase/firestore");
const { auth, db } = require("./firebase");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("connected");
});

app.post("/", (req, res) => {
  // Read the variables sent via POST from our API
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let response = "";
  if (text == "") {
    // Enter email address
    response = `CON Enter your email address.`;
  } else if (text !== "") {
    // Show menu
    let data = text.split("*");
    response = `CON Hello ${
      text.split("*")[0]
    } . \n 1. My Account.\n 2. My Properties. \n 3. Search a property.`;

    if (data[1] == 1) {
      response = `END My account. \n Your account email is ${data[0]}`;
    } else if (data[1] == 2) {
      const dbRef = collection(db, "purchases");
      const q = query(dbRef, where("buyer", "==", data[0]));
      let properties = [];
      async () => {
        const docs = await getDocs(q);
        docs.forEach((doc) => {
          properties.push(doc.data());
        });
      };

      response = `END My properties. \n
      ${
        properties.length > 0
          ? properties.map((prop, i) => {
              return `${prop.property.name} \n`;
            })
          : `No properties found.`
      } 
      `;
    } else if (data[1] == 3) {
      response = `CON Search a property with Property Identification Number. \n`;
    }
  }

  // Send the response back to the API
  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(5000, () => console.log("Server running"));
