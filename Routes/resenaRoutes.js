import {Router} from "express";
import {requireAdmin} from "../utils/adminRequire.js"
import { getCurrentUser } from "../auth/deps.js";

const routerResena = Router();

routerResena.get("/create", async (req, res, next) => {})

routerResena.post("/edit/:id", async (req, res, next) => {})

routerResena.delete("/delete/:id", async (req, res, next) => {})

routerResena.get("/list", async (req, res, next) => {})

export default routerResena;
