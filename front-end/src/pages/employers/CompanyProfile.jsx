import React, { useEffect, useState } from "react";

const CompanyProfile = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [employer, setEmployer] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        try {
            axios.get(`${API_URL}/user`);
        }
        catch (err) {

        }
    }
    )

    const [profileData, setProfileData] = useState({
        companyName: 'TechCorp Inc.',
        tagline: 'Building the future of technology',
        industry: 'Technology',
        companySize: '51-200',
        foundedYear: '2015',
        website: 'https://techcorp.com',
        email: 'contact@techcorp.com',
        phone: '+1 (555) 123-4567',
        street: '123 Tech Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        mission: 'To empower businesses through innovative technology solutions.',
        description: 'TechCorp is a leading technology company specializing in software development.',
        workEnvironment: 'Collaborative and innovative workspace',
        coreValues: 'Innovation, Integrity, Collaboration',
        benefits: 'Health insurance, 401k matching, Unlimited PTO',
        linkedin: 'https://linkedin.com/company/techcorp',
        twitter: 'https://twitter.com/techcorp',
        verified: true,
        activeJobs: 12,
        totalHires: 45
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSave = () => {
        setIsEditMode(false);
        alert('Profile updated successfully!');
    };
    const calculateCompletion = () => {
        const fields = [
            profileData.companyName,
            profileData.industry,
            profileData.website,
            profileData.email,
            profileData.description,
            profileData.mission
        ];
        const filled = fields.filter(field => field && field.trim() !== '').length;
        return Math.round((filled / fields.length) * 100);
    };
    const completion = calculateCompletion();

    return (
        <>
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-12 mb-2 flex justify-between items-center">
                        {/* Left section: Home */}
                        <div>
                            <h2 className="text-2xl font-bold" style={{ color: '#002B5B' }}>Company Profile</h2>
                            <p className="text-gray-500 text-sm">Manage your company information</p>
                        </div>

                        {/* Right section: Buttons */}
                        <div class="flex items-center space-x-4">
                            <div className="flex items-center space-x-4">
                                {!isEditMode ? (
                                    <>
                                        <button
                                            onClick={() => setShowPreview(true)}
                                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                                        >
                                            Preview
                                        </button>
                                        <button
                                            onClick={() => setIsEditMode(true)}
                                            className="mx-4 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900"
                                        >
                                            Edit Profile
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setIsEditMode(false)}
                                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg text-sm font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="mx-4 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900"
                                        >
                                            Save
                                        </button>
                                    </>
                                )}
                            </div>
                            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-yellow-500 font-semibold">
                                <b>JS</b>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-8">
                    <div className="max-w-5xl mx-auto">

                        <div className="bg-white rounded-lg p-6 mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-semibold" style={{ color: '#002B5B' }}>Profile Completion</h3>
                                <span className="text-2xl font-bold text-yellow-600">
                                    {completion}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="h-3 rounded-full"
                                    style={{ width: `${completion}%`, backgroundColor: '#FFC107' }}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 mb-6">
                            <div className="flex items-start space-x-6">
                                <div className="w-24 h-24 rounded-lg flex items-center justify-center text-white text-3xl font-bold" style={{ backgroundColor: '#002B5B' }}>
                                    TC
                                </div>
                                <div className="flex-1">
                                    {!isEditMode ? (
                                        <>
                                            <h3 className="text-2xl font-bold mb-2" style={{ color: '#002B5B' }}>
                                                {profileData.companyName}
                                            </h3>
                                            <p className="text-gray-600 mb-3">{profileData.tagline}</p>
                                            <div className="flex gap-4 text-sm text-gray-600">
                                                <span>{profileData.industry}</span>
                                                <span>{profileData.companySize} employees</span>
                                                <span>Founded {profileData.foundedYear}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={profileData.companyName}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border rounded-lg"
                                            />
                                            <input
                                                type="text"
                                                name="tagline"
                                                value={profileData.tagline}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#002B5B' }}>About Company</h3>
                            {!isEditMode ? (
                                <div>
                                    <p className="text-gray-600 mb-4">{profileData.mission}</p>
                                    <p className="text-gray-600">{profileData.description}</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <textarea
                                        name="mission"
                                        value={profileData.mission}
                                        onChange={handleChange}
                                        rows={2}
                                        className="w-full px-4 py-3 border rounded-lg"
                                    />
                                    <textarea
                                        name="description"
                                        value={profileData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 border rounded-lg"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#002B5B' }}>Contact</h3>
                            {!isEditMode ? (
                                <div className="space-y-2">
                                    <p className="text-gray-600">Email: {profileData.email}</p>
                                    <p className="text-gray-600">Phone: {profileData.phone}</p>
                                    <p className="text-gray-600">Website: {profileData.website}</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border rounded-lg"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border rounded-lg"
                                    />
                                    <input
                                        type="url"
                                        name="website"
                                        value={profileData.website}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border rounded-lg"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#002B5B' }}>Social Media</h3>
                            {!isEditMode ? (
                                <div className="flex space-x-4">
                                    <a href={profileData.linkedin} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                        LinkedIn
                                    </a>
                                    <a href={profileData.twitter} className="px-4 py-2 bg-blue-400 text-white rounded-lg">
                                        Twitter
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={profileData.linkedin}
                                        onChange={handleChange}
                                        placeholder="LinkedIn URL"
                                        className="w-full px-4 py-3 border rounded-lg"
                                    />
                                    <input
                                        type="url"
                                        name="twitter"
                                        value={profileData.twitter}
                                        onChange={handleChange}
                                        placeholder="Twitter URL"
                                        className="w-full px-4 py-3 border rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {showPreview && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg mt-9 max-w-4xl w-full max-h-screen overflow-y-auto">
                            <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
                                <h2 className="text-2xl font-bold" style={{ color: '#002B5B' }}>Preview</h2>
                                <button onClick={() => setShowPreview(false)} className="text-gray-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-8">
                                <div className="flex items-start space-x-6 mb-6">
                                    <div className="w-24 h-24 rounded-lg flex items-center justify-center text-white text-3xl font-bold" style={{ backgroundColor: '#002B5B' }}>
                                        TC
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold mb-2" style={{ color: '#002B5B' }}>{profileData.companyName}</h1>
                                        <p className="text-gray-600 mb-2">{profileData.tagline}</p>
                                        <div className="flex gap-3 text-gray-600">
                                            <span>{profileData.industry}</span>
                                            <span>{profileData.companySize} employees</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h3 className="font-semibold text-lg mb-2" style={{ color: '#002B5B' }}>About</h3>
                                    <p className="text-gray-700 mb-4">{profileData.mission}</p>
                                    <p className="text-gray-700">{profileData.description}</p>
                                </div>
                                <div className="mb-6">
                                    <h3 className="font-semibold text-lg mb-2" style={{ color: '#002B5B' }}>Contact</h3>
                                    <p className="text-gray-700">Email: {profileData.email}</p>
                                    <p className="text-gray-700">Phone: {profileData.phone}</p>
                                    <p className="text-gray-700">Website: {profileData.website}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}
export default CompanyProfile;