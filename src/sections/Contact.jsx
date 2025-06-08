import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import Lottie from 'lottie-react';
import emailSuccess from '/src/assets/email-success.json';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

// service_yc4kktm
// template_uqix68r
// eM8wMXpga5fNYFa_6

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_yc4kktm",
        "template_uqix68r",
        {
          from_name: form.name,
          to_name: 'Rahul',
          from_email: form.email,
          to_email: 'rahulrina09082003@gmail.com',
          message: form.message,
        },
        "eM8wMXpga5fNYFa_6"
      )
      .then(
        () => {
          setLoading(false);
          setEmailSent(true);
          showAlert({
            show: true,
            text: 'Thank you for your message 😃',
            type: 'success',
          });

          setTimeout(() => {
            setEmailSent(false);
            hideAlert(false);
            setForm({ name: '', email: '', message: '' });
          }, 3500);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: 'danger',
          });
        }
      );
  };

  return (
    <section
      className="relative overflow-hidden w-full py-20 px-4 sm:px-8 bg-black"
      id="contact"
    >
      {alert.show && <Alert {...alert} />}

      {/* Terminal-style window */}
      <div className="relative z-10 max-w-3xl mx-auto bg-black/80 p-8 rounded-xl backdrop-blur-md shadow-lg border border-gray-700">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="w-3 h-3 bg-green-500 rounded-full" />
        </div>

        {/* Animated heading */}
        <h3 className="text-4xl font-extrabold text-white font-mono animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-4">
          Let's Talk
        </h3>
        <p className="text-gray-400 text-lg mt-4 font-mono">
          Whether you're looking to build a new website, improve your existing platform, or bring a unique project to life , I'm here to help.
        </p>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6"
        >
          <label className="flex flex-col gap-2">
            <span className="text-green-400 font-mono">// Full Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-gray-900 text-white px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              placeholder="e.g., John Doe"
              autocomplete="name"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-green-400 font-mono">// Email Address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-gray-900 text-white px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              placeholder="e.g., john@example.com"
               autocomplete="email"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-green-400 font-mono">// Your Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              required
              className="bg-gray-900 text-white px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
              placeholder="Hi, I wanna give you a job ..."
              autocomplete="off"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 transition-all text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
          >
            {loading ? 'Sending...' : 'Send Message'}
            <img src="/assets/arrow-up.png" alt="arrow-up" className="w-4 h-4" />
          </button>

          <p className="text-xs text-gray-500 mt-4 font-mono text-center">
            // console.log("Thanks for reaching out 👋")
          </p>
        </form>
      </div>

      {/* Email sent animation overlay */}
      {emailSent && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]">
          <Lottie
            animationData={emailSuccess}
            loop={false}
            animationSpeed={3}  // <- Faster animation speed
            className="w-48 h-48"
          />
        </div>
      )}
    </section>
  );
};

export default Contact;
