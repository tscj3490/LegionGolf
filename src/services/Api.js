import {
    AsyncStorage,
    Platform,
} from 'react-native';
import * as async from 'async'
const backendURL = 'http://meridians2.com:9000'

module.exports = {
    
    async keybaseLogin(username, passphrase, cb) {
        try {
            let response = await fetch(`${backendURL}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username, passphrase}) 
                })

            let status = response.status
            let responseJson = await response.json();
            if (status == 200) {
                cb(responseJson.err, responseJson.res);
            } else {
                cb(responseJson)
            }
        } catch (error) {
            cb(error)
        }
    },
    async uploadFile(file, cb) {
        try {
            let image = {
                uri: file,
                type: 'image/jpeg',
                name: 'file.jpeg'
            }

            let formData = new FormData();
            formData.append('avatar', image);
            let response = await fetch(backendURL + '/upload/image',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        //'Authorization': 'Bearer ' + Cache.currentUser['token'],
                    },
                    body: formData
                })

            let status = response.status

            let responseJson = await response.json();
            if (status == 200) {
                cb(null, responseJson);
            } else {
                cb(responseJson.message)
            }
        } catch (error) {
            cb(error)
        }
    },
}
