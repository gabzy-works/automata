import React, { useState } from 'react';
import { Mail, Send, MapPin, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle sending the form data
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 flex items-center justify-center py-16">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl p-0 border border-gray-100 overflow-hidden">
        {/* Info Card */}
        <div className="bg-gradient-to-br from-indigo-700 to-purple-700 text-white flex flex-col justify-between p-8">
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Mail className="h-8 w-8 text-indigo-200" /> Contact Us
            </h2>
            <p className="mb-6 text-indigo-100 font-medium">
              We'd love to hear from you! Whether you have a question about automata theory, want to collaborate, or just want to say hello, our team is ready to answer all your questions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-indigo-200" />
                <span>automata@dlsud.edu.ph</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-indigo-200" />
                <span>De La Salle University - Dasmariñas, Cavite, Philippines</span>
              </div>
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-indigo-200" />
                <a href="https://github.com/yourusername/automata-theory-explorer" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-300">GitHub</a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-indigo-200" />
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-300">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-indigo-200 text-sm">from DLSUD and BCS33</div>
        </div>
        {/* Form Card */}
        <div className="p-8 flex flex-col justify-center">
          {submitted ? (
            <div className="text-center text-green-600 font-semibold text-lg py-8">
              Thank you for reaching out! We'll get back to you soon.
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md text-lg"
              >
                <Send className="h-5 w-5" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact; 