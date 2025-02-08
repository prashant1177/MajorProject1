require("dotenv").config(); // Load .env file variables
const Listing = require("../models/listing.js");
const Booking = require("../models/booking");

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports.index = async (req, res) => {
  const { location, price } = req.query;
  let filter = location
    ? { location: { $regex: location, $options: "i" } }
    : {};
  filter = price ? { ...filter, price: { $lte: price } } : filter;

  const allListings = await Listing.find(filter);
  res.render("./listings/index.ejs", { allListings, filter });
};

module.exports.userListing = async (req, res) => {
  let { id } = req.params;

  const allListings = await Listing.find({ owner: id });
  res.render("./listings/userListing.ejs", { allListings });
};

module.exports.create = async (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not found");
    res.redirect("/listings");
  }
  const bookings = await Booking.find({ hotel: id });

  const bookedDates = bookings.flatMap((booking) => {
    let dates = [];
    let currentDate = new Date(booking.fromDate);
    while (currentDate <= new Date(booking.toDate)) {
      dates.push(currentDate.toISOString().split("T")[0]); // Convert to YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  });
  res.render("./listings/show.ejs", { listing, bookedDates });
};

module.exports.edit = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not found");
    res.redirect("/listings");
  }
  res.render("./listings/edit.ejs", { listing });
};

module.exports.update = async (req, res) => {
  try {
    let { id } = req.params;
    
    // Fetch the existing listing
    const postDoc = await Listing.findById(id);
    if (!postDoc) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    let newPath = postDoc.cover; // Default to existing image

    if (req.file) {
      const { originalname, buffer } = req.file;

      // Check if required fields are present in req.body
      if (
        !req.body.title ||
        !req.body.description ||
        !req.body.price ||
        !req.body.location ||
        !req.body.capacity
      ) {
        return res.status(400).send("Missing required fields.");
      }

      // Function to upload to Cloudinary
      const uploadToCloudinary = (buffer, originalname) => {
        return new Promise((resolve, reject) => {
          const fileStream = streamifier.createReadStream(buffer);

          const uploadStream = cloudinary.uploader.upload_stream(
            { public_id: `listings/${Date.now()}_${originalname}` },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );

          fileStream.pipe(uploadStream);
        });
      };

      // Upload and get the new image URL
      newPath = await uploadToCloudinary(buffer, originalname);
    }

    // Update the listing
    await Listing.findByIdAndUpdate(id, {
      title: req.body.title,
      description: req.body.description,
      image: newPath,
      price: req.body.price,
      location: req.body.location,
      capacity: req.body.capacity,
      owner: req.user._id,
    });

    req.flash("success", "Listing updated successfully");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).send("Server Error");
  }
};


module.exports.delete = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing is deleted succesfully");
  res.redirect("/listings");
};

module.exports.saveListings = async (req, res) => {
  
  // If there's an error in multer (image upload)
  if (req.fileValidationError) {
    return res.status(400).send(req.fileValidationError);
  }

  try {
    const { originalname, buffer } = req.file;

    // Check if required fields are present in req.body
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.price ||
      !req.body.location ||
      !req.body.capacity
    ) {
      return res.status(400).send("Missing required fields.");
    }

    // Convert the buffer to a stream
    const fileStream = streamifier.createReadStream(buffer);

    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload_stream(
      { public_id: `listings/${Date.now()}_${originalname}` },
      async (error, result) => {
        if (error) {
          return res.status(500).send("Error uploading to Cloudinary.");
        }

        // Save the new listing with the Cloudinary image URL
        let newListing = new Listing({
          title: req.body.title,
          description: req.body.description,
          image: result.secure_url, // Use the Cloudinary URL
          price: req.body.price,
          location: req.body.location,
          capacity: req.body.capacity,
          owner: req.user._id,
        });

        await newListing.save();

        req.flash("success", "Listing added successfully");
        res.redirect("/listings");
      }
    );

    // Pipe the fileStream to Cloudinary's upload stream
    fileStream.pipe(uploadResult);
  } catch (error) {
    console.error("Error saving listing:", error);
    res.status(500).send("Server Error");
  }
};
