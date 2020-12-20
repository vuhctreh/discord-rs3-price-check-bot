const axios = require("axios");
const cheerio = require("cheerio");

const getPrice = async (query) => {
  searchString = query.toString().replace(/ /g, "_");

  console.log(`A request has been submitted for the item: ${query}`);

  try {
    let price;

    const { data } = await axios.get(
      `https://runescape.wiki/w/${searchString}`
    );
    const $ = cheerio.load(data);

    $(".infobox-quantity-replace").each((_idx, el) => {
      price = parseInt($(el).text().replaceAll(",", ""));
    });

    const description = $('td[data-attr-param="examine"]').html();
    const displayName = $('th[data-attr-param="name"]').html();

    const img = $(".image").html().split("=")[2].split('"')[1];

    if (price === undefined) {
      return null;
    }

    console.log(`Price of ${query} is: ${price}`);
    const item = {
      displayName: displayName,
      price: price,
      image: "https://runescape.wiki/" + img,
      url: `https://runescape.wiki/w/${searchString}`,
      examine: description,
    };
    return item;
  } catch (e) {
    console.log("There was an error in the scraper.");
    return null;
  }
};

exports.getPrice = getPrice;
