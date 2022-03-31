const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

const Campground = require("../models/campground");

router.route('/')
      .get(catchAsync(campgrounds.renderAllCampgrounds))
      .post( isLoggedIn, validateCampground, catchAsync(campgrounds.createNewCampground) )

router.get("/new", isLoggedIn, campgrounds.renderNewCampground);

router.route('/:id')
      .get(catchAsync(campgrounds.showCampground))
      .put(isLoggedIn,isAuthor,validateCampground,catchAsync(campgrounds.updateCampground))
      .delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground))


router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editCampground))

module.exports = router;
