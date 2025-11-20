import mongoose from "mongoose";

const LabourItemSchema = new mongoose.Schema({
    workerName: { type: String, required: true },
    role: { type: String, required: true },
    hoursWorked: {
        type: Number,
        required: true,
        min: [0.01, 'Hours worked must be greater than 0.'],
    },
}, { _id: false });

const docketSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    supervisorName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: [true, 'Date is required.'],
    },
    labourItems: {
        type: [LabourItemSchema],
        required: [true, 'Labour items are required.'],
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'A docket must have at least one labour item.',
        },
    },
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Docket = mongoose.model('Docket', docketSchema);

export default Docket