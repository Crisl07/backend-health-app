import bcrypt from 'bcrypt';

export const userData: any = [
  {
    id: 1,
    name: 'Cristian',
    avatar: 'https://ak7.picdn.net/shutterstock/videos/597967/thumb/1.jpg',
    email: 'cris@gmail.com',
    password: bcrypt.hashSync('something', 10),
    age: 23,
    genre: 'something',
    address: 'something',
  },
  {
    id: 2,
    name: 'David',
    avatar: 'https://ak7.picdn.net/shutterstock/videos/597967/thumb/1.jpg',
    email: 'david@gmail.com',
    password: bcrypt.hashSync('something', 10),
    age: 24,
    genre: 'something',
    address: 'something',
  },
];
