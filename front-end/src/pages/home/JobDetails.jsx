import apiClient from "../../api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PulsePreloader from "../../components/PulsePreloader";

const JobDetails = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await apiClient.get(`${API_URL}/jobs/${id}`);
                setJob(response.data);
            } catch (err) {
                setError("Failed to fetch job details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    if (loading) return <PulsePreloader />;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!job) return <p>No job found.</p>;


    return (
        <>
            <div class="mt-2 rounded-xl p-8 mb-6">

                <div class="grid md:grid-cols-3 gap-6">
                    {/* <!-- Left: Main Description --> */}
                    <div class="md:col-span-2 bg-white space-y-6 p-4 rounded-xl">
                        <div>

                        </div>
                        <section className="bg-white rounded-2xl p-4 transition-all duration-300 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-[#002b5b] flex items-center gap-2">
                                    {job.jobTitle} at {job.employer?.companyName}
                                </h3>

                                <div className="text-sm text-yellow-900 italic text-right">
                                    <p>
                                        <strong>Posted:</strong>{" "}
                                        {new Date(job.created_at).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                    {job.created_at && (
                                        <p>
                                            <strong>Expires:</strong>{" "}
                                            {new Date(job.created_at).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3 text-gray-700">
                                <p>
                                    <strong>Location:</strong> {job.location}
                                </p>
                                <p>
                                    <strong>Employment Type:</strong> {job.employmentType}
                                </p>
                                <p>
                                    <strong>Category:</strong> {job.category}
                                </p>
                                <p>
                                    <strong>Experience Level:</strong> {job.experienceLevel}
                                </p>
                                <p>
                                    <strong>Salary:</strong> Ksh {job.minSalary} - Ksh {job.maxSalary}
                                </p>
                            </div>
                        </section>

                        {/* <!-- Job Description --> */}
                        <section class="bg-gray-100 rounded-xl p-6">
                            <h6 class="text-xl font-bold mb-4 items-center gap-2">

                                Job Description
                            </h6>
                            <p className="text-gray-700 leading-relaxed">{job.description}</p>

                        </section>

                        {/* <!-- Responsibilities --> */}
                        <section class="bg-gray-100 rounded-xl p-6">
                            <h2 className="font-semibold text-lg mb-2 text-primary">Responsibilities</h2>
                            <div class="space-y-4">
                                <div>

                                    {job.responsibilities?.length > 0 && (
                                        <div>

                                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                                {job.responsibilities.map((q) => (
                                                    <li key={q.id}>{q.responsibility}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* <!-- Qualifications --> */}
                        <section class="bg-gray-100 rounded-xl p-6">
                            <h2 className="font-semibold text-lg mb-2 text-primary">Qualifications</h2>
                            <div class="space-y-4">
                                <div>

                                    {job.qualifications?.length > 0 && (
                                        <div>

                                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                                {job.qualifications.map((q) => (
                                                    <li key={q.id}>{q.qualification}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="mt-6">
                                <div className="font-semibold mb-2">How to Apply</div>
                                <p className="text-gray-700 leading-relaxed">
                                    Interested candidates should send their CV and portfolio to{" "}
                                    <a
                                        href="mailto:careers@pixelytetech.com"
                                        className="text-blue-600 hover:underline"
                                    >
                                        careers@pixelytetech.com
                                    </a>{" "}
                                    with the subject line{" "}
                                    <strong>"Application for Front-End Developer – Nairobi"</strong>. Applications will be reviewed on a rolling basis. Early applicants will be given priority.
                                </p>
                            </div>
                        </section>
                    </div>

                    <aside class="space-y-6">
                        <div class="rounded-xl p-0">
                            <button class="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900">
                                <b>Check how your CV aligns with this Job</b>
                            </button>
                        </div>
                        <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h4 class="font-semibold text-primary mb-3 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                                Tips for a Great Job Application
                            </h4>
                            <ul class="space-y-2 text-sm text-gray-700">
                                <li>• Tailor your resume and cover letter to match each specific job description.</li>
                                <li>• Start with a clear, concise summary that highlights your key strengths.</li>
                                <li>• Use action verbs and measurable results to describe your achievements.</li>
                                <li>• Research the company — mention what excites you about their mission or culture.</li>
                                <li>• Double-check spelling, grammar, and formatting before submitting.</li>
                                <li>• Include only relevant experience and remove outdated or unrelated details.</li>
                                <li>• Keep your application concise — recruiters scan quickly, so make impact fast.</li>
                                <li>• If applicable, attach a strong portfolio or project links to showcase your skills.</li>
                                <li>• Follow up politely after a week or two if you haven’t heard back.</li>
                                <li>• Be confident and authentic — show enthusiasm for the opportunity.</li>
                            </ul>
                        </div>
                        <div>
                            <h3><b>Similar Opportunities</b></h3>
                            <div className="job-row mb-1 flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-white">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-3">
                                        <h4 class="font-semibold text-primary">DevOps Engineer</h4>
                                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                                    </div>
                                    <p class="text-sm text-gray-500 mt-1">New York, NY • Full-time • Posted 1 week ago</p>
                                    <div class="flex items-center mt-2 space-x-4">
                                        <span class="text-sm text-gray-600">👁️ 1,124 views</span>
                                        <span class="text-sm text-gray-600">🔗 98 clicks</span>
                                        <span class="text-sm text-gray-600">📅 Expires in 23 days</span>
                                    </div>
                                </div>
                            </div>
                            <div className="job-row mb-1 flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-white">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-3">
                                        <h4 class="font-semibold text-primary">DevOps Engineer</h4>
                                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                                    </div>
                                    <p class="text-sm text-gray-500 mt-1">New York, NY • Full-time • Posted 1 week ago</p>
                                    <div class="flex items-center mt-2 space-x-4">
                                        <span class="text-sm text-gray-600">👁️ 1,124 views</span>
                                        <span class="text-sm text-gray-600">🔗 98 clicks</span>
                                        <span class="text-sm text-gray-600">📅 Expires in 23 days</span>
                                    </div>
                                </div>
                            </div>
                            <div className="job-row mb-1 flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-3">
                                        <h4 class="font-semibold text-primary">DevOps Engineer</h4>
                                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                                    </div>
                                    <p class="text-sm text-gray-500 mt-1">New York, NY • Full-time • Posted 1 week ago</p>
                                    <div class="flex items-center mt-2 space-x-4">
                                        <span class="text-sm text-gray-600">👁️ 1,124 views</span>
                                        <span class="text-sm text-gray-600">🔗 98 clicks</span>
                                        <span class="text-sm text-gray-600">📅 Expires in 23 days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h4 class="font-semibold text-primary mb-3 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                                Note
                            </h4>
                            <p className="space-y-2 text-sm text-gray-700"> <i>JobSphere relies on <b>Donations</b> to run its activities and keep you updated about new opportunities, you can channel your contribution of any amount by clicking the  donate button below :-</i> </p>
                            <div className='Donation flex'>
                                <div className='flex items-center'> Your yearly donations <span className='mx-4'><b>KSH 0</b></span></div>
                                {""} {""}
                                <button className='mx-4 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900'> <b>Donate</b> </button>
                            </div>
                        </div>
                    </aside>
                    {/* <!-- Optional Sidebar --> */}
                </div>
            </div>
        </>
    )
}
export default JobDetails