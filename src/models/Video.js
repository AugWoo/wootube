import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, uppercase: true, maxLength: 80 },
  description: { type: String,  required: true, minLength: 10 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
