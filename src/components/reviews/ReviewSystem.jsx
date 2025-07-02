import React, { useState, useEffect, useContext } from 'react';
import { Star, ThumbsUp, MessageCircle, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import myContext from '../../context/data/myContext';
import PropTypes from 'prop-types';

const ReviewSystem = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    pros: '',
    cons: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const { mode } = useContext(myContext);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      const reviewsQuery = query(
        collection(fireDB, 'reviews'),
        where('productId', '==', productId),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(reviewsQuery);
      const reviewsData = [];
      let totalRating = 0;
      const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      
      querySnapshot.forEach((doc) => {
        const review = { id: doc.id, ...doc.data() };
        reviewsData.push(review);
        totalRating += review.rating;
        distribution[review.rating]++;
      });
      
      setReviews(reviewsData);
      setStats({
        averageRating: reviewsData.length > 0 ? (totalRating / reviewsData.length).toFixed(1) : 0,
        totalReviews: reviewsData.length,
        ratingDistribution: distribution
      });
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error('Please login to submit a review');
      setLoading(false);
      return;
    }

    if (!userReview.title.trim() || !userReview.comment.trim()) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const reviewData = {
        productId,
        userId: user.user?.uid || user.uid,
        userName: (user.user?.email || user.email).split('@')[0], // Use email prefix as username
        rating: userReview.rating,
        title: userReview.title,
        comment: userReview.comment,
        pros: userReview.pros,
        cons: userReview.cons,
        timestamp: Timestamp.now(),
        helpful: 0,
        verified: true // In a real app, this would be based on purchase verification
      };

      await addDoc(collection(fireDB, 'reviews'), reviewData);
      
      toast.success('Review submitted successfully!');
      setUserReview({ rating: 5, title: '', comment: '', pros: '', cons: '' });
      setShowReviewForm(false);
      loadReviews(); // Reload reviews to show the new one
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleHelpful = async (reviewId, currentHelpful) => {
    try {
      // In a real app, you'd update the helpful count in Firestore
      const updatedReviews = reviews.map(review =>
        review.id === reviewId
          ? { ...review, helpful: currentHelpful + 1 }
          : review
      );
      setReviews(updatedReviews);
      toast.success('Thank you for your feedback!');
    } catch (error) {
      console.error('Error updating helpful count:', error);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onRatingChange(star) : undefined}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Star
              size={20}
              className={`${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const renderRatingDistribution = () => {
    const maxCount = Math.max(...Object.values(stats.ratingDistribution));
    
    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = stats.ratingDistribution[rating];
          const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
          
          return (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-8">{rating}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.averageRating}
              </div>
              {renderStars(Math.round(stats.averageRating))}
              <div className="text-sm text-gray-600 mt-1">
                {stats.totalReviews} reviews
              </div>
            </div>
            <div className="flex-1 max-w-xs">
              {renderRatingDistribution()}
            </div>
          </div>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating *
              </label>
              {renderStars(userReview.rating, true, (rating) => 
                setUserReview(prev => ({ ...prev, rating }))
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Review Title *
              </label>
              <input
                type="text"
                value={userReview.title}
                onChange={(e) => setUserReview(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Summarize your experience"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Review *
              </label>
              <textarea
                value={userReview.comment}
                onChange={(e) => setUserReview(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your detailed experience with this product"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What you liked
                </label>
                <textarea
                  value={userReview.pros}
                  onChange={(e) => setUserReview(prev => ({ ...prev, pros: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What did you like about this product?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What could be improved
                </label>
                <textarea
                  value={userReview.cons}
                  onChange={(e) => setUserReview(prev => ({ ...prev, cons: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What could be better?"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{review.title}</h4>
                      {review.verified && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    {renderStars(review.rating)}
                    <p className="text-sm text-gray-600 mt-1">
                      by {review.userName} • {new Date(review.timestamp.seconds * 1000).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleHelpful(review.id, review.helpful)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ThumbsUp size={16} />
                    Helpful ({review.helpful})
                  </button>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
                
                {(review.pros || review.cons) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {review.pros && (
                      <div>
                        <h5 className="font-medium text-green-700 mb-1">Pros:</h5>
                        <p className="text-gray-600">{review.pros}</p>
                      </div>
                    )}
                    {review.cons && (
                      <div>
                        <h5 className="font-medium text-red-700 mb-1">Cons:</h5>
                        <p className="text-gray-600">{review.cons}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

ReviewSystem.propTypes = {
  productId: PropTypes.string.isRequired
};

export default ReviewSystem; 