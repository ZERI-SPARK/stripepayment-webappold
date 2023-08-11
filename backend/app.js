const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(
  "sk_test_51NdGX5SEHmuyFFRClzHl07oq95jbshm4h1T6IJRrEtE8P3UCsQn1ywWxhNShQ6Sdelo7agLy49y4XNfJCnEKnctk00O73l2hk7"
);
var cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect(
  "mongodb+srv://kartikeysingh907:kartikeysingh907@cluster0.cetzkjv.mongodb.net/?retryWrites=true&w=majority"
  //   "mongodb+srv://kartikeysingh907:kartikeysingh907@cluster0.cetzkjv.mongodb.net/?retryWrites=true&w=majority"
);

// User schema and model setup using Mongoose
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  planActive: String,
  cardnumber: String,
  cardcvv: String,
  cardmonth: String,
  cardyear: String,
  planinterval: String,
  planId: String,
});

const User = mongoose.model("User", userSchema);

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ userId: newUser._id, message: "Created" });
    // res.status(200).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    res.json({ userId: user._id, planActive: user.planActive });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

// Protected route
app.put("/update", async (req, res) => {
  try {
    const {
      userId,
      planActive,
      cardnumber,
      cardcvv,
      cardmonth,
      cardyear,
      planinterval,
      planId,
    } = req.body;
    const user = await User.findById(userId);
    if (!userId) {
      res.status(500).json({ error: "error" });
      return;
    }
    // user[newFieldName] = newValue;
    // await user.save();
    const filter = { _id: userId };
    const update = {
      planActive: planActive,
      cardnumber: cardnumber,
      cardcvv: cardcvv,
      cardmonth: cardmonth,
      cardyear: cardyear,
      planinterval: planinterval,
      planId: planId,
    };

    const doc = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(doc, "hi");
    res.json({ message: "User details updated." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.post("/getPlan", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.find({_id:userId});

    if (!user) {
      return res.status(401).json({ error: "Not found." });
    }

    res.json({  user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.post("/subscribe", async (req, res) => {
  const selectedPlanId = req.body.planId;
  const details = {
    basicyearly: "plan_OQgu32k54iLiMo",
    standardyearly: "plan_OQguP6l3ivkjNN",
    premiumyearly: "plan_OQgunOw7PEtYcx",
    regularyearly: "plan_OQguBzgnXX466K",
    basicmonthly: "plan_OQh5RGDtR8FDRL",
    standardmonthly: "plan_OQh5w2YAE3WjRe",
    premiummonthly: "plan_OQh5vDJMJrkJ7g",
    regularmonthly: "plan_OQh5dXdAczxXcK",
  };
  const customer = await stripe.customers.create({
    // source: "token_from_stripe_elements_or_checkout",
    email: "customer@example.com", // Replace with customer's email
    // source: "card_1NZex82eZvKYlo2CZR21ocY1",
  });
  console.log(customer, "customer");
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: selectedPlanId }],
  });

  console.log("Subscription created:", subscription.id);
  res.send("Subscription successful!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// async function createStripePlans() {
//   const planDetails = {
//     basic: {
//       monthlyPrice: 100,
//       yearlyPrice: 1000,

//       videoQuality: "Good",
//       resolution: "480p",
//       devices: ["Phone"],
//       numberOfScreens: 1,
//     },
//     standard: {
//       monthlyPrice: 200,
//       yearlyPrice: 2000,
//       videoQuality: "Good",
//       resolution: "720p",
//       devices: ["Phone", "Tablet"],
//       numberOfScreens: 3,
//     },
//     premium: {
//       monthlyPrice: 500,
//       yearlyPrice: 5000,
//       videoQuality: "Better",
//       resolution: "1080p",
//       devices: ["Phone", "Tablet", "Computer"],
//       numberOfScreens: 5,
//     },
//     regular: {
//       monthlyPrice: 700,
//       yearlyPrice: 7000,
//       videoQuality: "Best",
//       resolution: "4K+HDR",
//       devices: ["Phone", "Tablet", "TV"],
//       numberOfScreens: 10,
//     },

//   };

//   for (const planName in planDetails) {
//     const planDetail = planDetails[planName];

//     // Create a product for the plan
//     const product = await stripe.products.create({
//       name: planName + " Plan",
//     });
//     // Create the plan using product and other details
//     const plan = await stripe.plans.create({
//       amount: planDetail.monthlyPrice,
//       currency: "inr",
//       interval: "month",
//       product: product.id,
//       nickname: planName,
//     });

//     console.log("Plan created:", plan.id);
//   }
// }
