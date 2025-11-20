import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const labourItemSchema = Joi.object({
    workerName: Joi.string().trim().required(),
    role: Joi.string().trim().required(),
    hoursWorked: Joi.number().greater(0).precision(2).required()
});

export const docketSchema = Joi.object({
    supervisorName: Joi.string().required(),
    date: Joi.date().format('DD-MM-YYYY').required(),
    labourItems: Joi.array().items(labourItemSchema).min(1).required(),
    notes: Joi.string().allow('').optional()
});
