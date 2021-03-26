//Base url
//export const addr = 'http://92.169.10.120:3000';
//export const addr = 'http://192.168.1.76:3000';
export const addr = 'http://localhost:3000';
//export const addr = 'http://75.119.135.42:3000'

//Check cred
export const getCheckCred = (login,mdp) => { return addr+'/users/login/'+login+'/'+mdp };
//get all users
export const getUsers = () => { return addr+'/users' }
//post new user
export const postUser = () => { return addr+'/users' }

export const getAddAlertUrl = () => { return addr+'/alerts'}