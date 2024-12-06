const User = require("../models/User");
const { Markup } = require("telegraf");

exports.createUser = async (ctx, schema) => {
  try {
    const user = await User.findOne({ chatId: schema.chatId.toString() });

    if (user) {
      user.firstName = schema.firstName;
      user.status = schema.status;
      user.lang = schema.lang;
      user.quality = schema.quality;
      await user.save();
      return;
    }

    await User.create(schema);
  } catch (err) {
    console.log(err);
    ctx.reply(
      `Sorry an error occured from server side please wait until developer fix this`,
      {
        reply_markup: Markup.removeKeyboard().reply_markup,
      }
    );
  }
};

exports.getStatus = async (ctx) => {
  try {
    const user = await User.findOne({ chatId: ctx.chat.id.toString() });
    return user.status;
  } catch (err) {
    console.log(err);
    ctx.reply(
      `Sorry an error occured from server side please wait until developer fix this`,
      {
        reply_markup: Markup.removeKeyboard().reply_markup,
      }
    );
  }
};

exports.setStatus = async (ctx, status) => {
  try {
    const user = await User.findOne({ chatId: ctx.chat.id.toString() });
    user.status = status;
    await user.save();
  } catch (err) {
    console.log(err);
    ctx.reply(
      `Sorry an error occured from server side please wait until developer fix this`,
      {
        reply_markup: Markup.removeKeyboard().reply_markup,
      }
    );
  }
};

exports.getLang = async (ctx) => {
  try {
    const user = await User.findOne({ chatId: ctx.chat.id.toString() });
    return user.lang;
  } catch (err) {
    console.log(err);
    ctx.reply(
      `Sorry an error occured from server side please wait until developer fix this`,
      {
        reply_markup: Markup.removeKeyboard().reply_markup,
      }
    );
  }
};

exports.setLang = async (ctx, lang) => {
  try {
    const user = await User.findOne({ chatId: ctx.chat.id.toString() });
    user.lang = lang;
    await user.save();
  } catch (err) {
    console.log(err);
    ctx.reply(
      `Sorry an error occured from server side please wait until developer fix this`,
      {
        reply_markup: Markup.removeKeyboard().reply_markup,
      }
    );
  }
};

exports.getQuality = async (ctx) => {
  try {
    const user = await User.findOne({ chatId: ctx.chat.id.toString() });
    return user.quality;
  } catch (err) {
    console.log(err);
    ctx.reply(
      `Sorry an error occured from server side please wait until developer fix this`,
      {
        reply_markup: Markup.removeKeyboard().reply_markup,
      }
    );
  }
};

exports.setQuality = async (ctx, quality) => {
  try {
    const user = await User.findOne({ chatId: ctx.chat.id.toString() });
    user.quality = quality;
    await user.save();
  } catch (err) {
    console.log(err);
    ctx.reply(
      `Sorry an error occured from server side please wait until developer fix this`,
      {
        reply_markup: Markup.removeKeyboard().reply_markup,
      }
    );
  }
};
