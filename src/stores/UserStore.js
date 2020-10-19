// import { makeObservable, observable, action } from 'mobx'

// class UserStore {
//     username = ''
//     role = ''
//     email = ''
//     cognitoUser = null

//     setCognitoUser = (cogUser) => {
//         this.cognitoUser = cogUser
//     }

//     setUserInfo = (username, role, email) => {
//         this.username = username
//         this.role = role
//         this.email = email
//     }

//     resetCognitoUser = () => {
//         this.cognitoUser = null
//     }

//     constructor() {
//         makeObservable(this, {
//             username: observable,
//             role: observable,
//             cognitoUser: observable,
//             email: observable,
//             setCognitoUser: action,
//             setUserInfo: action,
//             resetCognitoUser: action,
//         })
//     }
// }

// const userStore = new UserStore();

// export default userStore;