const g = require('../models/gardener');
const gp = require('../models/gardenerPlot');


exports.createGardener = async (req, res) => {
    const { email, phone, name } = req.body;

    if (!email || !name) {
        return res.status(400).send({ message: 'Email and name are required!' });
    }

    try {
        const result = await g.insertGardener({ email, phone, name });

        if (result) res.status(201).send({ message: 'Gardener added successfully' });
        else res.status(400).send({message: 'A gardener with the same email already exists'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }

};

exports.deleteGardeners = async (req, res) => {
    const { emails } = req.body;

    console.log('Type of emails:', typeof emails);


    if (!emails || !Array.isArray(emails) || emails.length == 0) {
        return res.status(400).send({ message: 'Emails array is required!' }); 
    }

    try {

        const result = await g.deleteGardenersByEmail({ emails });

        if (result) res.status(201).send({ message: 'Gardeners removed successfully' });
        else res(400).send({message: 'Something went wrong'});   //??


    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }  
};

exports.getAllGardeners = async (req, res) => {
    try {
        const gardens = await g.getAll();
        res.status(200).send(gardens);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateGardener = async (req, res) => {
    const { email, phone, name } = req.body;

    if (!email || !phone || !name) {
        return res.status(400).send({ message: 'Email, phone, and name are required!' });
    }

    try {
        const result = await Gardener.updateGardener({ email, phone, name });
        if (result) {
            res.status(200).send({ message: 'Gardener updated successfully!' });
        } else {
            res.status(400).send({ message: 'Failed to update gardener!' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }
};