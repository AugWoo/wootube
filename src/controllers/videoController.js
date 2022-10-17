export const trending = (req, res) => {
  const videos = [
    {
      title: 'one',
      rating: 5,
      comments: 2,
      createdAt: '2m ago',
      views: 40,
      id: 1,
    },
    {
      title: 'two',
      rating: 4,
      comments: 3,
      createdAt: '6m ago',
      views: 23,
      id: 2,
    },
    {
      title: 'three',
      rating: 5,
      comments: 5,
      createdAt: '1m ago',
      views: 10,
      id: 3,
    },
  ];
  res.render('home', { pageTitle: 'Home', videos });  
};

export const see = (req, res) => {
  return res.render('watch', { pageTitle: 'Watch' });
};

export const edit = (req, res) => {
  return res.render('edit', { pageTitle: 'Edit' });
};

export const search = (req, res) => res.send('search');
export const upload = (req, res) => res.send('upload');
export const remove = (req, res) => res.send('remove');