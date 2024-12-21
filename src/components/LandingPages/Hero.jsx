import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-16">
    <div className="container mx-auto px-4">
      <div className="pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Simplify Attendance Management
              <span className="text-primary block">with Attendify</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl">
              Streamline your attendance tracking process with our comprehensive management system designed for educational institutions.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {/* <CheckCircle className="h-5 w-5 text-primary" /> */}
                <span className="text-gray-700">Easy attendance tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                {/* <CheckCircle className="h-5 w-5 text-primary" /> */}
                <span className="text-gray-700">Real-time reporting</span>
              </div>
              <div className="flex items-center space-x-3">
                {/* <CheckCircle className="h-5 w-5 text-primary" /> */}
                <span className="text-gray-700">Multi-role support</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/signup">
                <button size="lg" className="text-lg">
                  Get Started
                  {/* <ArrowRight className="ml-2 h-5 w-5" /> */}
                </button>
              </Link>
              <Link to="#about">
                <button size="lg" variant="outline" className="text-lg">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
              alt="Students in classroom"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Hero