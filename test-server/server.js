const express = require('express');
const cors = require('cors');


const app = express();

const corsOptions = {
    origin: (origin, callback) => callback(null, true)
}

app.use(cors({corsOptions}));


const data = [
    {id: 1, name: 'React Best Book', author: 'Ali', publisher: "O'reilly", category: 'Frontend', date: '2020-10-10'},
    {id: 1, name: 'React++', author: 'Ali', publisher: "O'reilly", category: 'Frontend', date: '2020-09-10'},
    {id: 1, name: 'React In Action', author: 'Test', publisher: "O'reilly", category: 'Frontend', date: '2020-09-10'},
    {id: 1, name: 'Re-act', author: 'Ali', publisher: "O'reilly", category: 'Frontend', date: '2020-09-10'},
    {id: 1, name: 'Clean Code', author: 'Martin', publisher: "O'reilly", category: 'Code', date: '2020-09-10'},
];


//list all request

app.get('/books', (_, res) => {
    res.json(data);
});


app.delete('/books', (_, res) => {
    setTimeout(() => res.send('DELETE'), 100);
});

app.listen(8080, () => console.log('AutoCrud express test server started on port : 8080'));

