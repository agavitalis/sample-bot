import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');
import { promiseService } from './bot/machines/todo.machine';



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Welcome to Demo - Bot API' });
});

app.post('/updateStatus', async (req, res) => {

  const { eventType, status } = req.body;

  type Output = {
    state: any;
    transtion: any,
    body: any,
    context: any,
  }

  let output: Array<Output> = [];

  promiseService.send({ type: eventType, body: status });
  promiseService.onTransition((state, event) => {

    //save to redis the last state
    // const jsonState = JSON.stringify(state);
    // // Example: persisting to localStorage
    // try {
    //   localStorage.setItem('app-state', jsonState);
    // } catch (e) {
    //   // unable to save to localStorage
    // }

    let writablePerson: Output = {
      state: state,
      transtion: state.value,
      body: event.body,
      context: state.context
    };
    output.push(writablePerson);
    //console.log(`transition: ${state.value} - Event: '${event.body}'`);
    // console.log(state.context);
  });

  return res.json({ ...output[0] });

});

app.listen(PORT, async () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
  promiseService.start();
});
