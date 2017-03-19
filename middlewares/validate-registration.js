module.exports = (options = {skip: {}}) => (req, res, next) => {

    process.nextTick(() => {

        const
            {name, mobile, email, password, confirmPassword, recaptcha, editAccount} = req.body
            , validationErrors = {};

        if (!options.skip.name && !name) validationErrors.name = 'Name is required';
        if (!options.skip.mobile && mobile.length > 15) validationErrors.mobile = 'Max 15 digits for mobile number';
        if (!options.skip.mobile && !/^\d*$/.test(mobile)) validationErrors.mobile = 'Please enter a valid mobile number';
        if (!options.skip.mobile && !mobile) validationErrors.mobile = 'Mobile number is required';
        if (!options.skip.email && email.length > 254) validationErrors.email = 'Max 254 characters for email';
        if (!options.skip.email && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) validationErrors.email = 'Please enter a valid email address';
        if (!options.skip.email && !email) validationErrors.email = 'Email is required';
        if (!options.skip.password && password.length > 128) validationErrors.password = 'Max 128 characters for password';
        if (!options.skip.password && !password) validationErrors.password = 'Password is required';
        if (!options.skip.password && confirmPassword.length > 128) validationErrors.confirmPassword = 'Max 128 characters for password';
        if (!options.skip.password && password !== confirmPassword) validationErrors.confirmPassword = 'Confirmation password does not match';
        if (!options.skip.password && !confirmPassword) validationErrors.confirmPassword = 'Confirmation password is required';
        if (!options.skip.recaptcha && !editAccount) {
            if (!recaptcha) validationErrors.recaptcha = 'Recaptcha is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json(validationErrors);
        }

        next();

    });
}