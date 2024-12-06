//* Import External Modules
const { Telegraf, Markup } = require("telegraf");
const axios = require("axios");

//* Import Internal Modules
const YoutubeDownloader = require("./utils/youtube-downloader");
const ScdlDownloader = require("./utils/soundcloud-downloader");

//* Import Node Modules
const fs = require("fs");

//* Init Configs
require("dotenv").config({ path: "config/config.env" });
const keyboards = require("./utils/markups");
const connectDB = require("./config/db");
//? Dic's: Dictionary of supported languages (EN)
const { enDic } = require("./utils/dialogs");

//* DB
connectDB();
const user = require("./utils/user");

const bot = new Telegraf(process.env.BOT_TOKEN);

//* START CODING HERE

//? AUTH USER
bot.start((ctx) => {
  ctx.reply(`Welcome ${ctx.chat.first_name}!\nPlease choose your language`, {
    reply_markup: keyboards.langKeyoard.reply_markup,
  });
  user.createUser(ctx, {
    chatId: ctx.chat.id,
    firstName: ctx.chat.first_name,
    status: "IN_LANG_MENU",
    lang: "EN",
    quality: 128,
  });
});

bot.hears("En", async (ctx) => {
  if ((await user.getStatus(ctx)) === "IN_LANG_MENU") {
    user.setLang(ctx, "EN");
    user.setStatus(ctx, "MAIN");
    ctx.reply(`Language set's to EN`, {
      reply_to_message_id: ctx.message.message_id,
    });

    ctx.reply(enDic.dialogInMainMenu, {
      reply_markup: keyboards.mainKeyboard(enDic).reply_markup,
    });
  }
});

//? EN
bot.hears(enDic.keyboardSearch, async (ctx) => {
  if ((await user.getStatus(ctx)) === "MAIN") {
    await user.setStatus(ctx, "IN_SEARCHING");
    ctx.reply(enDic.dialogEnterMusicNameToSearch, {
      reply_markup: Markup.removeKeyboard().reply_markup,
    });
  }
});

bot.hears(enDic.keyboardSpotifyLink, async (ctx) => {
  if ((await user.getStatus(ctx)) === "MAIN") {
    ctx.reply(enDic.dialogForbinned);
  }
});

bot.hears(enDic.keyboardSoundcloudLink, async (ctx) => {
  if ((await user.getStatus(ctx)) === "MAIN") {
    await user.setStatus(ctx, "IN_SOUNDCLOUD_LINK");
    await ctx.reply("- - - - - - - - - - - - - - - - -", {
      reply_markup: Markup.removeKeyboard().reply_markup,
    });
    ctx.reply(enDic.dialogEnterSCDLLink, {
      reply_markup: keyboards.backBtnKeyboard(enDic).reply_markup,
    });
  }
});

bot.hears(enDic.keyboardYoutubeLink, async (ctx) => {
  if ((await user.getStatus(ctx)) === "MAIN") {
    await user.setStatus(ctx, "IN_YOUTUBE_LINK");
    await ctx.reply("- - - - - - - - - - - - - - - - -", {
      reply_markup: Markup.removeKeyboard().reply_markup,
    });
    ctx.reply(enDic.dialogEnterYTLink, {
      reply_markup: keyboards.backBtnKeyboard(enDic).reply_markup,
    });
  }
});

bot.hears(enDic.keyboardSettings, async (ctx) => {
  if ((await user.getStatus(ctx)) === "MAIN") {
    ctx.reply(enDic.dialogInSetting, {
      reply_markup: keyboards.settingsKeyboard(enDic).reply_markup,
    });
  }
});

//? EN Setting's
bot.hears(enDic.keyboardChangeLang, async (ctx) => {
  if ((await user.getStatus(ctx)) === "MAIN") {
    await user.setStatus(ctx, "IN_LANG_MENU");
    await ctx.reply("- - - - - - - - - - - - - - - - -", {
      reply_markup: Markup.removeKeyboard().reply_markup,
    });
    ctx.reply(
      `${enDic.keyboardChangeLang}\n${enDic.dialogCurrent} ${enDic.lang}`,
      {
        reply_markup: keyboards.langKeyoard.reply_markup,
      }
    );
  }
});

bot.hears(enDic.keyboardChangeQuality, async (ctx) => {
  if ((await user.getStatus(ctx)) === "MAIN") {
    await user.setStatus(ctx, "IN_QUALITY_SETTING");
    await ctx.reply("- - - - - - - - - - - - - - - - -", {
      reply_markup: Markup.removeKeyboard().reply_markup,
    });
    const current = await user.getQuality(ctx);
    ctx.reply(
      `${enDic.keyboardChangeQuality}\n${enDic.dialogCurrent} ${current}`,
      {
        reply_markup: keyboards.qualitySelectKeyboard(enDic).reply_markup,
      }
    );
  }
});

//? EN OPT
bot.hears(enDic.inlineKeyBack, async (ctx) => {
  await user.setStatus(ctx, "MAIN");
  ctx.reply(enDic.dialogInMainMenu, {
    reply_markup: keyboards.mainKeyboard(enDic).reply_markup,
  });
});

