import { Request, Response } from 'express'

import { iOngs } from '../Interfaces/iOngs';
import Constants from '../utils/Constants';
import { } from "../validators/ongValidation";
import * as beTheHeroService from '../services/beTheHeroService';
import { validateOng } from '../validators/ongValidation';

export const createOng = async (req: Request, res: Response): Promise<Object | undefined> => {
    try {
        const body: iOngs = {
            name: req.body.name,
            email: req.body.email,
            whatsApp: req.body.whatsapp,
            city: req.body.city,
            uf: req.body.uf
        }

        const validatedOng = await validateOng(body);

        const response: any = await beTheHeroService.insertOngs(validatedOng);

        return res.status(Constants.HTTP.STATUS.OK).json({ id: response.id });
    } catch (err) {
        if (Array.isArray(err && err.details)) {
            let message: any = [];
            err.details.forEach((error: any) => {
                message.push(error.message)
            });
            return res.status(Constants.HTTP.STATUS.BAD_REQUEST).json({ message });
        }
        return res.status(Constants.HTTP.STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
}

export const getAllOngs = async (req: Request, res: Response): Promise<Object | undefined> => {
    try {
        const ongsData = await beTheHeroService.getOngs();
        return res.status(Constants.HTTP.STATUS.OK).json(ongsData);
    } catch (err) {
        return res.status(Constants.HTTP.STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
}

export const loginAuthorization = async (req: Request, res: Response): Promise<Object> => {
    try {
        const ongId = req.body.id;

        const authorize = await beTheHeroService.loginAuhorization(ongId);

        if (authorize && authorize.message) {
            return res.status(Constants.HTTP.STATUS.BAD_REQUEST).json({ message: authorize.message });
        }

        return res.status(Constants.HTTP.STATUS.OK).json(authorize);
    } catch (err) {
        throw err
    }
}