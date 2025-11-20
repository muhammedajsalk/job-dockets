import catchAsync from '../../../utils/catchAsync.js';
import {closeJobService,createJobService,getJobWithDocketsService,listJobService} from '../service/job.service.js'


export const createJob = catchAsync(async (req, res, next) => {
    const job = await createJobService(req.body);
    res.status(201).json({status: 'success',data: { job }});
});

export const listJobs = catchAsync(async (req, res, next) => {
    const { status, page, limit } = req.query;
    const data = await listJobService({status,page: page ? parseInt(page) : undefined,limit: limit ? parseInt(limit) : undefined});
    res.status(200).json({status: 'success',results: data.jobs.length,data});
});

export const getJobById = catchAsync(async (req, res, next) => {
    const jobData = await getJobWithDocketsService(req.params.id);
    res.status(200).json({status: 'success',data: { job: jobData }});
});

export const closeJob = catchAsync(async (req, res, next) => {
    const job = await closeJobService(req.params.id);
    res.status(200).json({status: 'success',data: { job }});
});
