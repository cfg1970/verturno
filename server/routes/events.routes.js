const express = require("express");
const router = express.Router();

const { verificaAdminRole } = require('../middlewares/autentication');

// Controller
const {
  renderCalendar,
  createNewEvent,
  allEvents,
  updateEvent,
  deleteEvent
} = require("../controllers/event.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// Calendario
router.get("/calendar", isAuthenticated,  renderCalendar);

//===========================================================
//Rest Api for calendar
//===========================================================




// agregar evento por POST
router.post("/calendar/add", [isAuthenticated , verificaAdminRole], createNewEvent);

//listar todoas los eventos
router.get("/calendar/events", isAuthenticated, allEvents);

//update  evento por id
router.put("/calendar/:id", [isAuthenticated , verificaAdminRole], updateEvent);


// Delete evento
router.delete("/calendar/delete/:id", [isAuthenticated , verificaAdminRole],  deleteEvent);

module.exports = router;