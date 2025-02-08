module.exports.aboutus = async (req, res) => {
  res.render("./pages/aboutUs.ejs");
};

module.exports.contact = async (req, res) => {
  res.render("./pages/contact.ejs");
};

module.exports.help = async (req, res) => {
  res.render("./pages/help.ejs");
};
module.exports.privacy = async (req, res) => {
  res.render("./pages/privacy.ejs");
};
module.exports.terms = async (req, res) => {
  res.render("./pages/terms.ejs");
};