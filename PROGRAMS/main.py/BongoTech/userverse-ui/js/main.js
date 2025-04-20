// Main JavaScript file for Userverse UI Quest

document.addEventListener('DOMContentLoaded', () => {
    // Initialize application
    initApp();
});

// Global state
const state = {
    darkMode: false,
    currentPage: 'signin', // Default page
    user: null
};

// Pages configuration
const pages = {
    signin: {
        render: renderSignIn,
        title: 'Sign In'
    },
    signup: {
        render: renderSignUp,
        title: 'Sign Up'
    },
    profile: {
        render: renderProfile,
        title: 'Profile'
    },
    settings: {
        render: renderSettings,
        title: 'Settings'
    },
    userpanel: {
        render: renderUserPanel,
        title: 'User Panel'
    }
};

// Initialize application
function initApp() {
    // Check if dark mode is enabled
    if (document.body.classList.contains('dark-mode')) {
        state.darkMode = true;
    }
    
    // Load initial page
    navigateTo(state.currentPage);

    // Register service worker for PWA if needed
    // registerServiceWorker();
}

// Navigation function
function navigateTo(pageName) {
    if (!pages[pageName]) {
        console.error(`Page ${pageName} not found`);
        return;
    }

    // Update current page
    state.currentPage = pageName;
    
    // Show loading indicator
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="flex justify-center items-center h-full">
            <div class="spinner"></div>
        </div>
    `;
    
    // Render page with delay for transition effect
    setTimeout(() => {
        pageContent.innerHTML = '';
        pages[pageName].render(pageContent);

        // Update feather icons
        feather.replace();
    }, 300);
}

// Sign In page renderer
function renderSignIn(container) {
    const signInHTML = `
        <div class="flex flex-col items-center justify-center animate-fade-in">
            <div class="w-full text-center mb-8">
                <div class="inline-block rounded-full bg-indigo-100 p-3 mb-2">
                    <i data-feather="user" class="h-8 w-8 text-indigo-600"></i>
                </div>
                <h1 class="text-3xl font-bold text-center text-gray-800">Welcome Back</h1>
                <p class="text-gray-500 mt-2">Sign in to continue to your account</p>
            </div>
            
            <form id="signin-form" class="w-full animate-slide-up">
                <div class="floating-label mb-6">
                    <input class="input-focus" id="email" type="email" placeholder=" ">
                    <label for="email">Email</label>
                    <p class="text-red-500 text-xs italic hidden mt-1" id="email-error">Please enter a valid email address.</p>
                </div>
                
                <div class="floating-label mb-4">
                    <input class="input-focus" id="password" type="password" placeholder=" ">
                    <label for="password">Password</label>
                    <p class="text-red-500 text-xs italic hidden mt-1" id="password-error">Password must be at least 6 characters.</p>
                </div>
                
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center">
                        <input id="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>
                    <div>
                        <a href="#" class="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Forgot password?</a>
                    </div>
                </div>
                
                <div class="mb-8">
                    <button id="signin-button" type="button" class="btn-hover-effect w-full bg-gradient-primary text-white font-medium py-3 px-4 rounded-xl transition-all focus:outline-none shadow-lg">
                        <span id="signin-text" class="flex items-center justify-center">
                            <i data-feather="log-in" class="h-5 w-5 mr-2"></i>
                            Sign In
                        </span>
                        <span id="signin-loading" class="hidden flex items-center justify-center">
                            <div class="spinner inline-block mr-2"></div>
                            Signing in...
                        </span>
                    </button>
                </div>
                
                <div class="text-center relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-200"></div>
                    </div>
                    <div class="relative flex justify-center">
                        <span class="px-4 bg-white text-sm text-gray-500 dark-mode-bg">Don't have an account?</span>
                    </div>
                </div>
                
                <div class="mt-6 text-center">
                    <a href="#" id="goto-signup" class="inline-block btn-hover-effect bg-white border border-indigo-500 text-indigo-600 font-medium py-3 px-6 rounded-xl transition-all focus:outline-none shadow-md hover:bg-indigo-50">
                        Create an Account
                    </a>
                </div>
            </form>
        </div>
    `;
    
    container.innerHTML = signInHTML;
    
    // Attach event listeners
    document.getElementById('goto-signup').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('signup');
    });
    
    document.getElementById('signin-button').addEventListener('click', (e) => {
        e.preventDefault();
        handleSignIn();
    });
    
    // Add dark mode specific class if needed
    if (state.darkMode) {
        document.querySelectorAll('.dark-mode-bg').forEach(el => {
            el.classList.remove('bg-white');
            el.classList.add('bg-gray-900');
        });
    }
}

// Sign Up page renderer
function renderSignUp(container) {
    const signUpHTML = `
        <div class="flex flex-col items-center justify-center animate-fade-in">
            <div class="w-full text-center mb-8">
                <div class="inline-block rounded-full bg-indigo-100 p-3 mb-2">
                    <i data-feather="user-plus" class="h-8 w-8 text-indigo-600"></i>
                </div>
                <h1 class="text-3xl font-bold text-center text-gray-800">Create Account</h1>
                <p class="text-gray-500 mt-2">Join Userverse today</p>
            </div>
            
            <form id="signup-form" class="w-full animate-slide-up">
                <div class="floating-label mb-4">
                    <input class="input-focus" id="fullname" type="text" placeholder=" ">
                    <label for="fullname">Full Name</label>
                    <p class="text-red-500 text-xs italic hidden mt-1" id="fullname-error">Please enter your full name.</p>
                </div>
                
                <div class="floating-label mb-4">
                    <input class="input-focus" id="signup-email" type="email" placeholder=" ">
                    <label for="signup-email">Email</label>
                    <p class="text-red-500 text-xs italic hidden mt-1" id="signup-email-error">Please enter a valid email address.</p>
                </div>
                
                <div class="floating-label mb-4">
                    <input class="input-focus" id="signup-password" type="password" placeholder=" ">
                    <label for="signup-password">Password</label>
                    <p class="text-red-500 text-xs italic hidden mt-1" id="signup-password-error">Password must be at least 6 characters.</p>
                </div>
                
                <div class="floating-label mb-6">
                    <input class="input-focus" id="confirm-password" type="password" placeholder=" ">
                    <label for="confirm-password">Confirm Password</label>
                    <p class="text-red-500 text-xs italic hidden mt-1" id="confirm-password-error">Passwords do not match.</p>
                </div>
                
                <div class="mb-6">
                    <div class="flex items-center">
                        <input id="terms" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                        <label for="terms" class="ml-2 block text-sm text-gray-700">
                            I agree to the <a href="#" class="text-indigo-600 hover:text-indigo-800">Terms of Service</a> and <a href="#" class="text-indigo-600 hover:text-indigo-800">Privacy Policy</a>
                        </label>
                    </div>
                    <p class="text-red-500 text-xs italic hidden mt-1" id="terms-error">You must agree to the terms to continue.</p>
                </div>
                
                <div class="mb-8">
                    <button id="signup-button" type="button" class="btn-hover-effect w-full bg-gradient-primary text-white font-medium py-3 px-4 rounded-xl transition-all focus:outline-none shadow-lg">
                        <span id="signup-text" class="flex items-center justify-center">
                            <i data-feather="user-plus" class="h-5 w-5 mr-2"></i>
                            Sign Up
                        </span>
                        <span id="signup-loading" class="hidden flex items-center justify-center">
                            <div class="spinner inline-block mr-2"></div>
                            Creating account...
                        </span>
                    </button>
                </div>
                
                <div class="text-center relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-200"></div>
                    </div>
                    <div class="relative flex justify-center">
                        <span class="px-4 bg-white text-sm text-gray-500 dark-mode-bg">Already have an account?</span>
                    </div>
                </div>
                
                <div class="mt-6 text-center">
                    <a href="#" id="goto-signin" class="inline-block btn-hover-effect bg-white border border-indigo-500 text-indigo-600 font-medium py-3 px-6 rounded-xl transition-all focus:outline-none shadow-md hover:bg-indigo-50">
                        Sign In
                    </a>
                </div>
            </form>
        </div>
    `;
    
    container.innerHTML = signUpHTML;
    
    // Attach event listeners
    document.getElementById('goto-signin').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('signin');
    });
    
    document.getElementById('signup-button').addEventListener('click', (e) => {
        e.preventDefault();
        handleSignUp();
    });
    
    // Add dark mode specific class if needed
    if (state.darkMode) {
        document.querySelectorAll('.dark-mode-bg').forEach(el => {
            el.classList.remove('bg-white');
            el.classList.add('bg-gray-900');
        });
    }
}

// Profile page renderer
function renderProfile(container) {
    // Mock user data
    const user = {
        name: 'Andrew Ainsley',
        email: 'andrew_ainsley@example.com',
        phone: '+1 111 467 378 399',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    };
    
    const profileHTML = `
        <div class="animate-fade-in">
            <div class="relative mb-24">
                <!-- Profile Header Background -->
                <div class="absolute top-0 left-0 w-full h-40 bg-gradient-primary rounded-b-3xl"></div>
                
                <!-- Back Button & Settings Button -->
                <div class="relative pt-4 px-4 flex justify-between items-center">
                    <button id="back-to-signin" class="p-2 bg-white rounded-full text-gray-700 shadow-md hover:shadow-lg transition-all focus:outline-none">
                        <i data-feather="arrow-left" class="h-5 w-5"></i>
                    </button>
                    <button id="goto-settings" class="p-2 bg-white rounded-full text-gray-700 shadow-md hover:shadow-lg transition-all focus:outline-none">
                        <i data-feather="settings" class="h-5 w-5"></i>
                    </button>
                </div>
                
                <!-- Avatar -->
                <div class="flex justify-center">
                    <div class="relative mt-12 mb-4">
                        <div class="avatar-upload">
                            <img src="${user.avatar}" alt="Profile" class="h-28 w-28 rounded-full object-cover border-4 border-white shadow-xl">
                            <div class="avatar-overlay">
                                <i data-feather="camera" class="h-8 w-8"></i>
                            </div>
                            <input type="file" class="absolute inset-0 opacity-0" accept="image/*" id="avatar-upload">
                        </div>
                    </div>
                </div>
                
                <!-- User Name -->
                <div class="text-center">
                    <h2 class="text-2xl font-bold text-gray-800">${user.name}</h2>
                    <p class="text-gray-500">${user.phone}</p>
                </div>
            </div>
            
            <!-- Stats Cards -->
            <div class="px-4 mb-8">
                <div class="flex justify-between space-x-4">
                    <div class="flex-1 card-hover bg-white rounded-xl shadow-md p-4 text-center">
                        <span class="block text-gray-500 text-sm mb-1">Points</span>
                        <span class="block text-2xl font-bold text-gray-800">145</span>
                    </div>
                    <div class="flex-1 card-hover bg-white rounded-xl shadow-md p-4 text-center">
                        <span class="block text-gray-500 text-sm mb-1">Level</span>
                        <span class="block text-2xl font-bold text-gray-800">4</span>
                    </div>
                    <div class="flex-1 card-hover bg-white rounded-xl shadow-md p-4 text-center">
                        <span class="block text-gray-500 text-sm mb-1">Tasks</span>
                        <span class="block text-2xl font-bold text-gray-800">12</span>
                    </div>
                </div>
            </div>
            
            <!-- Profile Form -->
            <form id="profile-form" class="animate-slide-up px-4">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
                
                <div class="floating-label mb-4">
                    <input class="input-focus" id="profile-name" type="text" value="${user.name}" placeholder=" ">
                    <label for="profile-name">Full Name</label>
                </div>
                
                <div class="floating-label mb-4">
                    <input class="input-focus" id="profile-email" type="email" value="${user.email}" placeholder=" ">
                    <label for="profile-email">Email</label>
                </div>
                
                <div class="floating-label mb-6">
                    <input class="input-focus" id="profile-phone" type="tel" value="${user.phone}" placeholder=" ">
                    <label for="profile-phone">Phone</label>
                </div>
                
                <div class="mb-8">
                    <button id="profile-update-button" type="button" class="btn-hover-effect w-full bg-gradient-primary text-white font-medium py-3 px-4 rounded-xl transition-all focus:outline-none shadow-lg">
                        Update Profile
                    </button>
                </div>
            </form>
            
            <!-- Quick Actions -->
            <div class="px-4 pt-4 pb-8 border-t border-gray-200">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                
                <div class="space-y-3">
                    <button id="goto-userpanel" class="w-full card-hover-subtle bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between text-gray-700 transition-all">
                        <span class="flex items-center">
                            <i data-feather="users" class="h-5 w-5 mr-3 text-indigo-500"></i>
                            User Panel
                        </span>
                        <i data-feather="chevron-right" class="h-5 w-5 text-gray-400"></i>
                    </button>
                    
                    <button class="w-full card-hover-subtle bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between text-gray-700 transition-all">
                        <span class="flex items-center">
                            <i data-feather="bell" class="h-5 w-5 mr-3 text-indigo-500"></i>
                            Notifications
                            <span class="ml-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full">3</span>
                        </span>
                        <i data-feather="chevron-right" class="h-5 w-5 text-gray-400"></i>
                    </button>
                    
                    <button class="w-full card-hover-subtle bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between text-gray-700 transition-all">
                        <span class="flex items-center">
                            <i data-feather="shield" class="h-5 w-5 mr-3 text-indigo-500"></i>
                            Privacy & Security
                        </span>
                        <i data-feather="chevron-right" class="h-5 w-5 text-gray-400"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = profileHTML;
    
    // Attach event listeners
    document.getElementById('back-to-signin').addEventListener('click', () => {
        navigateTo('signin');
    });
    
    document.getElementById('goto-settings').addEventListener('click', () => {
        navigateTo('settings');
    });
    
    document.getElementById('goto-userpanel').addEventListener('click', () => {
        navigateTo('userpanel');
    });
    
    document.getElementById('profile-update-button').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show success message
        const button = document.getElementById('profile-update-button');
        const originalText = button.innerText;
        
        button.innerHTML = '<i data-feather="check" class="h-5 w-5 mr-1"></i> Updated Successfully';
        feather.replace();
        button.classList.remove('bg-gradient-primary');
        button.classList.add('bg-gradient-success');
        
        setTimeout(() => {
            button.innerText = originalText;
            button.classList.add('bg-gradient-primary');
            button.classList.remove('bg-gradient-success');
        }, 2000);
    });
    
    // Handle avatar upload
    document.getElementById('avatar-upload').addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const avatarImg = document.querySelector('.avatar-upload img');
                avatarImg.src = e.target.result;
                
                // Show success toast
                showToast('Profile picture updated successfully!', 'success');
            }
            
            reader.readAsDataURL(this.files[0]);
        }
    });
}

