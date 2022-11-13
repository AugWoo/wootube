import User from '../models/User';
import Video from '../models/Video';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ createdAt: 'desc' })
      .populate('owner');
    return res.render('home', { pageTitle: 'Home', videos });
  } catch {
    return res.render('server-error');
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate('owner');
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found.' });
  }
  return res.render('watch', { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  return res.render('edit', { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exist({ _id: id });
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  await video.save();
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: 'Upload Video' });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    file: { path: fileUrl },
    body: { title, description, hashtags },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect('/');
  } catch (err) {
    console.log(err);
    return res.status(400).render('upload', {
      pageTitle: 'Upload Video',
      errorMsg: err._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = Video.findById(id);
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect('/');
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, 'i'),
      },
    }).populate('owner');
  }
  return res.render('search', { pageTitle: 'Search Video', videos });
};
