module.exports.generateTokenDurationInMs = (days) => {
    return days * 24 * 60 * 60 * 1000
}