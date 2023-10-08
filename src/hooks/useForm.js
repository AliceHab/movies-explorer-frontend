import React, { useState, useCallback } from 'react';

// Хук для создания и валидации форм
export default function useForm(inputValues = {}) {
  // Логика из useForm
  const [values, setValues] = useState(inputValues);

  // Логика из useFormWithValidation
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value, validationMessage } = event.target;

    // Обновляем значения из useForm
    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    // Обновляем ошибки и валидность из useFormWithValidation
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationMessage }));
    setIsValid(event.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues };
}
