import User from '../models/User';
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const exists = await User.exists({ $or: [{ username }, { email }] });
  const pageTitle = 'join';
  if (password !== password2) {
    res.status(400).render(pageTitle, {
      pageTitle,
      errorMessage: 'Password confirmation does not match.',
    });
  }
  if (exists) {
    res.status(400).render(pageTitle, {
      pageTitle,
      errorMessage: 'This username/email is(are) already taken.',
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect('/login');
  } catch (error) {
    return res.status(400).render(pageTitle, {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  res.render('login', { pageTitle: 'Login' });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = 'login';
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render(pageTitle, {
      pageTitle,
      errorMessage: 'An account with this username does not exists.',
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render(pageTitle, {
      pageTitle,
      errorMessage: 'Wrong password.',
    });
  }
  console.log('login!');
  return res.redirect('/');
};

export const logout = (req, res) => res.send('log-out');
export const edit = (req, res) => res.send('edit');
export const remove = (req, res) => res.send('remove');
export const see = (req, res) => res.send('see');
