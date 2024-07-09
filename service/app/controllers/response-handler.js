// handle responses and errors

export const setResponse = (data, response) => {
    response.status(200);
    response.json(data);
}

export const setError = (err, response) => {
    response.status(500);
    console.log("Error",err)
    response.json({
        error: {
            code: 'InternalServerError',
            message: 'Error occured while processing the request'
        }
    });
}