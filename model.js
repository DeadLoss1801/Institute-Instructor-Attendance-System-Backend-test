const mongoose = require('mongoose');



const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const officeRecordSchema = new mongoose.Schema({
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    checkinTime: {
        type: Date,
        required: true
    },
    checkoutTime: {
        type: Date
    }

});

const Instructor = mongoose.model('Instructor', instructorSchema);
const OfficeRecord = mongoose.model('OfficeRecord', officeRecordSchema);

module.exports = {
    Instructor,
    OfficeRecord
};