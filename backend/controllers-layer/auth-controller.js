const express = require("express");
const logic = require("../business-logic-layer/auth-logic");
const CredentialsModel = require("../models/credentials-model");
const UserModel = require("../models/user-model");
const router = express.Router();

router.post("/login", async (request, response) => {
    try {
        const credentials = request.body;

        const credentialsWithModel = new CredentialsModel(request.body);//for validation

        const errors = credentialsWithModel.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const user = await logic.loginAsync(credentials);

        if (!user) {
            return response.status(401).send("incorrect email or password");
        }
        response.json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/register", async (request, response) => {
    try {
        const user = new UserModel(request.body);

        const users = await logic.getAllUsersAsync();//so i could check if email or id exists already

        let errors = user.validateSync();
        if (user.password.length > 25) {
            if (errors) {
                errors.message += ", password: password can't exceed 25 characters";
            }
            else {
                errors = {};
                errors.message = "password: password can't exceed 25 characters";
            }
        }
        for (let u of users) {//check if email or id already exists
            if (u.email === user.email) {
                if (errors) {
                    errors.message += ", email already in use";
                }
                else {
                    errors = {};
                    errors.message = "email already in use";
                }
            }
            if (u.id === user.id) {
                if (errors) {
                    errors.message += ", id already in use";
                }
                else {
                    errors = {};
                    errors.message = "id already in use";
                }
            }
        }
        if (errors) return response.status(400).send(errors.message);

        const addedUser = await logic.registerAsync(user);
        response.status(201).json(addedUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/id", async (request, response) => {//i also checked in fronted if id already exists
    try {
        const ids = await logic.getAllIdAsync();
        response.json(ids);
    }
    catch (err) {
        response.status(500).send(err.message);
    }

});

module.exports = router;