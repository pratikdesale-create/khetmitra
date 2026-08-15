type OrganicBackgroundProps = {
  variant?: "default" | "subtle";
  className?: string;
};

export function OrganicBackground({ variant = "default", className = "" }: OrganicBackgroundProps) {
  const opacity = variant === "subtle" ? 0.08 : 0.18;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        className="absolute -top-24 -left-24 w-96 h-96"
        viewBox="0 0 400 400"
        style={{ opacity }}
      >
        <path
          d="M200,50 C280,50 350,120 350,200 C350,280 280,350 200,350 C120,350 50,280 50,200 C50,120 120,50 200,50 Z"
          fill="currentColor"
          className="text-secondary"
          style={{ filter: "blur(40px)" }}
        />
      </svg>
      <svg
        className="absolute -bottom-32 -right-16 w-[28rem] h-[28rem]"
        viewBox="0 0 400 400"
        style={{ opacity }}
      >
        <path
          d="M180,40 C260,60 360,100 370,190 C380,280 300,360 200,360 C100,360 30,280 40,190 C50,100 100,20 180,40 Z"
          fill="currentColor"
          className="text-primary"
          style={{ filter: "blur(50px)" }}
        />
      </svg>
      <svg
        className="absolute top-1/3 left-1/2 w-72 h-72 -translate-x-1/2"
        viewBox="0 0 400 400"
        style={{ opacity: opacity * 0.7 }}
      >
        <path
          d="M200,60 C270,70 330,130 330,200 C330,270 270,330 200,330 C130,330 70,270 70,200 C70,130 130,50 200,60 Z"
          fill="currentColor"
          className="text-accent"
          style={{ filter: "blur(60px)" }}
        />
      </svg>
    </div>
  );
}