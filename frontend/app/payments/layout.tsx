// frontend/app/payments/layout.tsx
import './payments.css';

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="payments-layout">{children}</section>;
}