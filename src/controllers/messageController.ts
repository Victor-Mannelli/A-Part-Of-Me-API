// import { Request, Response } from 'express';
// import { getMessages, postMessage } from '../services';

// export async function getMessagesController(_req: Request, res: Response) {
//   try {
//     const user = res.locals;
//     const messages = await getMessages(user);
//     return res.status(200).send(messages);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: 'Erro Interno do Servidor' });
//   }
// }

// export async function postMessageController(req: Request, res: Response)  {
//   try {
//     const message = req.body;
//     const user = res.locals;
//     const newMessage = await postMessage(user, message.text);
//     res.status(201).send({ message: 'Mensagem gravada com sucesso', newMessage });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({ message: 'Erro interno do servidor' });
//   }
// }
