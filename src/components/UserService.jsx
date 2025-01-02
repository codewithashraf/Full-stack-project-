import { getDoc, getFirestore, doc } from "firebase/firestore"
import { app } from "../firebase"

const fetchUserProfile = async (uid) => {
  try{
    const db = getFirestore(app)
    const userData = await getDoc(doc(db, 'users', uid))
    if(userData.exists){
      console.log(userData)
      console.log('user data agaya hai ' + userData.data())
      return userData.data()
    } else {
      console.log('no user defined try again!')
    }
  }
  catch(err){
    console.log(err.message)
  }
}

export default fetchUserProfile