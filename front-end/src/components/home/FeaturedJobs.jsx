import React, { useState, useEffect, useRef } from "react";
import apiClient from "../../api/apiClient";


const FeaturedJobs = () => {
    // api variable
    const API_URL = import.meta.env.VITE_API_URL;

    // states
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [featuredJobs, setFeaturedJobs] = useState([]);

    

    return (
        <div className="rounded-lg p-8">
            <h4 className="text-2xl"><b>Featured Jobs</b></h4>

            <div className="flex justify-center gap-12">
                <ul className="space-y-4">
                    {featuredJobs?.data?.length === 0 ? (
                        <li className="flex items-start group">
                            <span className="mr-3 mt-1 flex-shrink-0">
                                <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <a href="#" className="transition-colors duration-200 hover:underline"
                                style={{ color: hoveredIndex === 'job3' ? '#FFC107' : '#002B5B', transform: hoveredIndex === 'job3' ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.2s' }}
                                onMouseEnter={() => setHoveredIndex('job3')}
                                onMouseLeave={() => setHoveredIndex(null)}>
                                Software Engineer at chwele
                            </a>
                        </li>

                    ) : (FeaturedJobs?.data?.map((job) => (
                        <div key={job.id} className="bg-white rounded-lg p-2 mb-4">yoyo</div>
                    )))
                    }
                </ul>
                <ul className="space-y-4">
                    <li className="flex items-start group">
                        <span className="mr-3 mt-1 flex-shrink-0">
                            <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <a href="#" className="transition-colors duration-200 hover:underline"
                            style={{ color: hoveredIndex === 'job6' ? '#FFC107' : '#002B5B', transform: hoveredIndex === 'job6' ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.2s' }}
                            onMouseEnter={() => setHoveredIndex('job6')}
                            onMouseLeave={() => setHoveredIndex(null)}>
                            Software Engineer at chwele
                        </a>
                    </li>
                    <li className="flex items-start group">
                        <span className="mr-3 mt-1 flex-shrink-0">
                            <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <a href="#" className="transition-colors duration-200 hover:underline"
                            style={{ color: hoveredIndex === 'job7' ? '#FFC107' : '#002B5B', transform: hoveredIndex === 'job7' ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.2s' }}
                            onMouseEnter={() => setHoveredIndex('job7')}
                            onMouseLeave={() => setHoveredIndex(null)}>
                            Software Engineer at chwele
                        </a>
                    </li>
                    <li className="flex items-start group">
                        <span className="mr-3 mt-1 flex-shrink-0">
                            <svg className="w-5 h-5" fill="#FFC107" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <a href="#" className="transition-colors duration-200 hover:underline"
                            style={{ color: hoveredIndex === 'job8' ? '#FFC107' : '#002B5B', transform: hoveredIndex === 'job8' ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.2s' }}
                            onMouseEnter={() => setHoveredIndex('job8')}
                            onMouseLeave={() => setHoveredIndex(null)}>
                            Software Engineer at chwele
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default FeaturedJobs;