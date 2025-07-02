import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Settings, Package, Heart, LogOut, Edit, Save, X, MapPin, Phone, Mail, Calendar, Loader, FileText, Shield, Truck, HelpCircle, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { updateProfile } from '../../redux/profileSlice';

const Profile = () => {
	const [activeTab, setActiveTab] = useState('profile');
	const [isEditing, setIsEditing] = useState(false);
	const [firebaseUser, setFirebaseUser] = useState(null);
	
	const { mode } = useContext(myContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data: profileData, status: profileStatus } = useSelector((state) => state.profile);
	const { items: wishlistItems } = useSelector((state) => state.wishlist);
	const { items: orderItems } = useSelector((state) => state.order) || { items: [] };

	const [userData, setUserData] = useState(profileData);

	// Listen to Firebase auth state changes
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setFirebaseUser(user);
			} else {
				navigate('/login');
			}
		});

		return () => unsubscribe();
	}, [navigate]);

	useEffect(() => {
		if (!firebaseUser) return;

		// Initialize userData with Firebase user data
		if (profileData) {
			setUserData({
				...profileData,
				// Override with Firebase data for non-editable fields
				name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
				email: firebaseUser.email || '',
				phone: firebaseUser.phoneNumber || ''
			});
		} else {
			// Use Firebase user data as primary source
			setUserData({
				name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
				email: firebaseUser.email || '',
				phone: firebaseUser.phoneNumber || '',
				address: '',
				city: '',
				state: '',
				pincode: ''
			});
		}
	}, [profileData, firebaseUser]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		// Only allow editing of address fields, not name, email, or phone
		if (['name', 'email', 'phone'].includes(name)) {
			return; // Prevent editing these fields
		}
		setUserData(prev => ({ ...prev, [name]: value }));
	};

	const handleSaveProfile = () => {
		// Only save editable fields (address, city, state, pincode)
		const editableData = {
			address: userData.address,
			city: userData.city,
			state: userData.state,
			pincode: userData.pincode
		};
		dispatch(updateProfile(editableData)).then(() => {
			setIsEditing(false);
		});
	};

	const handleCancelEdit = () => {
		setUserData(profileData);
		setIsEditing(false);
	};

	const handleLogout = async () => {
		try {
			await signOut(auth);
			localStorage.clear();
			navigate('/login');
			toast.success('Logged out successfully');
		} catch (error) {
			toast.error('Failed to logout');
		}
	};

	if (profileStatus === 'loading' || !userData || !firebaseUser) {
		return (
			<Layout>
				<div className="h-screen flex items-center justify-center">
					<Loader className="animate-spin" size={48} />
				</div>
			</Layout>
		);
	}

	const renderProfileTab = () => (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
				{isEditing ? (
					<div className="flex gap-2">
						<button
							onClick={handleCancelEdit}
							className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
						>
							<X size={16} />
							Cancel
						</button>
						<button
							onClick={handleSaveProfile}
							className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
						>
							<Save size={16} />
							Save Changes
						</button>
					</div>
				) : (
					<button
						onClick={() => setIsEditing(true)}
						className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
					>
						<Edit size={16} />
						Edit Address
					</button>
				)}
			</div>

			{/* Firebase User Information (Non-editable) */}
			<div className="bg-gray-50 rounded-lg p-6 mb-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
				<p className="text-sm text-gray-600 mb-4">These details are managed by your Firebase account and cannot be edited here.</p>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
						<div className="flex items-center gap-2">
							<input
								type="text"
								value={userData.name}
								disabled
								className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
							/>
							<div className="text-xs text-gray-500 bg-blue-100 text-blue-800 px-2 py-1 rounded">
								Firebase
							</div>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
						<div className="flex items-center gap-2">
							<input
								type="email"
								value={userData.email}
								disabled
								className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
							/>
							<div className="text-xs text-gray-500 bg-blue-100 text-blue-800 px-2 py-1 rounded">
								Firebase
							</div>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
						<div className="flex items-center gap-2">
							<input
								type="tel"
								value={userData.phone || 'Not provided'}
								disabled
								className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
							/>
							<div className="text-xs text-gray-500 bg-blue-100 text-blue-800 px-2 py-1 rounded">
								Firebase
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Editable Address Information */}
			<div className="bg-white border border-gray-200 rounded-lg p-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
				<p className="text-sm text-gray-600 mb-4">You can edit your shipping address information below.</p>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
						<input
							type="text"
							name="address"
							value={userData.address}
							onChange={handleInputChange}
							disabled={!isEditing}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-gray-50"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">City</label>
						<input
							type="text"
							name="city"
							value={userData.city}
							onChange={handleInputChange}
							disabled={!isEditing}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-gray-50"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">State</label>
						<input
							type="text"
							name="state"
							value={userData.state}
							onChange={handleInputChange}
							disabled={!isEditing}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-gray-50"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
						<input
							type="text"
							name="pincode"
							value={userData.pincode}
							onChange={handleInputChange}
							disabled={!isEditing}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:bg-gray-50"
						/>
					</div>
				</div>
			</div>
		</div>
	);

	const renderOrdersTab = () => (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-gray-900">Order History</h2>
			{orderItems.length === 0 ? (
				<div className="text-center py-12">
					<Package size={48} className="mx-auto text-gray-400 mb-4" />
					<h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
					<p className="text-gray-500 mb-4">Start shopping to see your order history</p>
					<Link
						to="/allproducts"
						className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
					>
						Start Shopping
					</Link>
				</div>
			) : (
				<div className="space-y-4">
					{orderItems.map((order, index) => (
						<div key={index} className="border border-gray-200 rounded-lg p-6">
							<div className="flex justify-between items-start mb-4">
								<div>
									<p className="font-medium text-gray-900">Order #{order.id}</p>
									<p className="text-sm text-gray-500">{order.date}</p>
								</div>
								<span className={`px-3 py-1 rounded-full text-sm font-medium ${
									order.status === 'completed' ? 'bg-green-100 text-green-800' :
									order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
									order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
									'bg-yellow-100 text-yellow-800'
								}`}>
									{order.status}
								</span>
							</div>
							<div className="space-y-2">
								{order.cartItems?.map((item, itemIndex) => (
									<div key={itemIndex} className="flex items-center gap-3">
										<img
											src={item.imageUrls?.[0]}
											alt={item.title}
											className="w-12 h-12 object-cover rounded"
										/>
										<div className="flex-1">
											<p className="font-medium text-gray-900">{item.title}</p>
											<p className="text-sm text-gray-500">Qty: {item.quantity}</p>
										</div>
										<p className="font-medium text-gray-900">₹{item.price * item.quantity}</p>
									</div>
								))}
							</div>
							<div className="mt-4 pt-4 border-t border-gray-200">
								<div className="flex justify-between items-center">
									<p className="font-medium text-gray-900">Total</p>
									<p className="font-bold text-gray-900">₹{order.totalAmount}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);

	const renderWishlistTab = () => (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold text-gray-900">Wishlist</h2>
				<Link
					to="/wishlist"
					className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
				>
					View All ({wishlistItems.length})
				</Link>
			</div>
			{wishlistItems.length === 0 ? (
				<div className="text-center py-12">
					<Heart size={48} className="mx-auto text-gray-400 mb-4" />
					<h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
					<p className="text-gray-500 mb-4">Start adding products to your wishlist</p>
					<Link
						to="/allproducts"
						className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
					>
						Start Shopping
					</Link>
				</div>
			) : (
				<div className="text-center py-8">
					<p className="text-lg text-gray-600 mb-4">
						You have {wishlistItems.length} items in your wishlist
					</p>
					<Link
						to="/wishlist"
						className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
					>
						View Wishlist
					</Link>
				</div>
			)}
		</div>
	);

	const renderSettingsTab = () => (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
			
			<div className="space-y-4">
				<div className="border border-gray-200 rounded-lg p-4">
					<h3 className="font-medium text-gray-900 mb-2">Account Actions</h3>
					<div className="space-y-2">
						<button
							onClick={handleLogout}
							className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
						>
							<LogOut size={16} />
							Logout
						</button>
					</div>
				</div>

				<div className="border border-gray-200 rounded-lg p-4">
					<h3 className="font-medium text-gray-900 mb-2">Preferences</h3>
					<div className="space-y-2">
						<label className="flex items-center gap-2">
							<input type="checkbox" className="rounded" />
							<span className="text-gray-700">Email notifications</span>
						</label>
						<label className="flex items-center gap-2">
							<input type="checkbox" className="rounded" />
							<span className="text-gray-700">SMS notifications</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);

	const renderReturnPolicyTab = () => (
		<div className="space-y-6">
			{/* Header Section */}
			<div className="bg-gray-900 rounded-t-lg px-8 py-12 text-center">
				<h2 className="text-4xl font-bold text-white mb-4">
					Return Policy
				</h2>
				<p className="text-gray-300 text-lg">
					Everything you need to know about returns and exchanges
				</p>
			</div>

			{/* Content Section */}
			<div className="bg-white rounded-b-lg shadow-lg px-8 py-12">
				<div className="prose max-w-none">
					<div className="mb-8">
						<p className="text-gray-600 leading-relaxed mb-6">
							We want you to be completely satisfied with your purchase. If you're not happy with your order, 
							you can return it within 30 days of delivery for a full refund or exchange.
						</p>
						<p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
							<strong>Last Updated:</strong> January 2025
						</p>
					</div>

					<div className="space-y-8">
						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">Return Conditions</h3>
							<div className="space-y-3 text-gray-600">
								<p>To be eligible for a return, your item must meet the following criteria:</p>
								<ul className="list-disc list-inside space-y-2">
									<li>Item must be unworn, unwashed, and in original condition</li>
									<li>All original tags and packaging must be intact</li>
									<li>Returns must be initiated within 30 days of delivery</li>
									<li>Sale items are final sale and cannot be returned</li>
									<li>Personalized or custom items cannot be returned</li>
								</ul>
							</div>
						</section>

						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">How to Return</h3>
							<div className="bg-gray-50 rounded-lg p-6">
								<div className="grid md:grid-cols-3 gap-6">
									<div className="text-center">
										<div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-3">
											<span className="text-white font-bold">1</span>
										</div>
										<h4 className="font-semibold text-gray-900 mb-2">Contact Us</h4>
										<p className="text-sm text-gray-600">Email or call our customer service team</p>
									</div>
									<div className="text-center">
										<div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-3">
											<span className="text-white font-bold">2</span>
										</div>
										<h4 className="font-semibold text-gray-900 mb-2">Get Authorization</h4>
										<p className="text-sm text-gray-600">Receive return authorization and shipping label</p>
									</div>
									<div className="text-center">
										<div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-3">
											<span className="text-white font-bold">3</span>
										</div>
										<h4 className="font-semibold text-gray-900 mb-2">Ship & Refund</h4>
										<p className="text-sm text-gray-600">Package and ship your return for processing</p>
									</div>
								</div>
							</div>
						</section>

						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">Refund Information</h3>
							<div className="bg-green-50 border-l-4 border-green-400 p-6">
								<div className="space-y-3">
									<div className="flex items-start">
										<div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
										<p className="text-gray-700">Refunds are processed within 5-7 business days of receiving your return</p>
									</div>
									<div className="flex items-start">
										<div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
										<p className="text-gray-700">Original shipping costs are non-refundable</p>
									</div>
									<div className="flex items-start">
										<div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
										<p className="text-gray-700">Return shipping costs are the responsibility of the customer</p>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);

	const renderAboutTab = () => (
		<div className="space-y-6">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-lg px-8 py-12 text-center">
				<h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
					VIBERAZE
				</h2>
				<p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
					Redefining premium streetwear through innovative design and sustainable craftsmanship.
				</p>
			</div>

			{/* Content Section */}
			<div className="bg-white rounded-b-lg shadow-lg px-8 py-12">
				{/* Mission Statement */}
				<div className="text-center mb-12">
					<h3 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
						Our Mission
					</h3>
					<p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
						We are committed to creating exceptional streetwear that embodies both style and sustainability. 
						Every piece we design reflects our dedication to quality, innovation, and environmental responsibility.
					</p>
				</div>

				{/* Core Values */}
				<div className="mb-12">
					<div className="text-center mb-8">
						<h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
							Our Values
						</h3>
						<p className="text-gray-600 max-w-2xl mx-auto">
							The principles that guide everything we do
						</p>
					</div>
					
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
							<div className="w-12 h-12 bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
								<div className="w-6 h-6 bg-white rounded-full"></div>
							</div>
							<h4 className="text-xl font-semibold mb-4 text-gray-900">Quality First</h4>
							<p className="text-gray-600 leading-relaxed">
								We use only premium materials and meticulous craftsmanship to ensure every piece meets our exacting standards.
							</p>
						</div>
						
						<div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
							<div className="w-12 h-12 bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
								<div className="w-6 h-6 bg-white rounded-full"></div>
							</div>
							<h4 className="text-xl font-semibold mb-4 text-gray-900">Sustainable Design</h4>
							<p className="text-gray-600 leading-relaxed">
								Environmental responsibility is at the core of our design process, from material selection to production methods.
							</p>
						</div>
						
						<div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
							<div className="w-12 h-12 bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
								<div className="w-6 h-6 bg-white rounded-full"></div>
							</div>
							<h4 className="text-xl font-semibold mb-4 text-gray-900">Bold Innovation</h4>
							<p className="text-gray-600 leading-relaxed">
								We push creative boundaries while maintaining timeless appeal, creating pieces that stand out and last.
							</p>
						</div>
					</div>
				</div>

				{/* Our Story */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
							Our Story
						</h3>
						<div className="space-y-6 text-gray-600 leading-relaxed">
							<p>
								Founded in 2024, Viberaze emerged from a vision to transform the streetwear landscape. 
								We recognized the need for a brand that could deliver premium quality while maintaining 
								environmental consciousness and social responsibility.
							</p>
							<p>
								Our journey began with a simple belief: that fashion should be both expressive and 
								responsible. Today, we continue to challenge industry norms, creating pieces that 
								reflect our commitment to excellence and sustainability.
							</p>
							<p>
								Every design tells a story of innovation, every stitch represents our dedication to 
								craftsmanship, and every collection moves us closer to a more sustainable future.
							</p>
						</div>
					</div>
					
					<div>
						<div className="bg-gray-900 p-8 rounded-lg text-white">
							<h4 className="text-2xl font-semibold mb-6">Our Commitment</h4>
							<ul className="space-y-4">
								<li className="flex items-start">
									<div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
									<span>Premium materials sourced responsibly</span>
								</li>
								<li className="flex items-start">
									<div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
									<span>Ethical manufacturing processes</span>
								</li>
								<li className="flex items-start">
									<div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
									<span>Timeless designs that transcend trends</span>
								</li>
								<li className="flex items-start">
									<div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
									<span>Community-focused brand values</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderContactUsTab = () => (
		<div className="space-y-6">
			{/* Header Section */}
			<div className="text-center mb-8">
				<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
					Get in Touch
				</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					Have questions about our products, need assistance with your order, or want to learn more about Viberaze? We're here to help.
				</p>
			</div>

			<div className="grid lg:grid-cols-2 gap-12">
				{/* Contact Form */}
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h3 className="text-2xl font-semibold text-gray-900 mb-6">
						Send us a Message
					</h3>
					<div className="space-y-6">
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Full Name *
								</label>
								<input
									type="text"
									placeholder="John Doe"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Email Address *
								</label>
								<input
									type="email"
									placeholder="john@example.com"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
								/>
							</div>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Subject *
							</label>
							<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors">
								<option value="">Select a subject</option>
								<option value="order-inquiry">Order Inquiry</option>
								<option value="product-question">Product Question</option>
								<option value="size-guide">Size Guide Help</option>
								<option value="partnership">Partnership/Collaboration</option>
								<option value="press-media">Press & Media</option>
								<option value="other">Other</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Message *
							</label>
							<textarea
								rows="5"
								placeholder="Tell us how we can help you..."
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors resize-vertical"
							></textarea>
						</div>

						<button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300">
							Send Message
						</button>
					</div>
				</div>

				{/* Contact Information */}
				<div className="space-y-8">
					<div className="bg-white rounded-lg shadow-lg p-8">
						<h3 className="text-2xl font-semibold text-gray-900 mb-6">
							Contact Information
						</h3>
						<div className="space-y-6">
							<div className="flex items-start">
								<div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mr-4 mt-1">
									<div className="w-2 h-2 bg-white rounded-full"></div>
								</div>
								<div>
									<h4 className="font-medium text-gray-900">Email</h4>
									<p className="text-gray-600">support@viberaze.com</p>
									<p className="text-sm text-gray-500">We typically respond within 24 hours</p>
								</div>
							</div>

							<div className="flex items-start">
								<div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mr-4 mt-1">
									<div className="w-2 h-2 bg-white rounded-full"></div>
								</div>
								<div>
									<h4 className="font-medium text-gray-900">Phone</h4>
									<p className="text-gray-600">+91 98765 43210</p>
									<p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM IST</p>
								</div>
							</div>

							<div className="flex items-start">
								<div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mr-4 mt-1">
									<div className="w-2 h-2 bg-white rounded-full"></div>
								</div>
								<div>
									<h4 className="font-medium text-gray-900">Address</h4>
									<p className="text-gray-600">Mumbai, Maharashtra, India</p>
									<p className="text-sm text-gray-500">Our headquarters</p>
								</div>
							</div>

							<div className="flex items-start">
								<div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mr-4 mt-1">
									<div className="w-2 h-2 bg-white rounded-full"></div>
								</div>
								<div>
									<h4 className="font-medium text-gray-900">Social Media</h4>
									<div className="flex space-x-4 mt-2">
										<a 
											href="https://www.instagram.com/viberaze.in" 
											target="_blank" 
											rel="noreferrer"
											className="text-gray-600 hover:text-gray-900 transition-colors"
										>
											Instagram
										</a>
										<a 
											href="https://www.twitter.com/viberaze.in" 
											target="_blank" 
											rel="noreferrer"
											className="text-gray-600 hover:text-gray-900 transition-colors"
										>
											Twitter
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-gray-900 text-white rounded-lg p-8">
						<h4 className="text-xl font-semibold mb-4">
							Business Hours
						</h4>
						<div className="space-y-3">
							<div className="flex justify-between">
								<span className="text-gray-300">Monday - Friday</span>
								<span className="text-white">9:00 AM - 6:00 PM</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-300">Saturday</span>
								<span className="text-white">10:00 AM - 4:00 PM</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-300">Sunday</span>
								<span className="text-white">Closed</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderPrivacyTab = () => (
		<div className="space-y-6">
			{/* Header Section */}
			<div className="bg-gray-900 rounded-t-lg px-8 py-12 text-center">
				<h2 className="text-4xl font-bold text-white mb-4">
					Privacy Policy
				</h2>
				<p className="text-gray-300 text-lg">
					Your privacy and data protection is our top priority
				</p>
			</div>

			{/* Content Section */}
			<div className="bg-white rounded-b-lg shadow-lg px-8 py-12">
				<div className="prose max-w-none">
					<div className="mb-8">
						<p className="text-gray-600 leading-relaxed mb-6">
							This Privacy Policy describes how we collect, use, and protect your information 
							when you use our services. We are committed to ensuring your privacy is protected 
							and handle your personal data in accordance with applicable laws and regulations.
						</p>
						<p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
							<strong>Last Updated:</strong> January 2025
						</p>
					</div>

					<div className="space-y-8">
						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h3>
							<div className="space-y-3 text-gray-600">
								<p>
									We collect information that you provide directly to us, including your name, 
									email address, postal address, telephone number, and payment information when 
									you make a purchase or create an account.
								</p>
								<p>
									We also automatically collect certain information about your device and usage 
									patterns, including IP address, browser type, operating system, referring URLs, 
									and pages visited to improve our services and user experience.
								</p>
								<p>
									Information may also be collected through cookies, web beacons, and other 
									tracking technologies to enhance your browsing experience and provide 
									personalized content.
								</p>
							</div>
						</section>

						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h3>
							<div className="space-y-3 text-gray-600">
								<p>
									We use the information we collect to provide, maintain, and improve our services, 
									process transactions, and communicate with you about your account and our services.
								</p>
								<p>
									Your information may also be used to personalize your experience, send you marketing 
									communications (with your consent), respond to your inquiries, and comply with legal 
									obligations.
								</p>
								<p>
									We may use aggregated and anonymized data for analytics purposes to understand 
									user behavior and improve our website functionality and performance.
								</p>
							</div>
						</section>

						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security and Storage</h3>
							<div className="space-y-3 text-gray-600">
								<p>
									We implement appropriate technical and organizational security measures to protect 
									your personal information against unauthorized access, alteration, disclosure, or 
									destruction.
								</p>
								<p>
									This includes encryption, secure servers, regular security assessments, and access 
									controls. However, no method of transmission over the internet or electronic storage 
									is 100% secure.
								</p>
								<p>
									While we strive to protect your information using commercially acceptable means, 
									we cannot guarantee absolute security and encourage you to use strong passwords 
									and secure networks.
								</p>
							</div>
						</section>

						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Your Rights and Choices</h3>
							<div className="space-y-3 text-gray-600">
								<p>
									You have the right to access, update, correct, or delete your personal information. 
									You may also request a copy of the personal information we hold about you or 
									restrict the processing of your information under certain circumstances.
								</p>
								<p>
									You can opt out of receiving promotional communications from us at any time by 
									following the unsubscribe instructions in our emails or contacting us directly.
								</p>
								<p>
									Please note that you may still receive transactional emails related to your 
									account, orders, and important service updates even if you opt out of marketing 
									communications.
								</p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);

	const renderTermsTab = () => (
		<div className="space-y-6">
			{/* Header Section */}
			<div className="bg-gray-900 rounded-t-lg px-8 py-12 text-center">
				<h2 className="text-4xl font-bold text-white mb-4">
					Terms and Conditions
				</h2>
				<p className="text-gray-300 text-lg">
					Please read these terms carefully before using our services
				</p>
			</div>

			{/* Content Section */}
			<div className="bg-white rounded-b-lg shadow-lg px-8 py-12">
				<div className="prose max-w-none">
					<div className="mb-8">
						<p className="text-gray-600 leading-relaxed mb-6">
							Welcome to Viberaze. These Terms and Conditions ("Terms") govern your use of our website 
							and services. By accessing or using our website, you agree to be bound by these Terms.
						</p>
						<p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
							<strong>Last Updated:</strong> January 2025
						</p>
					</div>

					<div className="space-y-8">
						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h3>
							<p className="text-gray-600 leading-relaxed">
								By using this website, you accept these terms and conditions in full. If you disagree 
								with these terms and conditions or any part of these terms and conditions, you must 
								not use this website.
							</p>
						</section>

						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Website Content</h3>
							<div className="space-y-3 text-gray-600">
								<p>The content of our website is subject to change without notice.</p>
								<p>
									We do not provide any warranty or guarantee as to the accuracy, timeliness, 
									performance, completeness, or suitability of the information and materials 
									found on this website for any particular purpose.
								</p>
								<p>
									You acknowledge that such information and materials may contain inaccuracies 
									or errors, and we expressly exclude liability for any such inaccuracies or 
									errors to the fullest extent permitted by law.
								</p>
							</div>
						</section>

						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Use of Website</h3>
							<div className="space-y-3 text-gray-600">
								<p>
									Your use of any information or materials on our website is entirely at your own risk, 
									for which we shall not be liable.
								</p>
								<p>
									You must not use this website in any way that causes, or may cause, damage to the 
									website or impairment of the availability or accessibility of the website.
								</p>
								<p>
									You must not use this website to copy, store, host, transmit, send, use, publish, 
									or distribute any material which consists of spyware, computer virus, Trojan horse, 
									worm, keystroke logger, rootkit, or other malicious software.
								</p>
							</div>
						</section>

						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Limitation of Liability</h3>
							<div className="space-y-3 text-gray-600">
								<p>
									We shall be under no liability whatsoever in respect of any loss or damage arising 
									directly or indirectly out of the decline of authorization for any transaction.
								</p>
								<p>
									In no event shall Viberaze be liable for any direct, indirect, punitive, incidental, 
									special, consequential damages or any other damages resulting from the use of our website.
								</p>
							</div>
						</section>

						<section>
							<h3 className="text-2xl font-semibold text-gray-900 mb-4">5. Governing Law</h3>
							<p className="text-gray-600 leading-relaxed">
								These terms and conditions are governed by and construed in accordance with the laws 
								of India. Any dispute arising out of use of our website is subject to the jurisdiction 
								of Indian courts.
							</p>
						</section>
					</div>
				</div>
			</div>
		</div>
	);

	const renderShippingPolicyTab = () => (
		<div className="space-y-6">
			{/* Header Section */}
			<div className="bg-gray-900 rounded-t-lg px-8 py-12 text-center">
				<h2 className="text-4xl font-bold text-white mb-4">
					Shipping Policy
				</h2>
				<p className="text-gray-300 text-lg">
					Everything you need to know about our shipping process
				</p>
			</div>

			{/* Content Section */}
			<div className="bg-white rounded-b-lg shadow-lg px-8 py-12">
				<div className="space-y-12">
					{/* Shipping Methods */}
					<section>
						<h3 className="text-2xl font-semibold text-gray-900 mb-6">
							Shipping Methods & Rates
						</h3>
						
						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
								<h4 className="text-xl font-semibold text-gray-900 mb-4">
									Domestic Shipping (India)
								</h4>
								<div className="space-y-3">
									<div className="flex justify-between items-center py-2 border-b border-gray-200">
										<span className="font-medium text-gray-700">Standard Delivery</span>
										<span className="text-gray-600">5-7 business days</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b border-gray-200">
										<span className="font-medium text-gray-700">Shipping Fee</span>
										<span className="text-gray-600">₹50 (orders under ₹1,499)</span>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="font-medium text-gray-700">Free Shipping</span>
										<span className="text-green-600 font-semibold">Orders ₹1,499+</span>
									</div>
								</div>
							</div>

							<div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
								<h4 className="text-xl font-semibold text-gray-900 mb-4">
									Express Shipping
								</h4>
								<div className="space-y-3">
									<div className="flex justify-between items-center py-2 border-b border-gray-200">
										<span className="font-medium text-gray-700">Express Delivery</span>
										<span className="text-gray-600">2-3 business days</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b border-gray-200">
										<span className="font-medium text-gray-700">Additional Cost</span>
										<span className="text-gray-600">₹200</span>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="font-medium text-gray-700">Available</span>
										<span className="text-green-600 font-semibold">All orders</span>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Order Processing */}
					<section>
						<h3 className="text-2xl font-semibold text-gray-900 mb-6">
							Order Processing
						</h3>
						<div className="bg-white border border-gray-200 rounded-lg p-6">
							<div className="grid md:grid-cols-3 gap-6">
								<div className="text-center">
									<div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-3">
										<span className="text-white font-bold">1</span>
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">Order Placed</h4>
									<p className="text-sm text-gray-600">You receive confirmation email immediately</p>
								</div>
								<div className="text-center">
									<div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-3">
										<span className="text-white font-bold">2</span>
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">Processing</h4>
									<p className="text-sm text-gray-600">1-2 business days (longer during peak seasons)</p>
								</div>
								<div className="text-center">
									<div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-3">
										<span className="text-white font-bold">3</span>
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">Shipped</h4>
									<p className="text-sm text-gray-600">Tracking information sent via email</p>
								</div>
							</div>
						</div>
					</section>

					{/* Tracking Orders */}
					<section>
						<h3 className="text-2xl font-semibold text-gray-900 mb-6">
							Order Tracking
						</h3>
						<div className="bg-gray-50 rounded-lg p-6">
							<div className="space-y-4">
								<div className="flex items-start">
									<div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
									<p className="text-gray-600">
										<strong>Tracking Information:</strong> Sent via email immediately after shipment
									</p>
								</div>
								<div className="flex items-start">
									<div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
									<p className="text-gray-600">
										<strong>Track Your Order:</strong> Use the provided tracking number on our website or carrier's website
									</p>
								</div>
								<div className="flex items-start">
									<div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
									<p className="text-gray-600">
										<strong>No Tracking Info?</strong> Contact us if you haven't received tracking within 2 business days
									</p>
								</div>
							</div>
						</div>
					</section>

					{/* Shipping Support */}
					<section>
						<h3 className="text-2xl font-semibold text-gray-900 mb-6">
							Shipping Support
						</h3>
						<div className="bg-gray-900 rounded-lg p-6 text-white">
							<h4 className="text-xl font-semibold mb-4">Contact Our Shipping Team</h4>
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<h5 className="font-medium mb-2">Email Support</h5>
									<p className="text-gray-300">support@viberaze.com</p>
									<p className="text-sm text-gray-400">Response within 24 hours</p>
								</div>
								<div>
									<h5 className="font-medium mb-2">Phone Support</h5>
									<p className="text-gray-300">+91 98765 43210</p>
									<p className="text-sm text-gray-400">Mon-Fri, 9AM-6PM IST</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50 py-12">
				<div className="container mx-auto px-4 max-w-6xl">
					{/* Page Header */}
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-4">My Profile</h1>
						<p className="text-gray-600">Manage your account settings and preferences</p>
					</div>

					<div className="flex flex-col lg:flex-row gap-8">
						{/* Sidebar */}
						<div className="lg:w-1/4">
							<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
								<div className="text-center mb-6">
									<div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
										<User size={32} className="text-gray-600" />
									</div>
									<h2 className="text-xl font-semibold text-gray-900">
										{userData?.name || userData?.displayName || 'User'}
									</h2>
									<p className="text-gray-500 text-sm">{userData?.email}</p>
								</div>

								<nav className="space-y-2">
									<button
										onClick={() => setActiveTab('profile')}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											activeTab === 'profile'
												? 'bg-gray-900 text-white'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<User size={20} />
										Profile
									</button>
									<button
										onClick={() => setActiveTab('orders')}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											activeTab === 'orders'
												? 'bg-gray-900 text-white'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<Package size={20} />
										Orders
									</button>
									<button
										onClick={() => setActiveTab('wishlist')}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											activeTab === 'wishlist'
												? 'bg-gray-900 text-white'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<Heart size={20} />
										Wishlist
									</button>
									<button
										onClick={() => setActiveTab('settings')}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											activeTab === 'settings'
												? 'bg-gray-900 text-white'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<Settings size={20} />
										Settings
									</button>
									<button
										onClick={() => setActiveTab('return-policy')}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											activeTab === 'return-policy'
												? 'bg-gray-900 text-white'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<FileText size={20} />
										Return Policy
									</button>
									<button
										onClick={() => setActiveTab('about')}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											activeTab === 'about'
												? 'bg-gray-900 text-white'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<Info size={20} />
										About
									</button>
									<button
										onClick={() => setActiveTab('contact')}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											activeTab === 'contact'
												? 'bg-gray-900 text-white'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<HelpCircle size={20} />
										Contact Us
									</button>
									<button
										onClick={() => setActiveTab('privacy')}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											activeTab === 'privacy'
												? 'bg-gray-900 text-white'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<Shield size={20} />
										Privacy
									</button>
									<button
										onClick={() => setActiveTab('terms')}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											activeTab === 'terms'
												? 'bg-gray-900 text-white'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<FileText size={20} />
										Terms & Conditions
									</button>
									<button
										onClick={() => setActiveTab('shipping')}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											activeTab === 'shipping'
												? 'bg-gray-900 text-white'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<Truck size={20} />
										Shipping Policy
									</button>
								</nav>
							</div>
						</div>

						{/* Main Content */}
						<div className="lg:w-3/4">
							<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
								{activeTab === 'profile' && renderProfileTab()}
								{activeTab === 'orders' && renderOrdersTab()}
								{activeTab === 'wishlist' && renderWishlistTab()}
								{activeTab === 'settings' && renderSettingsTab()}
								{activeTab === 'return-policy' && renderReturnPolicyTab()}
								{activeTab === 'about' && renderAboutTab()}
								{activeTab === 'contact' && renderContactUsTab()}
								{activeTab === 'privacy' && renderPrivacyTab()}
								{activeTab === 'terms' && renderTermsTab()}
								{activeTab === 'shipping' && renderShippingPolicyTab()}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

Profile.propTypes = {
	// Add any props if needed
};

export default Profile; 