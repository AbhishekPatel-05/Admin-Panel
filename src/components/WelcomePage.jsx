import React from 'react';

const WelcomePage = ({ onEnter }) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(to bottom right, #4f46e5, #4338ca)', // Gradient from indigo-600 to indigo-400
        color: 'white',
        padding: '0 1.5rem', // Equivalent to px-6
        textAlign: 'center'
      }}
    >
      <h1 
        style={{
          fontSize: '3rem', // Equivalent to text-5xl
          fontFamily: 'Roboto Slab, serif', // Ensure this font is available
          fontWeight: 'bold',
          marginBottom: '1.5rem', // Equivalent to mb-6
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' // Drop shadow effect
        }}
      >
        Welcome to AI Copilot Admin Panel
      </h1>
      <p 
        style={{
          maxWidth: '36rem', // Equivalent to max-w-xl
          marginBottom: '2.5rem', // Equivalent to mb-10
          fontSize: '1.125rem', // Equivalent to text-lg
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' // Drop shadow effect
        }}
      >
        Enhance your agent's experience with AI-powered chat inbox and smart assistance.
      </p>
      <button
        onClick={onEnter}
        style={{
          background: 'white',
          color: '#4f46e5', // Equivalent to text-indigo-700
          fontWeight: '600',
          padding: '0.5rem 2rem', // Equivalent to px-8 py-4
          borderRadius: '0.5rem', // Equivalent to rounded-lg
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
          transition: 'box-shadow 0.2s ease',
          fontSize: '1.25rem', // Equivalent to text-xl
          outline: 'none',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)'} // Hover effect
        onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'} // Reset effect
      >
        Enter Admin Panel
      </button>
    </div>
  );
};

export default WelcomePage;
