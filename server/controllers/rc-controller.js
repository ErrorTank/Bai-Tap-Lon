const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../authorization/auth");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../authorization/keys/keys");
const upload = require("../config/storage/img-storage");

const authMiddleware = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});

module.exports = (db, dbManager) => {
    let rcManager = dbManager("rc");
    const candidateManager = dbManager("candidate");
    const accManager = dbManager("account");
    router.get("/rcs/brief-no-con", authMiddleware, (req, res, next) => {
        rcManager.getRcsBrief().then(data => {
            res.status(200).json(data);
        }).catch(err => next(err))
    });
    router.post("/rc/check", authMiddleware, (req, res, next) => {
        rcManager.checkRcExisted(req.body.rcID, req.body.sID).then(() => {
            res.status(200).end();
        }).catch(err => next(err))
    });
    router.get("/rc/brief", authMiddleware, (req,res, next) =>{

        rcManager.getRcBriefWithCondition({...req.query}).then((data) => {
            res.status(200).json(data);
        }).catch(err => next(err));

    });
    router.get("/rc/:rcID", authMiddleware, (req, res, next) => {

        rcManager.getRc(req.params.rcID).then((data) => {
            res.status(200).json(data);
        }).catch(err => next(err));

    });
    router.delete("/rc/:rcID", authMiddleware, (req, res, next) => {

        rcManager.deleteRc(req.params.rcID).then(() => {
            res.status(200).end();
        }).catch(err => next(err));

    });
    router.put("/rc/:rcID",  authMiddleware, (req,res, next) => {

        rcManager.updateRc(req.params.rcID, req.body.rc).then(() => {
            res.status(200).end();
        }).catch(err => next(err));
    });
    router.post("/rc/create",  authMiddleware,  (req,res, next) => {
        let {CMT, email, username} = req.body.rc;
        rcManager.createRc(req.body.rc).then((rcID) => {
            res.status(200).json({rcID});
        }).catch(err => next(err));
        // candidateManager.checkCandidateExisted({CMT, email}).then(() => {
        //     accManager.checkAccountExisted({username}).then(() => {
        //
        //     }).catch(err => next(err));
        //
        // }).catch(err => next(err));

    });


    return router;
};
