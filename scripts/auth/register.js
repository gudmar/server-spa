(() => {
    const VALID = { result: true }
    const getError = (message) => {
        return {
        isValid: false,
        message
    }}
    
    const isCapitalLetter = (char) => {
        if (char.length && char.length > 1) return false;
        const lowered = char.toLowerCase();
        return lowered !== char
    }

    const areAllCapitals = (str) => str.split('').every(isCapitalLetter);

    const isOnlyFirstCapital = (str) => {
        if (!str.length) return false;
        const first = str[0];
        const rest = str.substring(1);
        return isCapitalLetter(first) && areAllCapitals(rest)
    }

    const NO_EVENT = '';

    class RegisterForm {
        controlsMap = {
            loginInput: {
                selector: '#register-nick-name',
                action: this.pass,
                event: 'change'
            },
            passwordInput: {
                selector: '#register-password',
                action: this.pass,
                event: 'change'
            },
            firstNameInput: {
                selector: '#register-first-name',
                action: this.pass,
                event: 'change',
            },
            familyNameInput: {
                selector: '#register-family-name',
                action: this.pass,
                event: 'change',
            },
            registerButton: {
                selector: '.register-register',
                action: this.register.bind(this),
                event: 'click'
            },
            messagePlaceholder: {
                selector: '#register-message',
                action: this.pass,
                event: NO_EVENT
            }
        }
        pass(){}

        constructor() {
            this.setControls();
            this.setInitialCredentials();
            // this.bindActions();
        }

        setInitialCredentials() {
            this.controlsMap.loginInput.element.value = 'JohnDoe',
            this.controlsMap.passwordInput.element.value = 'asdf1234@'
            this.controlsMap.firstNameInput.element.value = 'John',
            this.controlsMap.familyNameInput.element.value = 'Doe'
        }

        setControls() {
            Object.entries(this.controlsMap).forEach(([key, {selector, action, event}]) => {
                const element = document.querySelector(selector)
                this.controlsMap[key].element = element;
                if (event !== NO_EVENT) element.addEventListener(event, action)
            })
        }

        getPasswordValue() {
            return this.controlsMap.passwordInput.element.value;
        }

        getLoginValue() {
            return this.controlsMap.loginInput.element.value
        }

        getFirstNameValue() {
            return this.controlsMap.firstNameInput.element.value
        }
        getFamilyNameValue() {
            return this.controlsMap.familyNameInput.element.value
        }

        get registerButton() {
            return this.controlsMap.registerButton.element
        }

        checkIfNameValid(name) {
            const isLongEnough = name.length >= 2 && name.length < 50;
            if (!isLongEnough) return getError('Both name and family name should be at least 2 characters long, and shorter then 50 characters')
            const isCapitalStarted = isOnlyFirstCapital(name)
            return isCapitalStarted ? VALID : getError('Both name and family name should start with a capital letter, and rest of letters should be not capital letters')
        }

        checkIfLoginValid(login) {
            const isLongEnough = login.length >= 2 && login.length < 50;
            return isLongEnough ? VALID : getError('Login too short')
        }

        checkIfPasswordValid(password) {
            const isNotEmpty = password.trim() !== '';
            if (!isNotEmpty) return getError('Password cannot be empty');
            const isLengthCorrect = password.length >= 5;
            if (!isLengthCorrect) return getError('Passowrd length should be >= 5')
            const hasMandatorySymbols = /[a-zA-Z][0-9]/.test(password)
            if (!hasMandatorySymbols) return getError('A password should have a letter and a digit')
            return VALID        
        }

        validate(entries) {
            const errors = entries.reduce((acc, [value, callback]) => {
                const { message } = callback(value)
                if (message) acc.push(message)
                return acc
            }, [])
            return errors;
        }

        getUniqueErrors(errors) {
            const obj = {}
            errors.forEach((e) => obj[e] = '')
            return Object.keys(obj)
        }

        showValidationErrors(errors) {
            // throw new Error('Implement this function')
            const uniqueErrors = this.getUniqueErrors(errors)
            this.controlsMap.messagePlaceholder.element.innerHTML = uniqueErrors.map((error) => `<li class="error">${error}</li>`).join('');
        }

        async register() {
            const login = this.getLoginValue();
            const password = this.getPasswordValue();
            const firstName = this.getFirstNameValue();
            const familyName = this.getFamilyNameValue();
            const validationErrors = this.validate([
                [login, this.checkIfLoginValid],
                [password, this.checkIfPasswordValid],
                [firstName, this.checkIfNameValid],
                [familyName, this.checkIfNameValid],
            ]).map((err) => {console.log(err); return err})
            if (validationErrors.length) {
                this.showValidationErrors(validationErrors)
            } else {
                const body = JSON.stringify({ login, password, firstName, familyName })
                console.log(login, password, body)
                const res = await fetch(getUrl('api/register'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },        
                    body
                })    
            }
        }
    }

    new RegisterForm();
})()