// Create toast notification function
function showToast(message, type = 'info') {
    // Remove any existing toasts
    const existingToast = document.getElementById('toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down';
    
    // Set toast color based on type
    let bgColor, icon;
    switch(type) {
        case 'success':
            bgColor = 'bg-green-500';
            icon = 'check-circle';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            icon = 'alert-circle';
            break;
        case 'warning':
            bgColor = 'bg-yellow-500';
            icon = 'alert-triangle';
            break;
        default:
            bgColor = 'bg-blue-500';
            icon = 'info';
    }
    
    // Set toast content
    toast.innerHTML = `
        <div class="${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
            <i data-feather="${icon}" class="h-5 w-5 mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add toast to the DOM
    document.body.appendChild(toast);
    feather.replace();
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('animate-slide-down');
        toast.classList.add('animate-slide-up');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Settings page renderer
function renderSettings(container) {
    const settingsHTML = `
        <div class="animate-fade-in">
            <div class="relative mb-16">
                <div class="absolute top-0 left-0 w-full h-28 bg-gradient-secondary rounded-b-3xl"></div>
                
                <div class="relative pt-4 px-4 flex justify-between items-center">
                    <button id="back-to-profile" class="p-2 bg-white rounded-full text-gray-700 shadow-md hover:shadow-lg transition-all focus:outline-none">
                        <i data-feather="arrow-left" class="h-5 w-5"></i>
                    </button>
                    <h1 class="text-xl font-bold text-white">Settings</h1>
                    <div class="w-10"></div> <!-- Spacer for alignment -->
                </div>
            </div>
            
            <div class="px-4">
                <!-- Theme Settings -->
                <div class="mb-8">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Appearance</h3>
                    
                    <div class="card-hover bg-white rounded-xl p-4 shadow-md mb-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="rounded-full bg-indigo-100 p-2 mr-3">
                                    <i data-feather="moon" class="h-5 w-5 text-indigo-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-medium text-gray-800">Dark Mode</h4>
                                    <p class="text-sm text-gray-500">Toggle light/dark theme</p>
                                </div>
                            </div>
                            <div class="toggle-switch">
                                <input type="checkbox" id="theme-toggle" ${state.darkMode ? 'checked' : ''}>
                                <label for="theme-toggle"></label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-hover bg-white rounded-xl p-4 shadow-md">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="rounded-full bg-purple-100 p-2 mr-3">
                                    <i data-feather="layout" class="h-5 w-5 text-purple-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-medium text-gray-800">Compact Mode</h4>
                                    <p class="text-sm text-gray-500">Reduce spacing in UI</p>
                                </div>
                            </div>
                            <div class="toggle-switch">
                                <input type="checkbox" id="compact-toggle">
                                <label for="compact-toggle"></label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Notification Settings -->
                <div class="mb-8">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Notifications</h3>
                    
                    <div class="card-hover bg-white rounded-xl p-4 shadow-md space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="rounded-full bg-blue-100 p-2 mr-3">
                                    <i data-feather="bell" class="h-5 w-5 text-blue-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-medium text-gray-800">Push Notifications</h4>
                                    <p class="text-sm text-gray-500">Receive alerts on your device</p>
                                </div>
                            </div>
                            <div class="toggle-switch">
                                <input type="checkbox" id="push-toggle" checked>
                                <label for="push-toggle"></label>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="rounded-full bg-blue-100 p-2 mr-3">
                                    <i data-feather="mail" class="h-5 w-5 text-blue-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-medium text-gray-800">Email Notifications</h4>
                                    <p class="text-sm text-gray-500">Receive emails for updates</p>
                                </div>
                            </div>
                            <div class="toggle-switch">
                                <input type="checkbox" id="email-toggle" checked>
                                <label for="email-toggle"></label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Privacy Settings -->
                <div class="mb-8">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Privacy & Security</h3>
                    
                    <div class="space-y-3">
                        <button class="w-full card-hover-subtle bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-center justify-between text-gray-700 transition-all">
                            <span class="flex items-center">
                                <div class="rounded-full bg-red-100 p-2 mr-3">
                                    <i data-feather="lock" class="h-5 w-5 text-red-600"></i>
                                </div>
                                <div class="text-left">
                                    <h4 class="font-medium text-gray-800">Change Password</h4>
                                    <p class="text-sm text-gray-500">Update your password</p>
                                </div>
                            </span>
                            <i data-feather="chevron-right" class="h-5 w-5 text-gray-400"></i>
                        </button>
                        
                        <button class="w-full card-hover-subtle bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-center justify-between text-gray-700 transition-all">
                            <span class="flex items-center">
                                <div class="rounded-full bg-green-100 p-2 mr-3">
                                    <i data-feather="shield" class="h-5 w-5 text-green-600"></i>
                                </div>
                                <div class="text-left">
                                    <h4 class="font-medium text-gray-800">Two-Factor Auth</h4>
                                    <p class="text-sm text-gray-500">Add extra security layer</p>
                                </div>
                            </span>
                            <i data-feather="chevron-right" class="h-5 w-5 text-gray-400"></i>
                        </button>
                        
                        <button class="w-full card-hover-subtle bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-center justify-between text-gray-700 transition-all">
                            <span class="flex items-center">
                                <div class="rounded-full bg-yellow-100 p-2 mr-3">
                                    <i data-feather="eye-off" class="h-5 w-5 text-yellow-600"></i>
                                </div>
                                <div class="text-left">
                                    <h4 class="font-medium text-gray-800">Privacy Controls</h4>
                                    <p class="text-sm text-gray-500">Manage your data</p>
                                </div>
                            </span>
                            <i data-feather="chevron-right" class="h-5 w-5 text-gray-400"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Logout Button -->
                <div class="mt-12 mb-8">
                    <button id="logout-button" class="w-full btn-hover-effect bg-white border border-red-500 text-red-600 font-medium py-3 px-4 rounded-xl transition-all focus:outline-none shadow-md flex items-center justify-center">
                        <i data-feather="log-out" class="h-5 w-5 mr-2"></i>
                        Logout
                    </button>
                </div>
                
                <div class="text-center text-gray-500 text-sm pb-8">
                    <p>App Version 1.0.0</p>
                    <p class="mt-1">© 2023 Userverse. All rights reserved.</p>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = settingsHTML;
    
    // Attach event listeners
    document.getElementById('back-to-profile').addEventListener('click', () => {
        navigateTo('profile');
    });
    
    document.getElementById('theme-toggle').addEventListener('change', (e) => {
        toggleDarkMode(e.target.checked);
    });
    
    document.getElementById('logout-button').addEventListener('click', () => {
        // Show confirmation dialog
        if (confirm('Are you sure you want to logout?')) {
            // Reset user state
            state.user = null;
            // Navigate to signin
            navigateTo('signin');
        }
    });
}

// User Panel page renderer
function renderUserPanel(container) {
    // Mock users data
    const users = [
        { id: 1, name: 'Andrew Ainsley', email: 'andrew_ainsley@example.com', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', active: true },
        { id: 2, name: 'Sarah Miller', email: 'sarah.miller@example.com', role: 'User', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', active: true },
        { id: 3, name: 'Michael Johnson', email: 'mjohnson@example.com', role: 'Editor', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', active: false },
        { id: 4, name: 'Emily Parker', email: 'emily.p@example.com', role: 'User', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', active: true },
        { id: 5, name: 'David Wilson', email: 'davidw@example.com', role: 'User', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80', active: true }
    ];
    
    // Create user cards HTML
    const userCardsHTML = users.map(user => `
        <div data-user-id="${user.id}" class="user-card animate-fade-in card-hover bg-white rounded-xl shadow-md overflow-hidden mb-4">
            <div class="flex items-center justify-between p-4">
                <div class="flex items-center flex-1 overflow-hidden">
                    <div class="relative flex-shrink-0">
                        <img src="${user.avatar}" alt="${user.name}" class="h-14 w-14 rounded-full object-cover border-2 ${user.active ? 'border-green-400' : 'border-gray-300'}">
                        <div class="absolute bottom-0 right-0 h-3 w-3 rounded-full ${user.active ? 'bg-green-400' : 'bg-gray-300'} ring-2 ring-white"></div>
                    </div>
                    <div class="ml-4 min-w-0 overflow-hidden flex-1">
                        <h3 class="font-medium text-gray-800">${user.name}</h3>
                        <p class="text-sm text-gray-500 truncate">${user.email}</p>
                    </div>
                </div>
                <div class="flex items-center ml-2 flex-shrink-0">
                    <span class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded whitespace-nowrap mr-2">
                        ${user.role}
                    </span>
                    <button class="user-menu-btn text-gray-500 hover:text-gray-800 focus:outline-none p-1" data-user-id="${user.id}">
                        <i data-feather="more-vertical" class="h-5 w-5"></i>
                    </button>
                </div>
            </div>
            <div class="user-actions hidden bg-gray-50 border-t border-gray-100 grid grid-cols-3 divide-x divide-gray-100 transition-all">
                <button class="view-user-btn p-2 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all">
                    <i data-feather="eye" class="h-4 w-4 mr-1"></i>
                    <span class="text-sm">View</span>
                </button>
                <button class="edit-user-btn p-2 flex items-center justify-center text-green-600 hover:bg-green-50 transition-all">
                    <i data-feather="edit-2" class="h-4 w-4 mr-1"></i>
                    <span class="text-sm">Edit</span>
                </button>
                <button class="delete-user-btn p-2 flex items-center justify-center text-red-600 hover:bg-red-50 transition-all">
                    <i data-feather="trash-2" class="h-4 w-4 mr-1"></i>
                    <span class="text-sm">Delete</span>
                </button>
            </div>
        </div>
    `).join('');
    
    const userPanelHTML = `
        <div class="animate-fade-in">
            <div class="relative mb-6">
                <div class="absolute top-0 left-0 w-full h-28 bg-gradient-primary rounded-b-3xl"></div>
                
                <div class="relative pt-4 px-4 flex justify-between items-center">
                    <button id="back-to-profile" class="p-2 bg-white rounded-full text-gray-700 shadow-md hover:shadow-lg transition-all focus:outline-none">
                        <i data-feather="arrow-left" class="h-5 w-5"></i>
                    </button>
                    <h1 class="text-xl font-bold text-white">User Management</h1>
                    <button id="add-user-btn" class="p-2 bg-white rounded-full text-gray-700 shadow-md hover:shadow-lg transition-all focus:outline-none">
                        <i data-feather="user-plus" class="h-5 w-5"></i>
                    </button>
                </div>
                
                <!-- Search Bar -->
                <div class="relative mx-4 mt-10">
                    <div class="search-bar-container bg-white rounded-xl shadow-lg overflow-hidden">
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i data-feather="search" class="h-5 w-5 text-gray-400"></i>
                            </div>
                            <input id="search-users" type="text" placeholder="Search users..." class="block w-full pl-10 pr-10 py-3 border-none focus:outline-none focus:ring-0">
                            <button id="clear-search" class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 hidden">
                                <i data-feather="x" class="h-5 w-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- User Stats -->
            <div class="px-4 mb-6">
                <div class="flex justify-between space-x-4">
                    <div class="flex-1 card-hover bg-white rounded-xl shadow-md p-3 text-center">
                        <span class="block text-gray-500 text-xs mb-1">Total Users</span>
                        <span class="block text-xl font-bold text-gray-800">${users.length}</span>
                    </div>
                    <div class="flex-1 card-hover bg-white rounded-xl shadow-md p-3 text-center">
                        <span class="block text-gray-500 text-xs mb-1">Active</span>
                        <span class="block text-xl font-bold text-green-500">${users.filter(u => u.active).length}</span>
                    </div>
                    <div class="flex-1 card-hover bg-white rounded-xl shadow-md p-3 text-center">
                        <span class="block text-gray-500 text-xs mb-1">Inactive</span>
                        <span class="block text-xl font-bold text-red-500">${users.filter(u => !u.active).length}</span>
                    </div>
                </div>
            </div>
            
            <!-- Filters -->
            <div class="px-4 mb-6 flex justify-between items-center">
                <h2 class="text-lg font-bold text-gray-800">User List</h2>
                <div class="flex space-x-2">
                    <div class="relative">
                        <button id="filter-dropdown-btn" class="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none hover:bg-gray-50 transition-colors">
                            <i data-feather="filter" class="h-4 w-4 mr-1 text-gray-500"></i>
                            <span>Filter</span>
                            <i data-feather="chevron-down" class="h-4 w-4 ml-1 text-gray-500"></i>
                        </button>
                        <div id="filter-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1 text-sm text-gray-700">
                            <div class="px-4 py-2 border-b border-gray-100">
                                <p class="font-medium">Filter by Status</p>
                            </div>
                            <div class="py-1">
                                <a href="#" class="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">All Users</a>
                                <a href="#" class="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Active</a>
                                <a href="#" class="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Inactive</a>
                            </div>
                            <div class="px-4 py-2 border-t border-b border-gray-100">
                                <p class="font-medium">Filter by Role</p>
                            </div>
                            <div class="py-1">
                                <a href="#" class="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">All Roles</a>
                                <a href="#" class="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Admin</a>
                                <a href="#" class="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">Editor</a>
                                <a href="#" class="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700">User</a>
                            </div>
                        </div>
                    </div>
                    <button id="sort-btn" class="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none hover:bg-gray-50 transition-colors">
                        <i data-feather="arrow-down" class="h-4 w-4 mr-1 text-gray-500"></i>
                        <span>Sort</span>
                    </button>
                </div>
            </div>
            
            <!-- User Cards -->
            <div id="user-cards-container" class="px-4 pb-8">
                ${userCardsHTML}
                
                <!-- Add User Modal -->
                <div id="add-user-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
                    <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 animate-slide-up">
                        <div class="flex justify-between items-center p-4 border-b border-gray-100">
                            <h3 class="text-lg font-bold text-gray-800">Add New User</h3>
                            <button id="close-modal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
                                <i data-feather="x" class="h-5 w-5"></i>
                            </button>
                        </div>
                        <div class="p-4">
                            <div class="mb-4">
                                <div class="floating-label">
                                    <input class="input-focus" id="new-user-name" type="text" placeholder=" ">
                                    <label for="new-user-name">Full Name</label>
                                </div>
                            </div>
                            <div class="mb-4">
                                <div class="floating-label">
                                    <input class="input-focus" id="new-user-email" type="email" placeholder=" ">
                                    <label for="new-user-email">Email Address</label>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-medium mb-2">
                                    Role
                                </label>
                                <select id="new-user-role" class="input-focus appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                    <option value="User">User</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div class="mb-4 flex items-center">
                                <input id="new-user-active" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" checked>
                                <label for="new-user-active" class="ml-2 block text-sm text-gray-700">
                                    Active
                                </label>
                            </div>
                        </div>
                        <div class="p-4 border-t border-gray-100 flex justify-end space-x-2">
                            <button id="cancel-add-user" class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors">
                                Cancel
                            </button>
                            <button id="save-new-user" class="btn-hover-effect px-4 py-2 bg-gradient-primary text-white rounded-lg focus:outline-none shadow-md">
                                Add User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = userPanelHTML;
    
    // Attach event listeners
    document.getElementById('back-to-profile').addEventListener('click', () => {
        navigateTo('profile');
    });
    
    // Filter dropdown toggle
    document.getElementById('filter-dropdown-btn').addEventListener('click', () => {
        document.getElementById('filter-dropdown').classList.toggle('hidden');
    });
    
    // Sort button
    document.getElementById('sort-btn').addEventListener('click', () => {
        const sortBtn = document.getElementById('sort-btn');
        const icon = sortBtn.querySelector('i');
        
        if (icon.getAttribute('data-feather') === 'arrow-down') {
            feather.replace(icon, { 'icon': 'arrow-up' });
            // Sort logic here (ascending)
            showToast('Sorted in ascending order', 'info');
        } else {
            feather.replace(icon, { 'icon': 'arrow-down' });
            // Sort logic here (descending)
            showToast('Sorted in descending order', 'info');
        }
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-users');
    const clearButton = document.getElementById('clear-search');
    
    searchInput.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();
        
        if (searchText) {
            clearButton.classList.remove('hidden');
        } else {
            clearButton.classList.add('hidden');
        }
        
        // Filter user cards
        const userCards = document.querySelectorAll('.user-card');
        userCards.forEach(card => {
            const userName = card.querySelector('h3').textContent.toLowerCase();
            const userEmail = card.querySelector('p').textContent.toLowerCase();
            
            if (userName.includes(searchText) || userEmail.includes(searchText)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
    
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        clearButton.classList.add('hidden');
        
        // Show all user cards
        const userCards = document.querySelectorAll('.user-card');
        userCards.forEach(card => {
            card.classList.remove('hidden');
        });
    });
    
    // User menu buttons
    document.querySelectorAll('.user-menu-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const userId = button.dataset.userId;
            const userCard = document.querySelector(`.user-card[data-user-id="${userId}"]`);
            const actionsPanel = userCard.querySelector('.user-actions');
            
            // Toggle actions panel
            actionsPanel.classList.toggle('hidden');
            
            // Close other action panels
            document.querySelectorAll('.user-actions').forEach(panel => {
                if (panel !== actionsPanel && !panel.classList.contains('hidden')) {
                    panel.classList.add('hidden');
                }
            });
        });
    });
    
    // Add event listeners for user action buttons
    document.querySelectorAll('.view-user-btn').forEach(button => {
        button.addEventListener('click', () => {
            showToast('Viewing user details', 'info');
        });
    });
    
    document.querySelectorAll('.edit-user-btn').forEach(button => {
        button.addEventListener('click', () => {
            showToast('Editing user', 'info');
        });
    });
    
    document.querySelectorAll('.delete-user-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this user?')) {
                const userCard = button.closest('.user-card');
                
                // Add animation before removing
                userCard.classList.add('animate-fade-out');
                setTimeout(() => {
                    userCard.remove();
                    
                    // Update user count
                    const totalCounter = document.querySelector('.card-hover:nth-child(1) .text-xl');
                    const activeCounter = document.querySelector('.card-hover:nth-child(2) .text-xl');
                    
                    totalCounter.textContent = parseInt(totalCounter.textContent) - 1;
                    activeCounter.textContent = parseInt(activeCounter.textContent) - 1;
                    
                    showToast('User deleted successfully', 'success');
                }, 300);
            }
        });
    });
    
    // Add user modal
    const addUserBtn = document.getElementById('add-user-btn');
    const addUserModal = document.getElementById('add-user-modal');
    const closeModal = document.getElementById('close-modal');
    const cancelAddUser = document.getElementById('cancel-add-user');
    const saveNewUser = document.getElementById('save-new-user');
    
    function openModal() {
        addUserModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
    
    function closeModalFn() {
        addUserModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
    
    addUserBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalFn);
    cancelAddUser.addEventListener('click', closeModalFn);
    
    saveNewUser.addEventListener('click', () => {
        const name = document.getElementById('new-user-name').value;
        const email = document.getElementById('new-user-email').value;
        const role = document.getElementById('new-user-role').value;
        const active = document.getElementById('new-user-active').checked;
        
        if (!name || !email) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Create new user card
        const userId = Date.now(); // Use timestamp as temporary ID
        const newUserHTML = `
            <div data-user-id="${userId}" class="user-card animate-slide-up card-hover bg-white rounded-xl shadow-md overflow-hidden mb-4">
                <div class="flex items-center justify-between p-4">
                    <div class="flex items-center">
                        <div class="relative">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random" alt="${name}" class="h-14 w-14 rounded-full object-cover border-2 ${active ? 'border-green-400' : 'border-gray-300'}">
                            <div class="absolute bottom-0 right-0 h-3 w-3 rounded-full ${active ? 'bg-green-400' : 'bg-gray-300'} ring-2 ring-white"></div>
                        </div>
                        <div class="ml-4">
                            <h3 class="font-medium text-gray-800">${name}</h3>
                            <p class="text-sm text-gray-500">${email}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <span class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                            ${role}
                        </span>
                        <button class="user-menu-btn text-gray-500 hover:text-gray-800 focus:outline-none p-1" data-user-id="${userId}">
                            <i data-feather="more-vertical" class="h-5 w-5"></i>
                        </button>
                    </div>
                </div>
                <div class="user-actions hidden bg-gray-50 border-t border-gray-100 grid grid-cols-3 divide-x divide-gray-100 transition-all">
                    <button class="view-user-btn p-2 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all">
                        <i data-feather="eye" class="h-4 w-4 mr-1"></i>
                        <span class="text-sm">View</span>
                    </button>
                    <button class="edit-user-btn p-2 flex items-center justify-center text-green-600 hover:bg-green-50 transition-all">
                        <i data-feather="edit-2" class="h-4 w-4 mr-1"></i>
                        <span class="text-sm">Edit</span>
                    </button>
                    <button class="delete-user-btn p-2 flex items-center justify-center text-red-600 hover:bg-red-50 transition-all">
                        <i data-feather="trash-2" class="h-4 w-4 mr-1"></i>
                        <span class="text-sm">Delete</span>
                    </button>
                </div>
            </div>
        `;
        
        // Add new user to the top
        const userCardsContainer = document.getElementById('user-cards-container');
        userCardsContainer.insertAdjacentHTML('afterbegin', newUserHTML);
        
        // Update user count
        const totalCounter = document.querySelector('.card-hover:nth-child(1) .text-xl');
        const activeCounter = document.querySelector('.card-hover:nth-child(2) .text-xl');
        
        totalCounter.textContent = parseInt(totalCounter.textContent) + 1;
        if (active) {
            activeCounter.textContent = parseInt(activeCounter.textContent) + 1;
        }
        
        // Update feather icons
        feather.replace();
        
        // Close modal
        closeModalFn();
        
        // Show success toast
        showToast('User added successfully', 'success');
        
        // Reattach event listeners for the new user card
        attachUserCardEventListeners(userId);
    });
    
    // Helper function to attach event listeners to user cards
    function attachUserCardEventListeners(userId) {
        const menuBtn = document.querySelector(`.user-menu-btn[data-user-id="${userId}"]`);
        const card = document.querySelector(`.user-card[data-user-id="${userId}"]`);
        
        if (menuBtn) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const actionsPanel = card.querySelector('.user-actions');
                actionsPanel.classList.toggle('hidden');
            });
        }
        
        const viewBtn = card.querySelector('.view-user-btn');
        const editBtn = card.querySelector('.edit-user-btn');
        const deleteBtn = card.querySelector('.delete-user-btn');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', () => {
                showToast('Viewing user details', 'info');
            });
        }
        
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                showToast('Editing user', 'info');
            });
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this user?')) {
                    card.classList.add('animate-fade-out');
                    setTimeout(() => {
                        card.remove();
                        
                        // Update user count
                        const totalCounter = document.querySelector('.card-hover:nth-child(1) .text-xl');
                        const activeCounter = document.querySelector('.card-hover:nth-child(2) .text-xl');
                        
                        totalCounter.textContent = parseInt(totalCounter.textContent) - 1;
                        activeCounter.textContent = parseInt(activeCounter.textContent) - 1;
                        
                        showToast('User deleted successfully', 'success');
                    }, 300);
                }
            });
        }
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('filter-dropdown');
        const filterBtn = document.getElementById('filter-dropdown-btn');
        
        if (!dropdown.contains(e.target) && !filterBtn.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
    
    // Add filter functionality
    const filterLinks = document.querySelectorAll('#filter-dropdown a');
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filterText = link.textContent.trim();
            
            // Update filter button text to show active filter
            const filterBtnText = document.querySelector('#filter-dropdown-btn span');
            filterBtnText.textContent = filterText;
            
            // Hide dropdown
            document.getElementById('filter-dropdown').classList.add('hidden');
            
            // Filter logic
            const userCards = document.querySelectorAll('.user-card');
            
            // Filter by status
            if (filterText === 'All Users') {
                userCards.forEach(card => card.classList.remove('hidden'));
                showToast('Showing all users', 'info');
            } 
            else if (filterText === 'Active' || filterText === 'Inactive') {
                const isActive = filterText === 'Active';
                
                userCards.forEach(card => {
                    const statusIndicator = card.querySelector('.absolute.bottom-0.right-0');
                    const isUserActive = statusIndicator.classList.contains('bg-green-400');
                    
                    if (isUserActive === isActive) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
                
                showToast(`Showing ${filterText.toLowerCase()} users`, 'info');
            }
            // Filter by role
            else if (filterText === 'All Roles') {
                userCards.forEach(card => card.classList.remove('hidden'));
                showToast('Showing users of all roles', 'info');
            }
            else if (['Admin', 'Editor', 'User'].includes(filterText)) {
                userCards.forEach(card => {
                    const roleSpan = card.querySelector('.bg-indigo-100');
                    const role = roleSpan.textContent.trim();
                    
                    if (role === filterText) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
                
                showToast(`Showing ${filterText} users`, 'info');
            }
        });
    });
}

// Toggle dark mode
function toggleDarkMode(enabled) {
    state.darkMode = enabled;
    const app = document.getElementById('app');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    
    if (enabled) {
        document.body.classList.add('dark-mode');
        if (darkModeIcon) {
            feather.replace(darkModeIcon, { name: 'sun' });
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (darkModeIcon) {
            feather.replace(darkModeIcon, { name: 'moon' });
        }
    }
}

// Handle sign in form submission
function handleSignIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let isValid = true;
    
    // Simple validation
    if (!validateEmail(email)) {
        document.getElementById('email-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('email-error').classList.add('hidden');
    }
    
    if (password.length < 6) {
        document.getElementById('password-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('password-error').classList.add('hidden');
    }
    
    if (isValid) {
        // Show loading
        document.getElementById('signin-text').classList.add('hidden');
        document.getElementById('signin-loading').classList.remove('hidden');
        
        // Simulate API call
        setTimeout(() => {
            // Set user data in state
            state.user = {
                name: 'Andrew Ainsley',
                email: email
            };
            
            // Navigate to profile
            navigateTo('profile');
        }, 1500);
    }
}

// Handle sign up form submission
function handleSignUp() {
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const termsChecked = document.getElementById('terms').checked;
    let isValid = true;
    
    // Simple validation
    if (!fullname) {
        document.getElementById('fullname-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('fullname-error').classList.add('hidden');
    }
    
    if (!validateEmail(email)) {
        document.getElementById('signup-email-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('signup-email-error').classList.add('hidden');
    }
    
    if (password.length < 6) {
        document.getElementById('signup-password-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('signup-password-error').classList.add('hidden');
    }
    
    if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('confirm-password-error').classList.add('hidden');
    }
    
    if (!termsChecked) {
        document.getElementById('terms-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('terms-error').classList.add('hidden');
    }
    
    if (isValid) {
        // Show loading
        document.getElementById('signup-text').classList.add('hidden');
        document.getElementById('signup-loading').classList.remove('hidden');
        
        // Simulate API call
        setTimeout(() => {
            // Set user data in state
            state.user = {
                name: fullname,
                email: email
            };
            
            // Navigate to profile
            navigateTo('profile');
        }, 1500);
    }
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} 