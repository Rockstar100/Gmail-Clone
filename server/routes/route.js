import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {loginController,registerController,authController, saveSendEmails, getEmails, toggleStarredEmail, deleteEmails, 
    moveEmailsToBin } from '../controller/email-controller.js';

const routes = express.Router();
routes.post('/login', loginController);
routes.post('/register', registerController);
routes.post('/getUserData',authMiddleware, authController)

routes.post('/save', saveSendEmails);
routes.post('/save-draft', saveSendEmails);
routes.get('/emails/:type', getEmails);
routes.post('/starred', toggleStarredEmail);
routes.delete('/delete', deleteEmails);
routes.post('/bin', moveEmailsToBin);

export default routes;