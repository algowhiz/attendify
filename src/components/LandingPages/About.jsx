import React from 'react'
import { FaUsers, FaCalendarDays } from "react-icons/fa6";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { MdShield } from "react-icons/md";

const About = () => {
    const features = [
        {
            icon: FaUsers,
            title: "Multi-Role Management",
            description: "Separate portals for administrators, teachers, and students with role-specific functionalities."
        },
        {
            icon: FaCalendarDays,
            title: "Automated Tracking",
            description: "Effortlessly track and manage attendance with our intuitive digital system."
        },
        {
            icon: HiOutlineChartSquareBar,
            title: "Analytics & Reports",
            description: "Generate detailed attendance reports and analyze patterns with comprehensive analytics."
        },
        {
            icon: MdShield,
            title: "Secure & Reliable",
            description: "Enterprise-grade security ensuring your data is protected and always accessible."
        }
    ];

    return (
        <section id="about" className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold mb-4">About Attendify</h2>
                    <p className="text-gray-600 text-lg">
                        Attendify is a comprehensive attendance management system designed to streamline the process of tracking and managing attendance in educational institutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="border-none shadow-lg">
                            <div className="pt-6">
                                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80"
                                alt="Team collaboration"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold">Why Choose Attendify?</h3>
                            <p className="text-gray-600 text-lg">
                                Our platform is built with the latest technology to provide a seamless experience for educational institutions. We understand the challenges of attendance management and have created a solution that addresses all your needs.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-3">
                                    <div className="rounded-full bg-green-100 p-1">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Easy to use interface</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="rounded-full bg-green-100 p-1">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">24/7 customer support</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="rounded-full bg-green-100 p-1">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Regular updates and improvements</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default About