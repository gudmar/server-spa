(() => {

    class LoginForm {
        loginInput = null;
        passwordInput = null;
        loginButton = null;
        registerButton = null;
        controlsInOrder = [];
        controlsMap = {
            loginInput: {
                selector: '#login-nick-name',
                action: this.pass,
                event: 'change'
            },
            passwordInput: {
                selector: '#login-password',
                action: this.pass,
                event: 'change'
            },
            loginButton: {
                selector: '.login-login',
                action: this.login.bind(this),
                event: 'click'
            },
            registerButton: {
                selector: '.login-register',
                action: this.register.bind(this),
                event: 'click'
            }
        }
        pass(){}
        constructor() {
            this.setControls();
            this.setInitialCredentials();
        }

        setInitialCredentials() {
            this.controlsMap.loginInput.element.value = 'JohnDoe',
            this.controlsMap.passwordInput.element.value = 'asdf1234@'
        }

        setControls() {
            Object.entries(this.controlsMap).forEach(([key, {selector, action, event}]) => {
                const element = document.querySelector(selector)
                this.controlsMap[key].element = element;
                element.addEventListener(event, action)
            })
        }

        getPasswordValue() {
            return this.controlsMap.passwordInput.element.value;
        }

        getLoginValue() {
            return this.controlsMap.loginInput.element.value
        }

        get loginButton() {
            return this.controlsMap.loginButton.element
        }

        get registerButton() {
            return this.controlsMap.registerButton.element
        }

        async login() {
            const login = this.getLoginValue();
            const password = this.getPasswordValue();
            const body = JSON.stringify({ login, password })
            console.log(login, password, body)
            const res = await fetch(getUrl('api/login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },        
                body
            })
        }

        async register() {
            window.location.hash = 'register'
        }

    }

    new LoginForm();
})()