import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  const errorMessages = (req.session as any).messages;
  if (errorMessages) {
    const mostRecentErrorMessage = errorMessages[errorMessages.length - 1];
    res.render("login", { errorMessage: mostRecentErrorMessage });
  } else {
    res.render("login", { errorMessage: null });
  }
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
