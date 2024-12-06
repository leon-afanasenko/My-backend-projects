const { Markup } = require("telegraf");
const { enDic } = require("./dialogs");

const langKeyoard = Markup.keyboard([[Markup.button.callback("En", "En")]]);

const mainKeyboard = (dic) => {
  return Markup.keyboard([
    [
      Markup.button.callback(dic.keyboardSearch, dic.keyboardSearch),
      Markup.button.callback(dic.keyboardSpotifyLink, dic.keyboardSpotifyLink),
    ],
    [
      Markup.button.callback(
        dic.keyboardSoundcloudLink,
        dic.keyboardSoundcloudLink
      ),
      Markup.button.callback(dic.keyboardYoutubeLink, dic.keyboardYoutubeLink),
    ],
    [Markup.button.callback(dic.keyboardSettings, dic.keyboardSettings)],
  ]);
};

const backBtnKeyboard = (dic) => {
  return Markup.inlineKeyboard([
    [Markup.button.callback(dic.inlineKeyBack, dic.inlineKeyBack)],
  ]);
};

const settingsKeyboard = (dic) => {
  return Markup.keyboard([
    [
      Markup.button.callback(dic.keyboardChangeLang, dic.keyboardChangeLang),
      Markup.button.callback(
        dic.keyboardChangeQuality,
        dic.keyboardChangeQuality
      ),
    ],
    [Markup.button.callback(dic.inlineKeyBack, dic.inlineKeyBack)],
  ]);
};

const qualitySelectKeyboard = (dic) => {
  return Markup.keyboard([
    [
      Markup.button.callback("⚪ 128", "⚪ 128"),
      Markup.button.callback("🟢 320", "🟢 320"),
    ],
    [Markup.button.callback(dic.inlineKeyBack, dic.inlineKeyBack)],
  ]);
};

exports.langKeyoard = langKeyoard;
exports.mainKeyboard = mainKeyboard;
exports.settingsKeyboard = settingsKeyboard;
exports.backBtnKeyboard = backBtnKeyboard;
exports.qualitySelectKeyboard = qualitySelectKeyboard;
