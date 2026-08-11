import { FileQuestion, ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="max-w-md w-full text-center">

                <div className="flex justify-center mb-6">
                    <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
                        <FileQuestion
                            size={56}
                            className="text-red-600"
                        />
                    </div>
                </div>

                <h1 className="text-6xl font-bold text-gray-900">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                    Page Not Found
                </h2>

                <p className="mt-3 text-gray-500">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <div className="mt-8 flex justify-center gap-3">

                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                    >
                        <Home size={18} />
                        Dashboard
                    </Link>

                </div>

            </div>
        </div>
    );
}