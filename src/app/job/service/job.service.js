import jobModel from '../model/job.model.js'
import docketModel from '../../docket/model/docket.model.js';
import AppError from '../../../utils/AppError.js';


export const createJobService = async (jobData) => {
    const job = await jobModel.create(jobData);
    return job;
};


export const listJobService = async ({ status, page = 1, limit = 10 }) => {
    const query = {};
    if (status) query.status = status;
    const skip = (page - 1) * limit;

    const jobs = await jobModel.find(query).limit(limit).skip(skip).sort({ createdAt: -1 });
    const total = await jobModel.countDocuments(query);
    return {
        jobs,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalJobs: total,
    };
};


export const getJobWithDocketsService = async (jobId) => {
    const job = await jobModel.findById(jobId);
    if (!job) {
        throw new AppError('Job not found.', 404);
    }
    const dockets = await docketModel.find({ jobId }).sort({ date: 1 });
    return {
        ...job.toObject(),
        dockets,
    };
};


export const closeJobService = async (jobId) => {
    const job = await jobModel.findById(jobId);
    if (!job) {
        throw new AppError('Job not found.', 404);
    }
    if (job.status === 'closed') {
        throw new AppError('Job is already closed.', 409);
    }
    job.status = 'closed';
    await job.save();
    return job;
};
