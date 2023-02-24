import { Request, Response, NextFunction } from "express";

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
}

export const checkRole = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as any).role === "admin") {
    res.redirect("/admin");
  }
  res.redirect("/dashboard");
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as any).role === "admin") {
    return next();
  }
  res.redirect("/dashboard");
}
