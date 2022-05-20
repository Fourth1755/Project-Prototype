import users from '../data/user.json'
export function signin(email,password){
    return new Promise((resolve,reject)=>{
        const foundUser =users.find(
            (user) =>user.email === email && user.password === password
        )
        setTimeout(()=>{
            if(foundUser){
                resolve(foundUser)
            }
            else{
                reject('Email or passwprd is invalid')
            }
        },3000)
    })
}