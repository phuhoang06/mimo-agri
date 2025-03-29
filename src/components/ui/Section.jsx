import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';

function Section({
  id,
  title,
  children,
  className = '',
  containerClassName = 'page-content-container px-3 px-md-4',
  containerFluid = true,
  actionButton,
  actionButtonText,
  actionButtonVariant = 'outline-success',
  actionButtonSize = 'sm',
  actionButtonIcon,
  onActionButtonClick,
  sectionRef,
}) {
  return (
    <section id={id} className={`mt-5 ${className}`} ref={sectionRef}>
      <Container fluid={containerFluid} className={containerClassName}>
        <div className="category-container">
          {title && (
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="category-title mb-0">{title}</h2>
              {actionButton && onActionButtonClick && (
                <Button 
                  variant={actionButtonVariant} 
                  size={actionButtonSize} 
                  onClick={onActionButtonClick}
                >
                  {actionButtonIcon && <i className={`${actionButtonIcon} me-2`}></i>}
                  {actionButtonText}
                </Button>
              )}
            </div>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}

export default Section;
