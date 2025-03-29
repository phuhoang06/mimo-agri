import React from 'react';

function SidebarBlock({
  title,
  children,
  className = 'mb-4',
  titleClassName = 'sidebar-title',
  ...props
}) {
  return (
    <div className={`sidebar-block ${className}`} {...props}>
      {title && <h5 className={titleClassName}>{title}</h5>}
      {children}
    </div>
  );
}

export default SidebarBlock;
