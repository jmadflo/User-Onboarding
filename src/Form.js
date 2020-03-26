import React, {useState, useEffect}from 'react'
import * as yup from 'yup'
import axios from 'axios'

const Form = () => {

    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [post, setPost] = useState([])

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        terms: ""
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        terms: ""
    });

    useEffect(() => {
        
        formSchema.isValid(formState)
            .then(valid => {
                if (formErrors.email === "That email is already taken"){
                    setSubmitDisabled(true)
                } else {
                    setSubmitDisabled(!valid);
                }
                console.log(formErrors.email)
                // setSubmitDisabled(!valid);
            });
        
        
    }, [formState, formErrors.email]);

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Please input your name."),
        email: yup.string()
            .email("This needs to be a valid email address.")
            .required("Please input a valid email address."),
        role: yup.string(),
        password: yup.string()
            .required("Please enter a password"),
        terms: yup.boolean()
            .oneOf([true], "Please agree to terms of service, preferably without reading them. :)")
    })

    const validateData = event => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                console.log(valid)
                
                if (event.target.name === "email" && event.target.value.trim() === "waffle@syrup.com"){
                    setFormErrors({
                        ...formErrors,
                        [event.target.name]: "That email is already taken"
                    });
                } else {
                    setFormErrors({
                        ...formErrors,
                        [event.target.name]: ""
                    });
                }
            })
            .catch(error => {
                console.log(error)
                setFormErrors({
                  ...formErrors,
                  [event.target.name]: error.errors[0]
                });
            });
    }

    const updateForm = event => {
        event.persist();
        validateData(event);
        setFormState({
            ...formState, 
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked: event.target.value});
      };

    const submitForm = event => {
        event.preventDefault();
        axios
          .post("https://reqres.in/api/users", formState)
          .then(response => {
            console.log("Posted successfully: ", post);
            setPost(response.data);
            setFormState({
                name: "",
                email: "",
                role: "",
                password: "",
                terms: ""
            });
          })
          .catch(error => console.log("Post was not successful: ", error.response));
      };

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="name">
                Name
                <input id="name" name="name" type="text" value={formState.name}  onChange={updateForm}/>
                {formErrors.name > 0 ? <p className="error">{formErrors.name}</p> : null}
            </label>
            <label htmlFor="email">
                Email 
                <input id="email" name="email" type="text" value={formState.email} onChange={updateForm}/>
                {formErrors.email ? <p className="error">{formErrors.email}</p> : null}
            </label>
            <label htmlFor="role">
                Role
                <select id="role" name="role" onChange={updateForm}>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                </select>
                {formErrors.role ? <p className="error">{formErrors.role}</p> : null}
            </label>
            <label htmlFor="password">
                Password
                <input id="password" name="password" type="password" value={formState.password} onChange={updateForm}/>
                {formErrors.password ? <p className="error">{formErrors.password}</p> : null}
            </label>
            <label htmlFor="terms" className="terms">
                <input type="checkbox" name="terms" checked={formState.terms} onChange={updateForm}/>
                Terms & Conditions
            </label>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <input type="submit" disabled={submitDisabled} />
        </form>
    )
}

export default Form