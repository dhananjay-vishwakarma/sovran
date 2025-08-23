// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM-kA8_Igy9L5UuJ6DFWxrcWp4caF_lcI",
  authDomain: "sovran-5a356.firebaseapp.com",
  projectId: "sovran-5a356",
  storageBucket: "sovran-5a356.firebasestorage.app",
  messagingSenderId: "10500042979",
  appId: "1:10500042979:web:dc765765540e8721d7d5d6",
  measurementId: "G-4J2Z5YJF1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

// Contact form submission function
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: 'builders' | 'design' | 'interiors' | '';
  message: string;
  createdAt?: any;
}

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    // Add timestamp to the form data
    const dataToSubmit = {
      ...formData,
      createdAt: Timestamp.now()
    };

    // Add document to 'contactSubmissions' collection
    const docRef = await addDoc(collection(firestore, "contactSubmissions"), dataToSubmit);
    
    console.log("Document written with ID: ", docRef.id);
    return {
      success: true,
      id: docRef.id
    };
  } catch (error) {
    console.error("Error submitting contact form: ", error);
    return {
      success: false,
      error
    };
  }
};

export default app;
