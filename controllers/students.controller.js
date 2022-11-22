const db = require('../models');
const { generateCode } = require('../utils/generateCode');

//get all students
const getStudents = async (req, res) => {

    try {

        const data = await db.students.find();

        res.status(200).send({
            message: 'Success',
            count: data.length,
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    };
};

//create student
const createStudent = async (req, res) => {
    const body = req.body;
    const userId = req.userId;

    try {
        
        //empty body
        if (Object.keys(body).length == 0) return res.status(400).send({ message: 'Empty body' });

        //create data
        const newStudent = new db.students({
            createBy: userId,
            category: body.category,
            title: body.title,
            coverName: body.coverName,
            generation: body.generation,
            code: generateCode(6),
        });

        //save new student
        const data = await newStudent.save();

        res.status(200).send({
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//update student
const updateStudent = async (req, res) => {
    const { studentId } = req.params;
    const body = req.body;

    try {

        //empty body
        if (Object.keys(body).length == 0) return res.status(400).send({ message: 'Empty body' });

        //find student id
        const findId = await db.students.findById(studentId);
        if (!findId) return res.status(404).send({ message: 'Not find student' });

        await db.students.findByIdAndUpdate(studentId, body);
        const studentUpdate = await db.students.findById(studentId);

        res.status(200).send({
            message: 'Success',
            studentUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//delete student
const deleteStudent = async (req, res) => {
    const { studentId } = req.params;

    try {

        //find student id and update
        const data = await db.students.findByIdAndDelete(studentId);
        if (!data) return res.status(404).send({ message: 'Not find student id' });

        res.status(200).send({
            message: 'Success',
            data: data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal server error' });
    };
};

//create join class
const joinClass = async (req, res) => {
    const body = req.body;
    const userId = req.userId;

    try {
        
        //empty body
        if (Object.keys(body).length == 0) return res.status(400).send({ message: 'Empty body' });
        
        //find class
        const findClass = await db.students.findOne({ code: body.code });
        if (!findClass) return res.status(404).send({ message: 'Not find class' })

        //check record
        const isExist = await findClass.student.find((student) => student == userId);
        if (isExist == userId) return res.status(400).send({ message: 'Have alrady join' });

        //add student
        const newStudent = userId;
        await findClass.student.unshift(newStudent)
        findClass.save();

        res.status(200).send({
            message: 'Success',
            count: findClass.student.length,
            data: newStudent,
            classData: findClass,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({  message: 'Internal server error' });
    };
};

//leave class
const leaveClass = async (req, res) => {
    const { studentId } = req.params;
    const userId = req.userId;

    try {

        //find student id
        const findId = await db.students.findById(studentId);
        if (!findId) return res.status(404).send({ message: 'Not find student id' });

        //check own student
        const join = findId.student.find((join) => join == userId);
        if (join != userId) return res.status(400).send({ message: 'Do not have class yet!' });

        //find indexOf student
        const indexOf = findId.student.indexOf(userId);

        //remove comment
        const data = findId.student.splice(indexOf, 1);
        await findId.save();
        
        res.status(200).send({
            message: 'Success',
            data,
            classData: findId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

//get detail student
const getDetailStudent = async (req, res) => {
    const { studentId } = req.params;

    try {

        //find student id
        const findId = await db.students.findById(studentId).populate("student");
        if (!findId) return res.status(404).send({ message: 'Not find student' });

        res.status(200).send({
            message: 'Success',
            countStudent: findId.student.length,
            data: findId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

//get detail student
const getDetailStudentAlumni = async (req, res) => {
    const { studentId, alumniId } = req.params;

    try {

        //find student id
        const findId = await db.students.findById(studentId);
        if (!findId) return res.status(404).send({ message: 'Not find student' });

        //find alumni id
        const findAlumniId = await findId.student.find((data) => data._id == alumniId).populate("_id");
        if (!findAlumniId) return res.status(404).send({ message: 'Not find student' });

        res.status(200).send({
            message: 'Success',
            data: findAlumniId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    };
};

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    joinClass,
    leaveClass,
    getDetailStudent,
    getDetailStudentAlumni,
};