import express from "express";
const router = express.Router();
export default router;

import { getEmployee, getEmployees } from "#db/queries/employees";

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.param("id", async (req, res, next, id) => {
  const employee = await getEmployee(id);
  if (!employee) return res.status(404).send("Employee not found.");

  req.employee = employee;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.employee);
});
