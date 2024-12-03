import express from 'express';

const app = express();
const port = 3003;

app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
