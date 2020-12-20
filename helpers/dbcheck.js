const mongoose = require("mongoose");
const model = require("./model");
const scraper = require("./scraper");
require("dotenv").config();

const checkDatabase = async (query) => {
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connecting to DB...");
  const scrapedItem = await scraper.getPrice(query);
  const fetchedPrice = await model.Item.find({ name: query }, (err, items) => {
    if (err) {
      console.log(err);
    } else if (items.length == 0) {
      return null;
    } else {
      model.Item.findOneAndUpdate(
        { name: query },
        { price: scrapedItem.price, date: Date.now() },
        { useFindAndModify: false },
        (err, doc) => {
          err ? console.log(err) : console.log("Updated database.");
        }
      );
    }
  });

  if (fetchedPrice.length == 0) {
    console.log("Item not found in DB. Using Wiki scrape.");
    if (scrapedItem != null) {
      let searchString = query.toString().replace(/ /g, "_");
      let link = `https://runescape.wiki/w/${searchString}`;
      new model.Item({
        link: link,
        name: query,
        alliases: [query],
        price: scrapedItem.price,
        date: Date.now(),
      }).save();
    }
    return scrapedItem;
  } else {
    console.log("Item found in DB.");
    return [fetchedPrice, scrapedItem];
  }
};

exports.checkDatabase = checkDatabase;
