import { useState } from 'react';

function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">Subscribe</button>
        </form>
        {submitted && <p className="mt-4 text-green-600 font-medium">Thank you for subscribing!</p>}
      </div>
    </section>
  );
}

export default NewsletterSubscription; 