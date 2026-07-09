import React, { useState } from "react";

const LoginPopup = ({ onClose, onLogin }) => {

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-80" style={{ borderLeft: '6px solid #FFC107' }}>
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold mb-3">
                            Welcomed
                        </h2>

                        <button

                            onClick={() => {
                                console.log("Button clicked");
                                onClose();
                            }}

                            className="w-8 h-8 flex items-center justify-center text-black hover:bg-red-300 hover:text-white rounded-full transition-all duration-200"
                            aria-label="Close"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>


                    <p className="mb-4">
                        You must login to like and save jobs
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => {
                                onClose();
                            }}
                            className="bg-[#FFC107] text-black px-4 py-2 rounded"
                        >
                            Close
                        </button>
                        <button onClick={onLogin}
                            className="bg-[#FFC107] text-black px-4 py-2 rounded"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPopup;
