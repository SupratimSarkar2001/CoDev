const singUpValidation = (UserInstance) => {
 const { firstName, lastName, password } = UserInstance;

 // Ensure values exist and are strings
 if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof password !== 'string') {
   throw new Error('Invalid input data.');
 }

 // Password should not contain firstName or lastName in it
 if (password.toLowerCase().includes(firstName.toLowerCase()) || password.toLowerCase().includes(lastName.toLowerCase())) {
   throw new Error("Password should not contain firstName or lastName in it");
 }
}


module.exports = {singUpValidation}