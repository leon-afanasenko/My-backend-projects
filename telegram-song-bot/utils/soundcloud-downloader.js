//* IMPORT'S
const { EventEmitter } = require("events");
const fs = require("fs");
const path = require("path");

const scdl = require("soundcloud-downloader").default;
const ffmpeg = require("fluent-ffmpeg");

//* VARS
const ffmpegPath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "libs",
  "ffmpeg",
  "bin",
  "ffmpeg.exe"
);

class SoundCloudDownloader extends EventEmitter {
  //? INIT CONSTRUCTOR
  constructor(link, bitrate) {
    super();

    this.link = link;
    this.bitrate = bitrate;

    ffmpeg.setFfmpegPath(ffmpegPath);
  }

  startDownload = async () => {
    try {
      const { permalink_url, publisher_metadata } = await scdl.getInfo(
        this.link
      );
      const { artist, publisher, release_title } = publisher_metadata;
      const filepath = path.join(
        __dirname,
        "..",
        "uploads",
        "soundcloud",
        `${artist} - ${release_title}.mp3`
      );

      const stream = await scdl.download(this.link, true);

      let outputOptions = [
        "-id3v2_version",
        "4",
        "-metadata",
        `title=${release_title}`,
        "-metadata",
        `artist=${artist}`,
      ];

      //? A RESPONSE RECIVED
      this.emit("download-started");

      new ffmpeg({
        source: stream,
      })
        .audioBitrate(this.bitrate)
        .withAudioCodec("libmp3lame")
        .toFormat("mp3")
        .outputOptions(...outputOptions)
        .on("error", (err) => this.emit("error", { message: err }))
        .on("end", () => {
          this.emit("finished", {
            path: `./uploads/soundcloud/${artist} - ${release_title}.mp3`,
          });
        })
        .saveToFile(filepath);
    } catch (err) {}
  };
}

module.exports = SoundCloudDownloader;
