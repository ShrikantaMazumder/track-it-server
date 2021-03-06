"use strict";

import express from "express";
import { handleValidations as handleValidation } from '../middlewares';
import validators from '../models/view-models/index';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  saveUser,
  updateUser
} from "../services/userService";

const router = express.Router();

const getHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    return next(error, req, res);
  }
};

const getByIdHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await getUserById(id);
    res.status(200).send(user);
  } catch (error) {
    return next(error, req, res);
  }
};

const postHandler = async (req, res, next) => {
  const reqData = req.body;
  try {
    const user = await saveUser(reqData);
    res.status(201).send(user);
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const result = await updateUser(req.body);
    res.status(201).send(result);
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteUser(id);
    res.status(201).send("User deleted");
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/", getHandler);
router.get("/:id", getByIdHandler);
router.post("/",handleValidation(validators.userSchemaValidator) , postHandler);
router.put("/update", putHandler);
router.delete("/delete/:id", deleteHandler);

const configureUserController = (app) => {
  app.use("/users", router);
};

export default configureUserController;
