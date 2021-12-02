const error = (res, error) => {
    // error
    console.log(error);
    res.status(200).send({
        message: error.errors ? error.errors[0].message : error,
        status: 0,
        data: {},
    });
};

const success = (res, message, data) => {
    res.status(200).send({
        message: message || "Success",
        status: 1,
        data,
    });
};

const fail = (res, message, data) => {
    res.status(200).send({
        message: message,
        status: 0,
        data,
    });
};

module.exports = { error, success, fail };
