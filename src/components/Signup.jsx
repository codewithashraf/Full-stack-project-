import React, { useEffect, useState } from 'react'
import {app} from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { getFirestore, setDoc, doc } from 'firebase/firestore'



const Signup = () => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    const auth = getAuth(app)
    createUserWithEmailAndPassword(auth, email, password)
    .then(userData => {
      console.log(userData.user.uid)
      const idName = name.trim().split(' ').join('')
      console.log(idName)

      // save data from firestore database
      const db = getFirestore(app)
      const fireStoreRef = doc(db, `users`, userData.user.uid)
      const sendData = setDoc(fireStoreRef, {
        userName: name,
        userPhoneNumber: phoneNumber,
        userEmail: email,
        password: password,
        userUid: userData.user.uid,
        status: 'submitting',
      })
      

      // navigate into login form
      navigate('/login', {state: {email, password, userId: userData.user.uid}})
    })
    .catch(err => {
      setError(err)
      console.log(error)
    })
  }

  useEffect(() => {
    sessionStorage.clear()
  }, [])



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 tracking-wider">Sign-Up</h2>
        <form onSubmit={handleSignup} className="space-y-6">
        <div>
            <label htmlFor="name" className="block text-gray-300 text-sm mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 capitalize focus:ring-indigo-400 outline-none shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="number" className="block text-gray-300 text-sm mb-1">Phone Number</label>
            <input
              type="number"
              id="number"
              placeholder="Enter your number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">please enter a valid email{error.message}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transform transition-transform hover:scale-105 duration-300"
          >
            SignUp
          </button>
        </form>
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-2xl blur-2xl opacity-70"></div>
      </div>
    </div>
  );
}

export default Signup