import React, { useState } from "react";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordErrors: {
      lengthError: false,
      numberError: false,
      specialCharacterError: false,
    },
    successMessage: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      passwordErrors:
        name === "password" ? validatePassword(value) : formData.passwordErrors,
    });
  };

  const validatePassword = (password: string) => {
    const passwordErrors = {
      lengthError: password.length >= 8 ? true : false,
      numberError: /\d/.test(password),
      specialCharacterError: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
        password
      ),
    };
    return passwordErrors;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validateEmail(email)) {
      setFormData({
        ...formData,
        emailError: "Formato del mail inválido",
        passwordErrors: {
          lengthError: false,
          numberError: false,
          specialCharacterError: false,
        },
        successMessage: "",
      });
      return;
    }

    const errors = validatePassword(password);
    if (
      !errors.lengthError ||
      !errors.numberError ||
      !errors.specialCharacterError
    ) {
      setFormData({
        ...formData,
        emailError: "",
        passwordErrors: errors,
        successMessage: "",
      });
      return;
    }

    setFormData({
      ...formData,
      emailError: "",
      passwordErrors: errors,
      successMessage: "Sesión iniciada! Bienvenido!",
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSignup}
        className="border-white border-2 border-solid p-4 rounded-md"
      >
        <h2 className="text-2xl mb-4">Registro</h2>
        {formData.successMessage && (
          <div className="mb-4 text-green-500">{formData.successMessage}</div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-1 rounded-lg border-white border-2 border-solid"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {formData.emailError && (
            <div className="text-red-500 mb-1">{formData.emailError}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-1 rounded-lg border-white border-2 border-solid"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="current-password"
          />
          <div className="mb-1">
            {formData.passwordErrors.lengthError ? (
              <span className="text-green-500">
                La contraseña tiene al menos 8 letras
              </span>
            ) : (
              <span className="text-red-500">
                La contraseña debe tener al menos 8 letras
              </span>
            )}
          </div>
          <div className="mb-1">
            {formData.passwordErrors.numberError ? (
              <span className="text-green-500">
                La contraseña tiene al menos un número
              </span>
            ) : (
              <span className="text-red-500">
                La contraseña debe tener al menos un número
              </span>
            )}
          </div>
          <div className="mb-1">
            {formData.passwordErrors.specialCharacterError ? (
              <span className="text-green-500">
                La contraseña tiene al menos un carácter especial
              </span>
            ) : (
              <span className="text-red-500">
                La contraseña necesita un carácter especial
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
