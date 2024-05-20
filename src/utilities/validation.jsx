export const checkLoginValidation = (email,password) =>{
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/.test(email)
    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)
    if(!isEmailValid)return 'Email is not valid'
    if(!isPasswordValid)return 'Password is not valid'
    return null
}

export const checkSignupValidation = (name,email,phone,password) =>{
    const isNameValid = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/.test(name)
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/.test(email)
    const isNumberValid = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone)
    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)
    if(!isNameValid)return 'Name is not Valid'
    if(!isEmailValid)return 'Email is not Valid'
    if(!isNumberValid)return 'Number is not Valid'
    if(!isPasswordValid)return 'Password is not Valid'
    return null

}