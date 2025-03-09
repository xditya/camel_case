import { motion } from "framer-motion";

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

export function GrowingTreeIcon({
  progress = 0,
  ...props
}: React.SVGProps<SVGSVGElement> & { progress?: number }) {
  const branchProgress = Math.max(0, (progress - 0.3) * 1.5); // Branches start after 30% stem growth

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
      <path d="M8 20h8" />
      <path d="M8 20l-1-3h10l-1 3" />

      {/* Main stem */}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 0.5 }}
        d="M12 17V7"
      />

      {/* Branches and Leaves */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: branchProgress }}
        transition={{ duration: 0.3 }}
      >
        {/* Lower branches */}
        <path d="M12 15l-2-1.5" />
        <path d="M12 15l2-1.5" />

        {/* Middle branches */}
        <path d="M12 12l-3-2" />
        <path d="M12 12l3-2" />

        {/* Upper branches */}
        <path d="M12 9l-2-1.5" />
        <path d="M12 9l2-1.5" />

        {/* Top */}
        <path d="M12 7l-1-1" />
        <path d="M12 7l1-1" />
      </motion.g>
    </svg>
  );
}

export function PrescriptionIcon(props: React.SVGProps<SVGSVGElement>) {
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
      {/* Paper */}
      <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />

      {/* Top lines */}
      <path d="M8 7h8" />
      <path d="M8 10h8" />

      {/* Rx Symbol */}
      <path d="M8 14h2l1-1" />
      <path d="M8 13l3 3" />

      {/* Bottom lines */}
      <path d="M13 14h3" />
      <path d="M8 17h8" />
    </svg>
  );
}

export function SkincareIcon(props: React.SVGProps<SVGSVGElement>) {
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
      {/* Bottle */}
      <path d="M12 3v2" />
      <path d="M9 5h6" />
      <path d="M8 8h8l-1 11H9L8 8z" />

      {/* Decorative drops */}
      <path d="M11 11s-1 1-1 2 1 2 1 2" />
      <path d="M13 14s1-1 1-2-1-2-1-2" />

      {/* Circular cap */}
      <circle cx="12" cy="4" r="1" />
    </svg>
  );
}
