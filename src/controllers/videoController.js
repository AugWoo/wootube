import Video from '../models/Video';

// Video.find({}, (error, videos) => {});

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render('home', { pageTitle: 'Home', videos });  
  } catch {
    return res.render('server-error');
  }
};

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render('watch', { pageTitle: 'Watching' });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render('edit', { pageTitle: 'Editing' });
};

export const postEdit = (req, res) => {
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: 'Upload Video'});
};

export const postUpload = async(req, res) => {
  const { title, description, hashtags } = req.body;
  const video = new Video({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(',').map(word => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  const dbVideo = await video.save();
  return res.redirect('/');
};