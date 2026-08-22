import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" to="/" aria-label="SafeFun home">
      <span className="brand-mark">
        <ShieldCheck size={compact ? 17 : 20} strokeWidth={2.4} />
      </span>
      <span>SafeFun</span>
      {!compact && <span className="brand-tag">PREVIEW</span>}
    </Link>
  );
}
