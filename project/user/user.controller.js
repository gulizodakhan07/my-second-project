import { error } from "winston"
import bcrypt from bcrypt

import ApiFeature from "../utils/api-feature.utils.js"
import { User } from "./user.models.js"
import { BadRequestException } from "../exception/badRequest.exception.js"

class UserController {
    #_model
    constructor(){
        this.#_model = User
    }
    getAllUsers = async(req,res,next)=>{
        try{
            const query = {...req.query}
            const result = await new ApiFeature(
                this.#_model.find(),
                query
            )
                .filter()
                .sort("first_name")
                .limitFields()
                .getQuery()
                .countDocuments()
            const filteredUsersResult = await ApiFeature(
                this.#_model.find(),
                query
            )
                .filter()
                .sort("first_name")
                .limitFields()
                .paginate()
                .populate("Products")
            res.send({
                message: "success",
                page: req.query?.page || 0,
                limit: req.query?.limit || 10,
                results: result,
                data: filteredUsersResult,
            });
            

        }catch(err){
            next(err)

        }


    }
    signUp = async(req,res,next)=>{
        try{
            const check_data = adminValidator.validate(req.body, { abortEarly: false });
            if(check_data){
                res.status(406).send({
                    message: check_data.error.details
                })
            }
            const {first_name,last_name,email,phone_number,username,password,role } = check_data.value;
            const check_email = await this.#_model.findOne({email})
            if(check_email){
                return res.status(409).send({
                    message: "Email already exist!",
                    error: check_email.errors
                })
            }
            const check_username = await this.#_model.findOne({username})
            if(check_username){
                return res.status(409).send({
                    message: "Username already exist!",
                    error: check_username.errors
                })
            }
            const hashed_password = await bcrypt.hash(password,12)
            const new_user = await this.#_model.create({
                first_name,
                last_name,
                phone_number,
                username,
                password: hashed_password,
                role
            })
            res.status(201).send({
                statusCode: 201,
                message: "User created successfully"
            })

        }catch(err){
            next(err)

        }

    }
    signIn = async(req,res,next)=>{
        try{
            const {first_name,last_name,phone_number,username,password} = req.body
            let newHashedPAssword = NaN
            if(password){
                newHashedPAssword = await bcrypt.hash(req.body.password,12)
            }
            const {userId} = req.params
            this.#_checkObjectId(userId)



        }catch(err){
            next(err)

        }

    }
    updateUser = async(req,res)=>{
        try{

        }catch(err){
            next(err)

        }

    }
    deleteUser = async(req,res)=>{
        try{

        }catch(err){
            next(err)

        }

    }
    #_checkObjectId = (id) => {
        if (!isValidObjectId(id)) {
          throw new BadRequestException(`Given ${id} is not a valid ObjectID`);
        }
      };
}
export default new UserController()