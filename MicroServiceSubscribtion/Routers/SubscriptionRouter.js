const express = require("express");
const SubscriptionBll = require("../Bll/SubscriptionsBll");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allSubscriptions = await SubscriptionBll.getAllSubscriptions();
    res
      .status(200)
      .send({ message: "Succefuly get all Subscriptions", allSubscriptions });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.get("/member/:id", async (req, res) => {
  try {
    const memId = req.params.id;
    const subscrip = await SubscriptionBll.getSubscriptionByMemberId(memId);
    res
      .status(200)
      .send({ message: "Succefuly get subscription by member id", subscrip });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newSubscription = req.body.subscriptionObj;
    const subscription = await SubscriptionBll.addSubcription(newSubscription);
    res
      .status(200)
      .send({ message: "Succefuly add new subscription", subscription });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.patch("/newMovieAdd/:id", async (req, res) => {
  try {
    const updateFields = req.body.MovieObj;
    const subscriptionId = req.params.id;
    const updatedSubscription = await SubscriptionBll.addMovieToSubscription(
      subscriptionId,
      updateFields
    );
    res.status(200).send({
      message: "Succefuly add movie to subscription",
      updatedSubscription,
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updateFields = req.body.subscriptionObj;
    const subscriptionId = req.params.id;
    const updatedSubscription = await SubscriptionBll.updateSubscription(
      subscriptionId,
      updateFields
    );
    res
      .status(200)
      .send({ message: "Succefuly update subscription", updatedSubscription });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    await SubscriptionBll.deleteSubscription(subscriptionId);
    res
      .status(200)
      .send({ message: "Succefuly delete subsciption", subscriptionId });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

module.exports = router;
