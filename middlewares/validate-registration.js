module.exports = (req, res, next) => {
    const
        {name, email, password, confirmPassword} = req.body
        , validationErrors = {name: [], email: [], password: [], confirmPassword: []};

    if (!name) validationErrors.name.push('Name is required');
    if (!email) validationErrors.email.push('Email is required');
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) validationErrors.email.push('Please enter a valid email address');
    if (!password) validationErrors.password.push('Password is required');
    if (!confirmPassword) validationErrors.confirmPassword.push('Confirmation password is required');
    if (password !== confirmPassword) validationErrors.confirmPassword.push('Confirmation password does not match');

    if (validationErrors.name.length <= 0) {
        delete validationErrors.name;
    }
    if (validationErrors.email.length <= 0) {
        delete validationErrors.email;
    }
    if (validationErrors.password.length <= 0) {
        delete validationErrors.password;
    }
    if (validationErrors.confirmPassword.length <= 0) {
        delete validationErrors.confirmPassword;
    }
    if (validationErrors.name || validationErrors.email || validationErrors.password || validationErrors.confirmPassword) {
        return res.status(400).json(validationErrors);
    }

    next();
}