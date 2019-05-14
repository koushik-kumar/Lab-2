const isEmpty = (givenValue) => {
    return (
        givenValue === undefined ||
        givenValue === null ||
        (typeof givenValue === 'object' && Object.keys(givenValue).length === 0) ||
        (typeof givenValue === 'string' && givenValue.trim().length === 0)
    );
}
module.exports = isEmpty;