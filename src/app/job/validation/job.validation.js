import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

export const jobSchema = Joi.object({
    jobNumber: Joi.string().trim().required(),
    clientName: Joi.string().required(),
    siteLocation: Joi.string().required(),
    status: Joi.string().valid('open', 'closed').default('open')
});

export const updateJobSchema = Joi.object({
    jobNumber: Joi.string().trim().optional(),
    clientName: Joi.string().optional(),
    siteLocation: Joi.string().optional(),
    status: Joi.string().valid('open', 'closed').optional()
}).min(1);
