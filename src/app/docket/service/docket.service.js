import docketModel from '../model/docket.model.js';
import jobModel from '../../job/model/job.model.js';
import AppError from '../../../utils/AppError.js';
import moment from 'moment';


const parseAndValidateDate = (dateString) => {
    const date = moment(dateString, 'DD-MM-YYYY', true);
    if (!date.isValid()) throw new AppError(`Invalid date format for "${dateString}". Must be DD-MM-YYYY.`, 400);
    return date.toDate();
};


export const createDocketService = async (jobId, docketData) => {
    const job = await jobModel.findById(jobId);

    if (!job) throw new AppError('Cannot create docket: Job not found.', 404);
    if (job.status === 'closed') throw new AppError('Cannot create docket: Job is closed.', 409);

    const parsedDate = parseAndValidateDate(docketData.date);
    const docket = await docketModel.create({ ...docketData, jobId, date: parsedDate });
    return docket;
};


export const getSummaryService = async () => {
    const summary = await docketModel.aggregate([
        { $unwind: '$labourItems' },
        {
            $group: {
                _id: '$labourItems.role',
                totalHours: { $sum: '$labourItems.hoursWorked' }
            }
        },
        {
            $group: {
                _id: null,
                totalHoursByRole: {
                    $push: { k: '$_id', v: '$totalHours' }
                }
            }
        },
        {
            $replaceRoot: {
                newRoot: { $arrayToObject: '$totalHoursByRole' }
            }
        }
    ]);

    const totalDockets = await docketModel.countDocuments();

    return { totalDockets, totalHoursByRole: summary[0] || {} };
};


export const listDocketService = async (jobId, { from, to, supervisorName }) => {
    const job = await jobModel.findById(jobId);
    if (!job) throw new AppError('Job not found.', 404);
    const query = { jobId };
    if (supervisorName) query.supervisorName = { $regex: supervisorName, $options: 'i' };
    if (from || to) {
        const dateQuery = {};
        const parseDate = (dateString, endOfDay = false) => {
            const date = moment(dateString, 'DD-MM-YYYY', true);
            if (!date.isValid()) {
                throw new AppError(`Invalid date format for filter "${dateString}". Must be DD-MM-YYYY.`, 400);
            }
            return endOfDay ? date.endOf('day').toDate() : date.startOf('day').toDate();
        };

        if (from) dateQuery.$gte = parseDate(from);
        if (to) dateQuery.$lte = parseDate(to, true);
        query.date = dateQuery;
    }

    const dockets = await docketModel.find(query).sort({ date: -1, createdAt: -1 });
    return dockets;
};