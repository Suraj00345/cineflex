import React, { useEffect, useState } from "react";

const ScrollOnTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll smoothly to top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={handleScrollToTop}
        className={`bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-full shadow-lg transition-all duration-300 focus:outline-none ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-up"
        >
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </svg>
      </button>
    </div>
  );
};

export default ScrollOnTop;
