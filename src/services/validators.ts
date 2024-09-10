class Validators {
  private _validators: { validateEmail: (value: string) => boolean };

  constructor(validateEmail: (email: string) => boolean) {
    this._validators = {
      validateEmail,
    };
  }

  get(key: keyof typeof this._validators) {
    return this._validators[key];
  }
}

export default Validators;
