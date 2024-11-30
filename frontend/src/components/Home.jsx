import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg mb-8">Get started on your journey to discover more.</p>
        <div>

            <button 
                className="px-6 py-3 text-lg bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
                <Link to="/chat">
                    Get Started
                </Link>
            </button>
        </div>
    </div>
  )
}

export default Home