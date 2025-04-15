const healthcheck = (req, res) => {
    const healthData = {
        message: 'El servicio está funcionando correctamente',
    };
    res.status(200).json(healthData);
};

module.exports = {
    healthcheck,
};
