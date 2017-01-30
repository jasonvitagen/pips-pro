module.exports = (req, res, next) => {
    const
        {name, mobile, email, password, confirmPassword, recaptcha} = req.body
        , validationErrors = {};

    if (!name) validationErrors.name = 'Name is required';
    if (!/^\d*$/.test(mobile)) validationErrors.mobile = 'Please enter a valid mobile number';
    if (!mobile) validationErrors.mobile = 'Mobile number is required';
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) validationErrors.email = 'Please enter a valid email address';
    if (!email) validationErrors.email = 'Email is required';
    if (!password) validationErrors.password = 'Password is required';
    if (password !== confirmPassword) validationErrors.confirmPassword = 'Confirmation password does not match';
    if (!confirmPassword) validationErrors.confirmPassword = 'Confirmation password is required';
    if (!recaptcha) validationErrors.recaptcha = 'Recaptcha is required';

    if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json(validationErrors);
    }

    next();
}