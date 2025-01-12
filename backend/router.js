import { Router } from "express";
import * as u from './requestHandler.js'
import Auth from './middleware/Auth.js'
const router=Router();

router.route("/signin").post(u.signIn);
router.route("/signup").post(u.signUp);
router.route("/verify").post(u.verifyMail);
router.route("/reset").post(u.resetPassword);
router.route("/profile").get(Auth,u.profile);
router.route("/getallcontacts").get(Auth,u.getAllContacts);
router.route("/sendmsg").post(Auth,u.sendMessage);
router.route("/messages/:id").get(Auth,u.getMessages);
router.route("/getmembers").get(Auth,u.getMembers);
export default router;