bot.action(enDic.inlineKeyBack, async (ctx) => {
  if ((await user.getStatus(ctx)) !== "MAIN") {
    await user.setStatus(ctx, "MAIN");
    ctx.reply(enDic.dialogInMainMenu, {
      reply_markup: keyboards.mainKeyboard(enDic).reply_markup,
    });
  }
});

//? EVENT'S
bot.on("message", async (ctx) => {
  const status = await user.getStatus(ctx);
  const dic = enDic;
  const bitrate = await user.getQuality(ctx);

  //! NOT COMPLETED (SEARCHING)
  if (status === "IN_SEARCHING") {
    try {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${ctx.message.text}&type=track&include_external=audio`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
          },
        }
      );

      await user.setStatus(ctx, "MAIN");
      ctx.reply(`Answer from Spotify:\n${res}`);
    } catch (err) {
      if (err.code === "ERR_BAD_REQUEST") {
        await user.setStatus(ctx, "MAIN");
        return ctx.reply(dic.dialogForbinned, {
          reply_markup: keyboards.mainKeyboard(dic).reply_markup,
        });
      }
      await user.setStatus(ctx, "MAIN");
      console.log(err);
    }
  } else if (status === "IN_YOUTUBE_LINK") {
    await ctx.reply(dic.dialogDownloadStarting, {
      reply_markup: Markup.removeKeyboard().reply_markup,
    });

    //? Convert to a valid link -> Init Downloader -> Download
    const link = `https://www.youtube.com/watch?v=${ctx.message.text.substring(
      ctx.message.text.lastIndexOf("/") + 1
    )}`;
    const downloader = new YoutubeDownloader({
      link: link,
      quality: "highestaudio",
      bitrate,
    });

    downloader.on("error", (err) => {
      if (err.message === "BAD_LINK") {
        ctx.reply(dic.dialogBadLink, {
          reply_to_message_id: ctx.message.message_id,
          reply_markup: keyboards.mainKeyboard(dic).reply_markup,
        });
      } else {
        user.setStatus(ctx, "MAIN");
        ctx.reply(dic.dialogDownloadFailed, {
          reply_to_message_id: ctx.message.message_id,
          reply_markup: keyboards.mainKeyboard(dic).reply_markup,
        });
        console.log(err);
      }
    });

    downloader.on("progress", (progress) => {
      ctx.reply(`${dic.dialogDownloading} (${parseInt(progress.progress)}%)`);
      if (progress.progress === 100) ctx.reply(dic.dialogUploading);
    });

    downloader.on("finished", async (data) => {
      //? Upload -> Remove File
      await ctx.replyWithAudio(
        { source: data.path },
        {
          caption: `Downloaded by @Lower_Case_bot`,
          reply_markup: keyboards.mainKeyboard(dic).reply_markup,
        }
      );

      fs.unlink(data.path, (err) => {
        if (err) throw err;
        user.setStatus(ctx, "MAIN");
      });
    });

    downloader.startDownload();
  } else if (status === "IN_SOUNDCLOUD_LINK") {
    //? Init Downloader -> Download
    const downloader = new ScdlDownloader(ctx.message.text, bitrate);

    downloader.on("error", (err) => {
      user.setStatus(ctx, "MAIN");
      ctx.reply(dic.dialogDownloadFailed, {
        reply_to_message_id: ctx.message.message_id,
        reply_markup: keyboards.mainKeyboard(dic).reply_markup,
      });
      console.log(err);
    });

    downloader.on("download-started", () => {
      ctx.reply(dic.dialogDownloading);
    });

    downloader.on("finished", async (data) => {
      ctx.reply(dic.dialogUploading);

      //? Upload -> Remove File
      await ctx.replyWithAudio(
        { source: data.path },
        {
          caption: `Downloaded by @Lower_Case_bot`,
          reply_markup: keyboards.mainKeyboard(dic).reply_markup,
        }
      );
      fs.unlink(data.path, (err) => {
        if (err) throw err;
        user.setStatus(ctx, "MAIN");
      });
    });

    ctx.reply(dic.dialogWaitingForSCDL);

    downloader.startDownload();
  } else if (status === "IN_QUALITY_SETTING") {
    //? Select preferred bitrate and save in DB
    switch (ctx.message.text) {
      case "⚪ 128":
        await user.setQuality(ctx, 128);
        await user.setStatus(ctx, "MAIN");
        await ctx.reply(`${dic.dialogQualityChanged} 128`);
        ctx.reply(dic.dialogInMainMenu, {
          reply_markup: keyboards.mainKeyboard(dic).reply_markup,
        });
        break;

      case "🟢 320":
        await user.setQuality(ctx, 320);
        await user.setStatus(ctx, "MAIN");
        await ctx.reply(`${dic.dialogQualityChanged} 320`);
        ctx.reply(dic.dialogInMainMenu, {
          reply_markup: keyboards.mainKeyboard(dic).reply_markup,
        });
        break;

      default:
        break;
    }
  }
});

bot.launch();
