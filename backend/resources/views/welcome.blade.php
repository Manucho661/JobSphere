<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JobSphere - Tech Jobs Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
        <nav class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center space-x-2">
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                        <i class="fas fa-globe text-white text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold text-gray-800">Job<span class="text-blue-600">Sphere</span></span>
                </div>

                <!-- Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#" class="text-gray-600 hover:text-blue-600 transition">Find Jobs</a>
                    <a href="#" class="text-gray-600 hover:text-blue-600 transition">Companies</a>
                    <a href="#" class="text-gray-600 hover:text-blue-600 transition">Resources</a>
                </div>

                <!-- Auth Buttons -->
                <div class="flex items-center space-x-4">
                    {{-- <a href="{{ route('login') }}" class="text-gray-700 hover:text-blue-600 transition font-medium">Login</a>
                    <a href="{{ route('register') }}" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">Register</a> --}}
                </div>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-5xl md:text-6xl font-bold mb-6">Find Your Dream Tech Job</h1>
                <p class="text-xl md:text-2xl mb-8 text-blue-100">Connect with top tech companies and land your next opportunity</p>
                
                <!-- Quick Search -->
                <div class="bg-white rounded-lg shadow-xl p-2 flex flex-col md:flex-row gap-2">
                    <div class="flex-1 flex items-center px-4 border-r border-gray-200">
                        <i class="fas fa-search text-gray-400 mr-3"></i>
                        <input type="text" placeholder="Job title or keyword" class="w-full py-3 text-gray-700 outline-none">
                    </div>
                    <div class="flex-1 flex items-center px-4 border-r border-gray-200">
                        <i class="fas fa-map-marker-alt text-gray-400 mr-3"></i>
                        <input type="text" placeholder="Location" class="w-full py-3 text-gray-700 outline-none">
                    </div>
                    <button class="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition font-medium">
                        Search Jobs
                    </button>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-3 gap-8 mt-12">
                    <div>
                        <div class="text-4xl font-bold">10K+</div>
                        <div class="text-blue-100">Active Jobs</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold">5K+</div>
                        <div class="text-blue-100">Companies</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold">50K+</div>
                        <div class="text-blue-100">Tech Professionals</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Filter Section -->
    <section class="py-8 bg-white border-b">
        <div class="container mx-auto px-4">
            <div class="flex flex-wrap gap-4 items-center">
                <span class="font-semibold text-gray-700">Filter by:</span>
                
                <!-- Job Type -->
                <select class="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Job Type</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Remote</option>
                </select>

                <!-- Experience Level -->
                <select class="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Experience Level</option>
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                    <option>Lead</option>
                </select>

                <!-- Category -->
                <select class="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Category</option>
                    <option>Frontend Development</option>
                    <option>Backend Development</option>
                    <option>Full Stack</option>
                    <option>DevOps</option>
                    <option>Data Science</option>
                    <option>Mobile Development</option>
                    <option>UI/UX Design</option>
                </select>

                <!-- Salary Range -->
                <select class="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Salary Range</option>
                    <option>$0 - $50K</option>
                    <option>$50K - $100K</option>
                    <option>$100K - $150K</option>
                    <option>$150K+</option>
                </select>

                <button class="ml-auto text-blue-600 hover:text-blue-700 font-medium">
                    <i class="fas fa-redo mr-2"></i>Reset Filters
                </button>
            </div>
        </div>
    </section>

    <!-- Job Listings -->
    <section class="py-12">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-3xl font-bold text-gray-800">Latest Tech Jobs</h2>
                <span class="text-gray-600">Showing 1,234 jobs</span>
            </div>

            <div class="grid gap-6">
                <!-- Job Card 1 -->
                <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 border border-gray-100">
                    <div class="flex items-start justify-between">
                        <div class="flex gap-4">
                            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                G
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-semibold text-gray-800 mb-2">Senior Laravel Developer</h3>
                                <p class="text-gray-600 mb-3">Google Inc.</p>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Full-time</span>
                                    <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Remote</span>
                                    <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Senior Level</span>
                                </div>
                                <p class="text-gray-600 mb-4">We're looking for an experienced Laravel developer to join our team and build scalable web applications...</p>
                                <div class="flex items-center gap-6 text-sm text-gray-500">
                                    <span><i class="fas fa-map-marker-alt mr-2"></i>San Francisco, CA</span>
                                    <span><i class="fas fa-dollar-sign mr-2"></i>$120K - $180K</span>
                                    <span><i class="fas fa-clock mr-2"></i>Posted 2 days ago</span>
                                </div>
                            </div>
                        </div>
                        <button class="text-gray-400 hover:text-red-500 transition">
                            <i class="far fa-heart text-2xl"></i>
                        </button>
                    </div>
                </div>

                <!-- Job Card 2 -->
                <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 border border-gray-100">
                    <div class="flex items-start justify-between">
                        <div class="flex gap-4">
                            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                M
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-semibold text-gray-800 mb-2">Frontend React Developer</h3>
                                <p class="text-gray-600 mb-3">Meta</p>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Full-time</span>
                                    <span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">Hybrid</span>
                                    <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Mid Level</span>
                                </div>
                                <p class="text-gray-600 mb-4">Join our frontend team to build amazing user experiences with React, TypeScript, and modern web technologies...</p>
                                <div class="flex items-center gap-6 text-sm text-gray-500">
                                    <span><i class="fas fa-map-marker-alt mr-2"></i>New York, NY</span>
                                    <span><i class="fas fa-dollar-sign mr-2"></i>$100K - $150K</span>
                                    <span><i class="fas fa-clock mr-2"></i>Posted 5 days ago</span>
                                </div>
                            </div>
                        </div>
                        <button class="text-gray-400 hover:text-red-500 transition">
                            <i class="far fa-heart text-2xl"></i>
                        </button>
                    </div>
                </div>

                <!-- Job Card 3 -->
                <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 border border-gray-100">
                    <div class="flex items-start justify-between">
                        <div class="flex gap-4">
                            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                A
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-semibold text-gray-800 mb-2">DevOps Engineer</h3>
                                <p class="text-gray-600 mb-3">Amazon Web Services</p>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Full-time</span>
                                    <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Remote</span>
                                    <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Senior Level</span>
                                </div>
                                <p class="text-gray-600 mb-4">Looking for a skilled DevOps engineer to manage cloud infrastructure, CI/CD pipelines, and automation...</p>
                                <div class="flex items-center gap-6 text-sm text-gray-500">
                                    <span><i class="fas fa-map-marker-alt mr-2"></i>Seattle, WA</span>
                                    <span><i class="fas fa-dollar-sign mr-2"></i>$130K - $190K</span>
                                    <span><i class="fas fa-clock mr-2"></i>Posted 1 week ago</span>
                                </div>
                            </div>
                        </div>
                        <button class="text-gray-400 hover:text-red-500 transition">
                            <i class="far fa-heart text-2xl"></i>
                        </button>
                    </div>
                </div>

                <!-- Job Card 4 -->
                <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 border border-gray-100">
                    <div class="flex items-start justify-between">
                        <div class="flex gap-4">
                            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                S
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-semibold text-gray-800 mb-2">Full Stack Developer (Node.js + Vue.js)</h3>
                                <p class="text-gray-600 mb-3">Shopify</p>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Full-time</span>
                                    <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Remote</span>
                                    <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Mid Level</span>
                                </div>
                                <p class="text-gray-600 mb-4">Build innovative e-commerce solutions using Node.js, Vue.js, and GraphQL in a collaborative environment...</p>
                                <div class="flex items-center gap-6 text-sm text-gray-500">
                                    <span><i class="fas fa-map-marker-alt mr-2"></i>Toronto, Canada</span>
                                    <span><i class="fas fa-dollar-sign mr-2"></i>$90K - $140K</span>
                                    <span><i class="fas fa-clock mr-2"></i>Posted 3 days ago</span>
                                </div>
                            </div>
                        </div>
                        <button class="text-gray-400 hover:text-red-500 transition">
                            <i class="far fa-heart text-2xl"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Load More -->
            <div class="text-center mt-10">
                <button class="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-medium">
                    Load More Jobs
                </button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <!-- Company Info -->
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                            <i class="fas fa-globe text-white text-xl"></i>
                        </div>
                        <span class="text-xl font-bold text-white">Job<span class="text-blue-400">Sphere</span></span>
                    </div>
                    <p class="text-gray-400 mb-4">Your gateway to the best tech opportunities worldwide.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-blue-400 transition"><i class="fab fa-twitter text-xl"></i></a>
                        <a href="#" class="text-gray-400 hover:text-blue-400 transition"><i class="fab fa-linkedin text-xl"></i></a>
                        <a href="#" class="text-gray-400 hover:text-blue-400 transition"><i class="fab fa-github text-xl"></i></a>
                        <a href="#" class="text-gray-400 hover:text-blue-400 transition"><i class="fab fa-facebook text-xl"></i></a>
                    </div>
                </div>

                <!-- For Job Seekers -->
                <div>
                    <h3 class="text-white font-semibold mb-4">For Job Seekers</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-blue-400 transition">Browse Jobs</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Companies</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Career Advice</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Salary Guide</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Resume Builder</a></li>
                    </ul>
                </div>

                <!-- For Employers -->
                <div>
                    <h3 class="text-white font-semibold mb-4">For Employers</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-blue-400 transition">Post a Job</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Browse Candidates</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Pricing</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Employer Resources</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Hiring Solutions</a></li>
                    </ul>
                </div>

                <!-- Support -->
                <div>
                    <h3 class="text-white font-semibold mb-4">Support</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-blue-400 transition">Help Center</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Contact Us</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Terms of Service</a></li>
                        <li><a href="#" class="hover:text-blue-400 transition">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm">© 2026 JobSphere. All rights reserved.</p>
                <div class="flex gap-6 mt-4 md:mt-0">
                    <a href="#" class="text-gray-400 hover:text-blue-400 transition text-sm">Privacy</a>
                    <a href="#" class="text-gray-400 hover:text-blue-400 transition text-sm">Terms</a>
                    <a href="#" class="text-gray-400 hover:text-blue-400 transition text-sm">Cookies</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>