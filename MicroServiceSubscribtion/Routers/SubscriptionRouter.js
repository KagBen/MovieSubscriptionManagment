const express = require("express");
const SubscriptionBll = require("../Bll/SubscriptionsBll");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    SubscriptionBll.getAllSubscriptions();
    res.status(200).send({ message: "Succefuly get all movies", movies });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).send({ message: "Succefuly get movie by id", movie });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    res.status(200).send({ message: "Succefuly add new movie", movie });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    res.status(200).send({ message: "Succefuly update movie", movie });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    res.status(200).send({ message: "Succefuly delete movie", deleteMovie });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});
