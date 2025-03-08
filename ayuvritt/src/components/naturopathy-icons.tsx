export function RoutineIcon() {
  return (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      <path d="M12 22c1-2 4-3 6-2" />
      <path d="M12 22c-1-2-4-3-6-2" />
      <path d="M12 2c2 1 3 4 2 6" />
      <path d="M12 2c-2 1-3 4-2 6" />
    </svg>
  );
}

export function ChecklistIcon() {
  return (
    <svg
      className="w-12 h-12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 11V6a3 3 0 0 1 6 0v5" />
      <path d="M12 12v9" />
      <path d="M5 12h14" />
      <path d="M5 18h14" />
    </svg>
  );
}

export function PlantIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Pot */}
      <path d="M7 19h10" />
      <path d="M7 19L5 13h14l-2 6" />

      {/* Main stem */}
      <path d="M12 13V6" />

      {/* Leaves */}
      <path d="M12 6s-3-3-3 0 3 3 3 0" />
      <path d="M12 6s3-3 3 0-3 3-3 0" />

      {/* Lower leaves */}
      <path d="M12 10s-2-2-2 0 2 2 2 0" />
      <path d="M12 10s2-2 2 0-2 2-2 0" />
    </svg>
  );
}
