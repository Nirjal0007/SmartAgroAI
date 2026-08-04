export default function GlassCard({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`glass rounded-xl2 ${className}`} {...props}>
      {children}
    </Tag>
  );
}
