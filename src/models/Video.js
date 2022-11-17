import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, uppercase: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, minLength: 10 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

videoSchema.static('formatHashtags', function (hashtags) {
  return hashtags
    .split(',')
    .map((word) => (word.startsWith('#') ? word : `#${word}`));
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
