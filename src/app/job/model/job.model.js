import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobNumber: {
        type: String,
        required: [true, 'Job number is required.'],
        unique: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: [true, 'Client name is required.'],
    },
    siteLocation: {
        type: String,
        required: [true, 'Site location is required.'],
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Job = mongoose.model('Job', jobSchema);

export default Job