import axios from 'axios';


//Base url
//export const addr = 'http://92.169.10.120:3000';
//export const addr = 'http://192.168.1.76:3000';
export const addr = 'http://localhost:3000';

//export const addr = 'http://75.119.135.42:3000';

//Check cred
export const getCheckCred = (login,mdp) => { return addr+'/users/login/'+login+'/'+mdp };
//get all users
export const getUsers = () => { return addr+'/users' }
//post new user
export const storeNewUser = async (user) => {
    return await axios.post(addr+'/users',user);
}

export const getAddAlertUrl = () => { return addr+'/alerts'}



/* STORING FILES */

const storeFile = async (url,formData) => {
    return await (await axios.post(url,formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })).data;
}

const storeId = async (fileId) => {
    const formData = new FormData()
    formData.append('id',fileId)
    return await storeFile(addr+'/files/id',formData);
}

const storePhoto = async (filePhoto) => {
    const formData = new FormData()
    formData.append('photo',filePhoto)
    return await storeFile(addr+'/files/photo',formData);
}

export const sendFilesToMongo = async (fileId, filePhoto) => {
    console.log(fileId,filePhoto)
    const idId = await storeId(fileId);
    const photoId = await storePhoto(filePhoto);
    return {fileIdId: idId, filePhotoId: photoId};
}