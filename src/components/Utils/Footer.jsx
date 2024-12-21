import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-50">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            {/* <ClipboardCheck className="h-6 w-6 text-primary" /> */}
            <span className="text-lg font-bold text-primary">Attendify</span>
          </div>
          <p className="text-sm text-gray-600">
            Streamline attendance management for educational institutions with our comprehensive solution.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-sm text-gray-600 hover:text-primary">Home</Link>
            </li>
            <li>
              <Link to="#about" className="text-sm text-gray-600 hover:text-primary">About</Link>
            </li>
            <li>
              <Link to="#features" className="text-sm text-gray-600 hover:text-primary">Features</Link>
            </li>
            <li>
              <Link to="#contact" className="text-sm text-gray-600 hover:text-primary">Contact</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-primary">Terms of Service</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600">support@attendify.com</li>
            <li className="text-sm text-gray-600">+1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t mt-12 pt-8">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Attendify. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  )
}

export default Footer