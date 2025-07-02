import React, { useState, useContext } from 'react';
import myContext from '../../../context/data/myContext';
import { toast } from 'react-toastify';

const EmailManagement = () => {
    const { user: customers } = useContext(myContext);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [preview, setPreview] = useState(false);
    const [lastTemplate, setLastTemplate] = useState({ subject: '', body: '' });

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
    };
    const handleSelectAll = () => {
        if (selectedUsers.length === customers.length) setSelectedUsers([]);
        else setSelectedUsers(customers.map(u => u.id));
    };
    const handleSendEmail = async () => {
        const emails = customers.filter(u => selectedUsers.includes(u.id)).map(u => u.email);
        if (emails.length === 0) return toast.error('No users selected');
        try {
            await fetch('https://<your-region>-<your-project-id>.cloudfunctions.net/sendOrderEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerEmail: emails.join(','),
                    adminEmail: 'admin@example.com',
                    orderInfo: { subject, body, bulk: true },
                }),
            });
            toast.success(`Email sent to ${emails.length} users.`);
            setLastTemplate({ subject, body });
            setSubject('');
            setBody('');
            setSelectedUsers([]);
            setPreview(false);
        } catch (error) {
            toast.error('Failed to send email.');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Email Marketing</h2>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Subject</label>
                <input 
                    type="text" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Body</label>
                <textarea 
                    value={body} 
                    onChange={(e) => setBody(e.target.value)}
                    rows="10"
                    className="w-full px-3 py-2 border rounded"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Select Users</label>
                <div className="max-h-40 overflow-y-auto border rounded p-2">
                    <div>
                        <input type="checkbox" checked={selectedUsers.length === customers.length && customers.length > 0} onChange={handleSelectAll} /> Select All
                    </div>
                    {customers.map(user => (
                        <div key={user.id}>
                            <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleSelectUser(user.id)} /> {user.name} ({user.email})
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-4">
                <button onClick={() => setPreview(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Preview Email</button>
                <button onClick={() => { setSubject(lastTemplate.subject); setBody(lastTemplate.body); }} className="bg-gray-300 px-4 py-2 rounded">Load Last Template</button>
            </div>
            {preview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-lg w-full">
                        <h3 className="text-xl font-bold mb-4">Email Preview</h3>
                        <p><strong>Subject:</strong> {subject}</p>
                        <p><strong>Body:</strong></p>
                        <pre className="mb-4 text-sm bg-gray-100 p-2 rounded overflow-x-auto">{body}</pre>
                        <button onClick={handleSendEmail} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Send Email</button>
                        <button onClick={() => setPreview(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailManagement; 