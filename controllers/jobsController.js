

const createJob = async (req, res) => {
    res.send('create Job')
}

const getAllJobs = async (req, res) => {
    res.send('get All jobs')
}

const updateJob = async (req, res) => {
    res.send('update job')
}

const deleteJob = async (req, res) => {
    res.send('delete jobs')
}

const showStats = async (req, res) => {
    res.send('show Stats')
}



export {
    createJob,
    deleteJob,
    getAllJobs,
    updateJob,
    showStats
}