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

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if(!video) {
    return res.render('404', { pageTitle: 'Video not found.' });
  }
  return res.render('watch', { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found.' });
  }
  return res.render('edit', { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags} = req.body;
  const video = await Video.exist({ _id: id });
  if(!video) { 
    return res.render('404', { pageTitle: 'Video not found.' });
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
  return res.render('upload', { pageTitle: 'Upload Video'});
};

export const postUpload = async(req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect('/');
  } catch(err) {
    console.log(err);
    return res.render('upload', {
      pageTitle: 'Upload Video', 
      errorMsg: err._message ,
    });
  }
};