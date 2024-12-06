//* IMPORT'S
const EventEmitter = require("events").EventEmitter;
const path = require("path");

const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const sanitize = require("sanitize-filename");
const progress = require("progress-stream");

//* VARS
const youtubeBaseUrl = "https://www.youtube.com/watch?v=";
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
const outputPath = path.join(__dirname, "..", "uploads", "youtube");
const requestOptions = { maxRedirects: 5 };
// allowWebm : false
// outputOptions : []
// progressTimeout : 1000
// queueParallelism : 2

//* CLASS
class youtubeDownloader extends EventEmitter {
  //? INIT CONSTRUCTOR
  constructor(options = { link: "", quality: "highestaudio", bitrate: 128 }) {
    super();

    //? VALID LINK
    if (!options.link.startsWith(youtubeBaseUrl))
      return this.emit("error", { message: "BAD_LINK" });
    this.link = options.link;
    this.quality = options.quality;
    this.bitrate = options.bitrate;

    ffmpeg.setFfmpegPath(ffmpegPath);
  }

  startDownload = async () => {
    try {
      const info = await ytdl.getInfo(this.link, { quality: this.quality });
      const embedVidTitle = sanitize(info.videoDetails.title);
      let title = "unknown";
      let artist = "unknown";

      //? Specify Title and Artist
      if (embedVidTitle.indexOf("-") > -1) {
        let temp = embedVidTitle.split("-");
        if (temp.length >= 2) {
          artist = temp[0].trim();
          title = temp[1].trim();
        }
      } else {
        title = embedVidTitle;
      }

      const filename = `${outputPath}/${embedVidTitle || info.vid}.mp3`;

      //? Stream Setup
      const streamOpt = {
        quality: this.quality,
        requestOptions,
        filter: (format) => format.container === "mp4",
      };
      //? Start Download
      const stream = ytdl.downloadFromInfo(info, streamOpt);

      //? Error Handling
      stream.on("error", (err) => this.emit("error", { message: err }));

      stream.on("response", (res) => {
        //? PROGRESS HANDLER
        const str = progress({
          length: parseInt(res.headers["content-length"]),
          time: 2000,
        });

        str.on("progress", (progress) => {
          this.emit("progress", { progress: progress.percentage });
        });

        //? SAVE AS MP3 VIA FFMPEG
        let outputOptions = [
          "-id3v2_version",
          "4",
          "-metadata",
          `title=${title}`,
          "-metadata",
          `artist=${artist}`,
        ];

        const audioBitrate = info.formats.find(
          (format) => !!format.audioBitrate
        ).audioBitrate;

        new ffmpeg({
          source: stream.pipe(str),
        })
          .audioBitrate(audioBitrate || this.bitrate)
          .withAudioCodec("libmp3lame")
          .toFormat("mp3")
          .outputOptions(...outputOptions)
          .on("error", (err) => this.emit("error", { message: err }))
          .on("end", () => {
            this.emit("finished", {
              path: `./uploads/youtube/${filename.substring(
                filename.lastIndexOf("/") + 1
              )}`,
            });
          })
          .saveToFile(filename);
      });
    } catch (err) {
      this.emit("error", { message: err });
    }
  };
}

module.exports = youtubeDownloader;
