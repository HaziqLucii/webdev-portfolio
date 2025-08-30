import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ 
  endValue, 
  suffix = '', 
  className = '', 
  duration = 2,
  ease = 'power2.out' 
}) => {
  const counterRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    // Initialize with 0
    const counterObj = { value: 0 };
    element.textContent = '0' + suffix;

    // Create the animation
    animationRef.current = gsap.to(counterObj, {
      value: endValue,
      duration: duration,
      ease: ease,
      onUpdate: () => {
        element.textContent = Math.floor(counterObj.value) + suffix;
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        once: true
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [endValue, suffix, duration, ease]);

  return (
    <span ref={counterRef} className={className}>
      0{suffix}
    </span>
  );
};

export default Counter;