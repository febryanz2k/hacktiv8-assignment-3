const router = require("express").Router();
const PhotoController = require("../controllers/photoController");

router.get("/", PhotoController.getAllPhotos);
router.get("/:id", PhotoController.getOnePhotoByID);
router.post("/", PhotoController.createPhoto);
router.put("/:id", PhotoController.updateOnePhotoByID);
router.delete("/:id", PhotoController.deleteOnePhotoByID);

module.exports = router;
