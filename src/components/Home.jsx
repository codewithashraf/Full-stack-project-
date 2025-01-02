import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-purple-700">
          LearnSmart Academy
        </h1>
        <nav className="space-x-6">
          <a href="#home" className="text-gray-700 hover:text-purple-600">
            Home
          </a>
          <a href="#about" className="text-gray-700 hover:text-purple-600">
            About
          </a>
          <a href="#contact" className="text-gray-700 hover:text-purple-600">
            Contact Us
          </a>
        </nav>
        <div className="space-x-4">
          <button className="px-5 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
            <Link to={"/login"}>Login</Link>
          </button>
          <button className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <Link to={"/signup"}>Signup</Link>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 lg:w-full max-lg:container mx-auto flex flex-col md:flex-row items-center text-center md:text-left p-8 bg-[url('/images/home-hero-banner.jpg')] bg-cover bg-right bg-no-repeat">
        <section className="flex-1 lg:ml-6">
          <h2 className="text-5xl font-bold text-gray-800 mb-6  leading-tight">
            Welcome to{" "}
            <span className="text-purple-600">LearnSmart Academy</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-lg">
            Empowering students with personalized learning experiences and
            interactive sessions designed to boost knowledge and confidence.
          </p>
          <div className="mt-8 flex space-x-4">
            <button className="px-8 py-3 bg-purple-500 text-white text-lg rounded-lg shadow-lg hover:bg-purple-600">
              Explore Courses
            </button>
            <button className="px-8 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-lg hover:bg-blue-600">
              Contact Us
            </button>
          </div>
        </section>
        <section className="flex-1 mt-8 md:mt-0">
          <img
            src="/images/man.png"
            alt="Learning Platform Illustration"
            className=" max-w-full h-auto"
          />
        </section>
      </main>

      {/* Features Section */}
      <section className="mt-16 w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-purple-700">
            Interactive Classes
          </h3>
          <p className="text-gray-600 mt-4">
            Real-time virtual classrooms that make learning engaging and fun.
          </p>
        </div>
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-purple-700">
            Expert Tutors
          </h3>
          <p className="text-gray-600 mt-4">
            Learn from experienced tutors dedicated to your success.
          </p>
        </div>
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-purple-700">
            Flexible Timings
          </h3>
          <p className="text-gray-600 mt-4">
            Schedule your learning sessions at times that work for you.
          </p>
        </div>
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-purple-700">
            Affordable Plans
          </h3>
          <p className="text-gray-600 mt-4">
            Quality education that fits your budget.
          </p>
        </div>
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-purple-700">
            Progress Tracking
          </h3>
          <p className="text-gray-600 mt-4">
            Monitor your learning milestones and achievements.
          </p>
        </div>
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-purple-700">
            Certifications
          </h3>
          <p className="text-gray-600 mt-4">
            Earn certificates to showcase your skills and knowledge.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-8">
        <div className="container mx-auto text-center">
          <h4 className="text-lg font-semibold">Get in Touch</h4>
          <p>Email: support@learnsmart.com | Phone: +123-456-7890</p>
          <div className="flex justify-center mt-4 space-x-6">
            <a href="#" className="text-blue-400 hover:text-blue-300">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              <FaInstagram size={24} />
            </a>
          </div>
          <p className="mt-4">
            &copy; 2025 LearnSmart Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
