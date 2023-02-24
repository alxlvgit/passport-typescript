import express from "express";
const router = express.Router();
import { ensureAuthenticated, isAdmin } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  })
});

router.get("/admin", ensureAuthenticated, isAdmin, (req, res) => {
  res.render("admin", {
    user: req.user,
    sessionID: Object.keys((req.sessionStore as any).sessions),
    sessions: (req.sessionStore as any).sessions
  });
});

router.post("/admin/:sessionID", (req, res) => {
  const sessionID = req.params.sessionID;
  const store = req.sessionStore;
  store.destroy(sessionID, (err) => {
    console.log(err);
  })
  res.redirect("/admin");
});

export default router;
