class ResourceError extends Error {
  constructor(message, status = 400) {
    super();
    this.message = message;
    this.status = status;
  }
}

const handle_error = (err, res) => {
  if (err instanceof ResourceError) {
    res.status(err.status).send({
      status: err.status,
      error: 'resource error',
      message: err.message
    });
  } else {
    console.log("Unknown error occurred ...");
    console.log(err);

    // Don't send the error to the client !
    res.status(500).send({
      status: 500,
      error: 'unknown-internal-error',
      message: 'Unknown internal error occurred. Please try refreshing/logging out. If this continues to happen, please contact the admin.'
    });
  }
};

export { ResourceError, handle_error }
