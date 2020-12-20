const discord = require("discord.js");

const genEmbed = (newItem, oldItem) => {
  let emote;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let embed;
  if (oldItem == null) {
    embed = new discord.MessageEmbed()
      .setColor("#0074EE")
      .setAuthor(
        "Price Check Bot",
        "https://news.bitcoin.com/wp-content/uploads/2017/09/product_oldschoolgold-500x500-300x300.png"
      )
      .setTitle(newItem.displayName + "  :new:")
      .setURL(newItem.url)
      .setThumbnail(newItem.image)
      .setDescription(newItem.examine)
      .addFields({
        name: "Current Price:",
        value: numberWithCommas(newItem.price),
        inline: true,
      })
      .setTimestamp()
      .setFooter("By Broomstick and Shyrogan");
  } else {
    newItem.price > oldItem.price
      ? (emote = ":chart_with_upwards_trend:")
      : newItem.price < oldItem.price
      ? (emote = ":chart_with_downwards_trend:")
      : (emote = ":zzz:");

    embed = new discord.MessageEmbed()
      .setColor("51FF00")
      .setAuthor(
        "Price Check Bot",
        "https://news.bitcoin.com/wp-content/uploads/2017/09/product_oldschoolgold-500x500-300x300.png"
      )
      .setTitle(newItem.displayName + " " + emote)
      .setURL(newItem.url)
      .setThumbnail(newItem.image)
      .setDescription(newItem.examine)
      .addFields(
        {
          name: "Current Price:",
          value: numberWithCommas(newItem.price) + "gp",
          inline: true,
        },
        {
          name: "Previous Price:",
          value: numberWithCommas(oldItem.price) + "gp",
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter("By Broomstick and Shyrogan");
  }
  return embed;
};

exports.genEmbed = genEmbed;
