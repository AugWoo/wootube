import express from 'express';

const app = express();

const handleListening = () => {
  console.log('Server listening on 3000💎');
}

app.listen(3000, handleListening);