import catchAsync from '../../../utils/catchAsync.js';
import {createDocketService,getSummaryService, listDocketService} from '../service/docket.service.js'


export const createDocket = catchAsync(async (req, res, next) => {
    const docket = await createDocketService(req.params.jobId, req.body);
    res.status(201).json({status: 'success',data: { docket }});
});

export const getSummary = catchAsync(async (req, res, next) => {
    const summary = await getSummaryService();
    res.status(200).json(summary);
});

export const listDockets = catchAsync(async (req, res, next) => {
    const jobId = req.params.jobId;
    const filters = req.query; 
    const dockets = await listDocketService(jobId, filters);
    res.status(200).json({status: 'success',results: dockets.length,data: { dockets }});
});