import axios from 'axios';


//Base url
//export const addr = 'http://92.169.10.120:3000';
//export const addr = 'http://192.168.1.76:3000';
//export const addr = 'http://localhost:3000';

export const addr = 'http://75.119.135.42:3000';

//Check cred
export const checkCred = async (login,mdp) => {
    const url = addr+'/users/login/'+login+'/'+mdp;
    const valid = await (await axios.get(url)).data;
    return valid;
};

//post new user
export const storeNewUser = async (user) => {
    return await axios.post(addr+'/users',user);
}

export const verifyLoginAvailable = async (login) => {
    return (await (await axios.get(addr+'/users/'+login)).data).length < 1;
}

export const throwAlert = async (body) => {
    return await axios.post(addr+'/alerts',body);
}

export const getAllAlerts = async () => {
    return await (await axios.get(addr+'/alerts')).data;
}

export const getUsers = async () => {
    return await (await axios.get(addr+'/users')).data;
}



export const getUserByLogin = async (login) => {
    return await (await axios.get(addr+'/users/'+login)).data[0];
}

export const addProtect = async (loginProtege,loginProtecteur) => {
    return await axios.post(addr+'/protect',{
        // eslint-disable-next-line @typescript-eslint/camelcase
        login_protecteur: loginProtecteur,
        // eslint-disable-next-line @typescript-eslint/camelcase
        login_protege: loginProtege
    })
}

export const removeProtect = async (loginProtege,loginProtecteur) => {
    return await axios.delete(addr+'/protect/'+loginProtecteur+'/'+loginProtege);
}

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



export const getPhotoUrl = (user) => {
    const photoId = user.filePhoto;
    if(photoId !== undefined && photoId !== null && photoId !== ''){
        return addr+'/files/'+photoId;
    }
    else{
        return 'photoNotFound'
    }
}

export const getProfilePhoto = async (login) => {
    const user = await(await axios.get(addr+'/users/'+login)).data[0];
    return getPhotoUrl(user)
}

export const getMesProtecteurs = async (login) => {
    const protects = await (await axios.get(addr+'/protect/protege/'+login)).data;
    const protecteurs = [];
    for(const protect of protects){
        const user = await getUserByLogin(protect.login_protecteur);
        user.photo = getPhotoUrl(user)
        protecteurs.push(user);
    }
    return protecteurs;
}

export const getMesProteges = async (login) => {
    const protects = await (await axios.get(addr+'/protect/protecteur/'+login)).data;
    const proteges = [];
    for(const protect of protects){
        const user = await getUserByLogin(protect.login_protege);
        user.photo = getPhotoUrl(user)
        proteges.push(user);
    }
    return proteges;
}