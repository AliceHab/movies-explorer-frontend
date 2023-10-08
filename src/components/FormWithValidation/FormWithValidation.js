import React, { useCallback } from './react';

// хук валидации формы
export function useFormWithValidation() {
  const [valueForm, setValues] = React.useState({});
  const [errorForm, setErrors] = React.useState({});
  const [isValidForm, setIsValid] = React.useState(false);

  const handleChangeForm = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...valueForm, [name]: value });
    setErrors({ ...errorForm, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { valueForm, handleChangeForm, errorForm, isValidForm, resetForm };
}
