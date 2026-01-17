import React, { useEffect, useState } from "react";

const TypingText = ({ phrases, typingSpeed = 100, deletingSpeed = 50, delayBetween = 2000 }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    const current = phrases[loopIndex % phrases.length];
    let timeout;

    if (!isDeleting && text.length < current.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, typingSpeed);
    } else if (isDeleting && text.length > 0) {
      // Deleting backward
      timeout = setTimeout(() => {
        setText(current.slice(0, text.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && text.length === current.length) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && text.length === 0) {
      // Move to next phrase
      setIsDeleting(false);
      setLoopIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phrases, loopIndex, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className="text-yellow-900">
      <i>{text}</i>
      <span className="animate-pulse">|</span> {/* blinking cursor */}
    </span>
  );
};

export default TypingText;
