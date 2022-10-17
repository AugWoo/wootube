export const trending = (req, res) => {
  res.render('home', { pageTitle: 'Home' });  
}

export const see = (req, res) => {
  return res.render('watch', { pageTitle: 'Watch' });
};

export const edit = (req, res) => {
  return res.render('edit', { pageTitle: 'Edit' });
};

export const search = (req, res) => res.send('search');
export const upload = (req, res) => res.send('upload');
export const remove = (req, res) => res.send('remove');