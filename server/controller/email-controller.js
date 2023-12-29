import Email from "../model/email.js";
import user from "../model/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const saveSendEmails = async (request, response) => {
    try {
        const email = await new Email(request.body);
        email.save();

        response.status(200).json('email saved successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}
export const registerController = async(req,res)=> {
    try{
        const existingUser = await user.findOne({email: req.body.email});
        if(existingUser)
        {
            return res.status(200).send({success: false, message: 'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = await user.create(req.body);

        await newUser.save();

        res.status(201).send({success: true, message: 'User created successfully'});


        



    }
    catch(error)
    {
        console.log(`Error: ${error.message}`.red.underline.bold);
        res.status(500).send({success: false, message: `Internal Server Error:${error.message}`});

    }
}
export const loginController = async(req,res)=> {
    try{

        const user = await user.findOne({email: req.body.email});
        if(!user)
        {
            return res.status(200).send({success: false, message: 'User does not exist'});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch)
        {
            return res.status(200).send({success: false, message: 'Incorrect password'});
        }
        const token = jwt.sign({id: user._id}, jwtt, {expiresIn: '1d'});
        res.status(200).send({success: true, message: 'User logged in successfully', token});
        // else{
            
        //     res.status(200).send({success: true, message: 'User logged in successfully', token: token});
        // }


    }
    catch(error)
    {
        console.log(`Error: ${error.message}`.red.underline.bold);
        res.status(500).send({success: false, message: `Internal Server Error:${error.message}`});

    }


}

export const authController = async(req,res)=> {
    
    try{
        
        const user = user.findById({_id: req.body.userId});
      
     
        try {
            if(!user){
                return res.status(200).send({success: false, message: 'User does not exist'});
            }
            
            const users = await user.findOne({_id: req.body.userId});
            res.status(200).send({ success: true, data: users });
            
           
            
           
          } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, message: `Internal Server Error:${error.message}`, error });
        
                 
       }

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({success: false,error});

    }
}

export const getEmails = async (request, response) => {
    try {
        let emails;

        if (request.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false });
        } else if (request.params.type === 'bin') {
            emails = await Email.find({ bin: true })
        } else if (request.params.type === 'allmail') {
            emails = await Email.find({});
        } else if (request.params.type === 'inbox') {
            emails = [];
        } else {
            emails = await Email.find({ type: request.params.type });
        }

        response.status(200).json(emails);
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const toggleStarredEmail = async (request, response) => {
    try {   
        await Email.updateOne({ _id: request.body.id }, { $set: { starred: request.body.value }})
        response.status(201).json('Value is updated');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const deleteEmails = async (request, response) => {
    try {
        await Email.deleteMany({ _id: { $in: request.body }})
        response.status(200).json('emails deleted successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const moveEmailsToBin = async (request, response) => {
    try {
        await Email.updateMany({ _id: { $in: request.body }}, { $set: { bin: true, starred: false, type: '' }});
    } catch (error) {
        response.status(500).json(error.message);   
    }
}