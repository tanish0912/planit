import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full text-center">
          {/* Logo/Brand */}
          <div className="mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl shadow-2xl mb-8">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h1 className="text-7xl md:text-8xl font-display font-bold gradient-text mb-6">
              PlanIt
            </h1>
            <p className="text-2xl md:text-3xl text-neutral-600 font-primary font-medium mb-4">
              Smart Planning Made Simple
            </p>
            <p className="text-lg md:text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into actionable plans. Organize events, manage tasks, and achieve your goals with our intuitive planning platform.
            </p>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 animate-slide-in">
            <div className="card-hover p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Smart Events</h3>
              <p className="text-neutral-600">Plan and organize your events with intelligent scheduling and reminders.</p>
            </div>
            
            <div className="card-hover p-8">
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Task Management</h3>
              <p className="text-neutral-600">Break down your goals into manageable tasks and track your progress.</p>
            </div>
            
            <div className="card-hover p-8">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Lightning Fast</h3>
              <p className="text-neutral-600">Experience smooth, responsive design that keeps up with your productivity.</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-6 animate-scale-in">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/login"
                className="btn-primary w-full sm:w-auto min-w-[240px] text-center text-lg py-4"
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </span>
              </Link>
              
              <Link
                to="/signup"
                className="btn-secondary w-full sm:w-auto min-w-[240px] text-center text-lg py-4"
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Get Started
                </span>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 animate-fade-in">
            <p className="text-sm text-neutral-400 mb-8">Trusted by planners worldwide</p>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-300 mb-2">⚡</div>
                <div className="text-sm font-medium text-neutral-400">Fast</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-300 mb-2">🔒</div>
                <div className="text-sm font-medium text-neutral-400">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neutral-300 mb-2">📱</div>
                <div className="text-sm font-medium text-neutral-400">Responsive</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
