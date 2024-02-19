const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const app = express();
// Middleware to parse JSON bodies
app.use(bodyParser.json());


const pass = encodeURIComponent(process.env.admin_pass)
const uri = `mongodb+srv://admin:${pass}@cluster0.1qn1zac.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(uri, {

}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});


const PORT = process.env.PORT || 8000;

const { Instructor, OfficeRecord } = require('./model')

// creating an instructor 
app.post('/instructor', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Name is required' });

        const instructor = await Instructor.create({ name });
        return res.json({
            message: 'Instructor is created!',
            instructor
        })
    } catch (error) {
        console.error('Error creating instructor:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/checkin', async (req, res) => {
    try {
        const { instructor } = req.body;
        // checking for already checkin 
        const result = await OfficeRecord.find({
            instructor: instructor,
            checkoutTime: null
        })
        console.log(result)
        if (result.length != 0) return res.json({ message: 'already checkin' })
        if (!instructor) return res.status(400).json({
            error: "Missing parameters"
        })
        checkinTime = new Date();
        const checkinRecord = await OfficeRecord.create({ instructor, checkinTime })
        return res.json({ message: 'Check-in recorded successfully', record: checkinRecord })
    } catch (error) {
        console.error('Error recording check-in:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/checkout', async (req, res) => {
    try {
        const { instructor } = req.body;
        if (!instructor) return res.status(400).json({
            error: "Missing parameters"
        })
        checkoutTime = new Date();
        const checkInOutRecord = await OfficeRecord.findOneAndUpdate(
            { instructor, checkoutTime: null },
            { checkoutTime }
        )
        console.log("K")
        if (!checkInOutRecord) return res.status(404).json(
            { error: 'No check-in record found for the instructor' }
        );

        return res.json({
            message: 'Check-out recorded successfully',
            record: checkInOutRecord
        })
    } catch (error) {
        console.error('Error recording check-out:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/monthly-report', async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({
                error: 'Missing month parameter in query',
                format: 'YYYY-MM'
            })
        }
        const [year, monthNumber] = month.split('-').map(Number);
        if (isNaN(year) || isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ error: 'Invalid month parameter' });
        }
        const startDate = new Date(year, monthNumber - 1, 1); // Month is 0-indexed in JavaScript
        const endDate = new Date(year, monthNumber, 0);

        const records = await OfficeRecord.find({
            checkin_time: { $gte: startDate, $lt: endDate }
        });

        report = [];
        const instructors = await Instructor.find({});
        console.log(instructors)
        for (let instructor of instructors) {
            let total_hours = 0;
            for (record in records) {
                if (instructor.id == record.instructor) {
                    let time = (record.checkout_time - record.checkin_time) / (1000 * 60 * 60)
                    total_hours += time;
                }
            }
            console.log(instructor.name)
            report.push({
                id: instructor.id,
                name: instructor.name,
                working_hours: total_hours
            })

        }
        return res.json(report)


    } catch (error) {
        console.error('Error while generatig monthly report:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});