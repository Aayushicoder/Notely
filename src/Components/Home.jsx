import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes]);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center p-10">
            {/* Notely Title */}
            <h1 className="text-6xl font-extrabold text-blue-400 drop-shadow-lg animate-pulse">
                Welcome to Notely 📝
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 mt-4 text-lg max-w-2xl">
                Save, share, and manage your pastes securely with Notely.
            </p>

            {/* 
            <a
                href="/pastes"
                className="mt-6 px-8 py-3 bg-blue-500 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
                Get Started →
            </a>   */}

            {/* Paste Creation Section */}
            <div className='text-blue-400 mt-10 w-full max-w-3xl'>
                <div className='flex flex-row gap-7 place-content-between'>
                    <input
                        className='p-2 rounded-2xl mt-2 w-[66%] pl-4 bg-gray-800 text-white placeholder-gray-400'
                        type='text'
                        placeholder='Enter title here'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button onClick={createPaste}
                        className='p-2 rounded-2xl mt-2 bg-gray-700 text-white hover:bg-blue-500'>
                        {pasteId ? "Update My Paste" : "Create My Paste"}
                    </button>
                </div>

                <div className='mt-8'>
                    <textarea
                        className='rounded-2xl mt-4 min-w-[500px] p-4 bg-gray-800 text-white placeholder-gray-400'
                        value={value}
                        placeholder='Enter content here'
                        onChange={(e) => setValue(e.target.value)}
                        rows={10}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;