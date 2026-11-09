import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import apiClient from "../../api/apiClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
const CompanyProfile = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [employerProfile, setEmployerProfile] = useState([]);
    const [showPreview, setShowPreview] = useState(false);


    const [form, setForm] = useState({ name: "", phone: "", email: "", unit: "" });

    // token for authentication
    const token = localStorage.getItem('auth_token');

    // useEffect to fetch employer data on component mount
    useEffect(() => {
        const fetchEmployerData = async () => {
            try {
                const response = await apiClient.get(`${API_URL}/employer`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEmployerProfile(response.data);
            } catch (error) {
                console.error('Error fetching employer data:', error);
            }
        };

        fetchEmployerData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form); // replace with your API call
        setOpen(false);
        setForm({ name: "", phone: "", email: "", unit: "" });
    };

    const [open, setOpen] = useState(false);
    useEffect(() => {
        try {
            apiClient.get(`${API_URL}/user`);
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

                                <>
                                    <button
                                        onClick={() => setShowPreview(true)}
                                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                                    >
                                        Preview
                                    </button>
                                    <button
                                        onClick={() => setOpen(true)}
                                        className="mx-4 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900"
                                    >
                                        Edit Profile
                                    </button>

                                </>

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

                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#002B5B' }}>About Company</h3>

                            <div>
                                <p className="text-gray-600 mb-4">{profileData.mission}</p>
                                <p className="text-gray-600">{profileData.description}</p>
                            </div>

                        </div>

                        <div className="bg-white rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#002B5B' }}>Contact</h3>

                            <div className="space-y-2">
                                <p className="text-gray-600">Email: {profileData.email}</p>
                                <p className="text-gray-600">Phone: {profileData.phone}</p>
                                <p className="text-gray-600">Website: {profileData.website}</p>
                            </div>

                        </div>

                        <div className="bg-white rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#002B5B' }}>Social Media</h3>

                            <div className="flex space-x-4">
                                <a href={profileData.linkedin} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                    LinkedIn
                                </a>
                                <a href={profileData.twitter} className="px-4 py-2 bg-blue-400 text-white rounded-lg">
                                    Twitter
                                </a>
                            </div>

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
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="right" className="bg-white w-full sm:max-w-md p-0 flex flex-col">
                    <SheetHeader className="px-6 py-4 border-b border-gray-200">
                        <SheetTitle className="text-gray-900 font-semibold text-lg">Add Tenant</SheetTitle>
                    </SheetHeader>

                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto">
                        <div className="flex-1 space-y-5 px-6 py-5">
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full name</Label>
                                <Input
                                    id="name" name="name" value={form.name} onChange={handleChange} required
                                    placeholder="e.g. Jane Wanjiku"
                                    className="h-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
                                    <Input
                                        id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required
                                        placeholder="07XX XXX XXX"
                                        className="h-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="unit" className="text-sm font-medium text-gray-700">Unit</Label>
                                    <Input
                                        id="unit" name="unit" value={form.unit} onChange={handleChange} required
                                        placeholder="e.g. A12"
                                        className="h-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email (optional)</Label>
                                <Input
                                    id="email" name="email" type="email" value={form.email} onChange={handleChange}
                                    placeholder="name@example.com"
                                    className="h-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                            <Button type="button" onClick={() => setOpen(false)}
                                className="flex-1 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
                                Save
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </>
    )
}
export default CompanyProfile;