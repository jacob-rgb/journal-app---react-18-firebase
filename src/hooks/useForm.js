import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, customFormValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidations, setFormValidations ] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState])

    useEffect(() => {
       setFormState(initialForm);
    }, [initialForm])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formFieldName of Object.keys( customFormValidations )) {
            const [fn, errorMsg] = customFormValidations[formFieldName];
            formCheckedValues[`${ formFieldName }Valid`] = !fn( formState[formFieldName] ) ? errorMsg : null;
        }

        setFormValidations(formCheckedValues);
    }

    const isFormValid = useMemo(() => {
        return Object.keys(formValidations)
            .some(formFieldValidationName => formValidations[formFieldValidationName] !== null);
    },[formValidations]);

    return {
        ...formState,
        formState,
        ...formValidations,
        formValidations,
        onInputChange,
        onResetForm,
        isFormValid
    }
}