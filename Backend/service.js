import express from "express";
import mongoose from "mongoose";
const app = express();
import cors from "cors";

app.use(cors());

mongoose.connect("mongodb://localhost:27017/Podcasts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const podcastSchema = new mongoose.Schema({
  id: Number,
  sr: Number,
  image: String,
  title: String,
  publisher: String,
});

const webbyAwards = new mongoose.Schema({
  id: Number,
  title: String,
  publisher: String,
  image: String,
});

const PodcastTreding = mongoose.model("trends", podcastSchema);

const Webbyawards = mongoose.model("webbyawards", webbyAwards);

app.get("/api/podcasts", async (req, res) => {
  try {
    const podcasts = await PodcastTreding.find();
    console.log(podcasts);
    res.json(podcasts);
  } catch (err) {
    console.error("Error fetching podcasts:", err);
    res.status(500).send("Error fetching podcasts");
  }
});

app.get("/api/podcasts/:id", async (req, res) => {
  try {
    const podcast = await PodcastTreding.findOne({ id: req.params.id });
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }
    res.json(podcast);
  } catch (err) {
    console.error("Error fetching podcast by ID:", err);
    res.status(500).send("Error fetching podcast");
  }
});

app.get("/api/webbyawards", async (req, res) => {
  try {
    const podcasts = await Webbyawards.find();
    console.log(podcasts);
    res.json(podcasts);
  } catch (err) {
    console.error("Error fetching podcasts:", err);
    res.status(500).send("Error fetching webbyAwards");
  }
});
app.listen(6063, () => {
  console.log("Server is running on port 6063");
});
