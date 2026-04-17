const StarField = () => (
  <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden="true">
    {[...Array(120)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          width: `${Math.random() > 0.9 ? 2 : 1}px`,
          height: `${Math.random() > 0.9 ? 2 : 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.7 + 0.1,
          animation: `twinkle ${3 + Math.random() * 5}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
);

export default StarField;