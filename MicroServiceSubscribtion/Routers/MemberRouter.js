const express = require("express");
const memberBll = require("../Bll/MembersBll");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const members = await memberBll.getMembers();
    res.status(200).send({ message: "Succefuly get All Members", members });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get("/:memberId", async (req, res) => {
  try {
    const member = await memberBll.getMemberById(req.params.memberId);
    res.status(200).send({ message: "Succefuly get Member By id", member });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const memberObj = req.body.memberObj;
    const member = await memberBll.addMember(memberObj);
    res.status(200).send({ message: "Succefuly added Member", member });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updateFields = req.body.memberObj;
    const memberId = req.params.id;
    const updatedMember = await memberBll.updateMember(memberId, updateFields);
    res
      .status(200)
      .send({ message: "Succefuly updated Member", updatedMember });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const memberId = req.params.id;
    await memberBll.deleteMember(memberId);
    res.status(200).send({ message: "Succefuly updated Member", memberId });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
