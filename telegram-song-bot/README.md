# 🎵 Music Downloader Bot

A Telegram bot for downloading music from **YouTube**, **SoundCloud**, and performing **Spotify searches**.  
It supports customizable audio quality, language settings, and features a database to manage user preferences.

**🚦 Status: Offline**  
This bot is currently not running. Feel free to explore the code and set it up for your own use.

---

## 🌟 Features

- **🎥 YouTube Downloader**: Convert YouTube videos to MP3 format with metadata (artist and title).
- **🎧 SoundCloud Downloader**: Download tracks directly from SoundCloud.
- **🟢 Spotify Integration**: Search for tracks on Spotify (API-based, limited to search functionality).
- **⚙️ Custom Audio Quality**: Choose between 128kbps and 320kbps audio quality.
- **🌍 Multi-language Support**: Currently supports English and Russian.
- **📋 User Management**: Tracks user settings and preferences using a MongoDB database.

---

## 📋 Requirements

- **Node.js** (v14 or later)
- **npm** (Node Package Manager)
- **MongoDB** (Local or remote instance)
- **Telegraf** (Telegram bot framework)

---

## 🛠 Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure environment variables**:  
   Create a `.env` file in the root directory with the following content:

   ```env
   SPOTIFY_TOKEN=YOUR_SPOTIFY_TOKEN
   BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
   DB_URL=mongodb://localhost:27017/music_downloader
   ```

3. **Start the MongoDB database**:

   ```bash
   mongod
   ```

4. **Launch the bot**:
   ```bash
   node index.js
   ```

---

## 🚀 Usage

1. Add your bot to Telegram using the token from **@BotFather**.
2. Start the bot in a Telegram chat.
3. Use the on-screen keyboard to:
   - Search for music on Spotify.
   - Download tracks from YouTube or SoundCloud.
   - Change audio quality.
   - Switch between English and Russian.

---

## 🛠 Technologies Used

- **Telegraf**: Framework for creating Telegram bots.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Axios**: HTTP requests for Spotify API integration.
- **ytdl-core**: YouTube video/audio streaming.
- **SoundCloud-downloader**: For fetching SoundCloud tracks.
- **ffmpeg**: Audio processing and format conversion.

---

## 📜 License

MIT License

Copyright (c) 2024 Leon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to allow others to do so, under the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or significant portions of the Software.

This project draws inspiration from the original idea by XV Yashar.

The Software is provided "as is," without any warranty of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. In no event shall the authors or copyright holders be held liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the Software or its use.
