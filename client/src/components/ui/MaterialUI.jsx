import React, { useState } from 'react';
import './MaterialUI.css';

// Material-UI-like Theme Provider
export const ThemeProvider = ({ children, theme = 'light' }) => (
  <div className={`mui-theme-${theme}`}>{children}</div>
);

// AppBar (Navbar)
export const AppBar = ({ position = 'static', children, className = '' }) => (
  <header className={`mui-appbar mui-appbar-${position} ${className}`}>
    {children}
  </header>
);

export const Toolbar = ({ children, className = '' }) => (
  <div className={`mui-toolbar ${className}`}>
    {children}
  </div>
);

// Typography
export const Typography = ({ 
  variant = 'body1', 
  component: Component = 'p', 
  children, 
  className = '',
  sx = {},
  ...props 
}) => (
  <Component 
    className={`mui-typography mui-${variant} ${className}`} 
    style={sx}
    {...props}
  >
    {children}
  </Component>
);

// Button
export const Button = ({ 
  variant = 'contained', 
  color = 'primary', 
  size = 'medium',
  component: Component = 'button',
  startIcon,
  endIcon,
  children, 
  className = '',
  sx = {},
  ...props 
}) => (
  <Component
    className={`mui-button mui-button-${variant} mui-button-${color} mui-button-${size} ${className}`}
    style={sx}
    {...props}
  >
    {startIcon && <span className="mui-button-icon-start">{startIcon}</span>}
    {children}
    {endIcon && <span className="mui-button-icon-end">{endIcon}</span>}
  </Component>
);

// Card
export const Card = ({ children, className = '', ...props }) => (
  <div className={`mui-card ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`mui-card-content ${className}`}>
    {children}
  </div>
);

export const CardActions = ({ children, className = '' }) => (
  <div className={`mui-card-actions ${className}`}>
    {children}
  </div>
);

export const CardMedia = ({ image, title, height = '200px', className = '' }) => (
  <div 
    className={`mui-card-media ${className}`}
    style={{ 
      backgroundImage: `url(${image})`,
      height: height
    }}
    title={title}
  />
);

// Container
export const Container = ({ maxWidth = 'lg', children, className = '' }) => (
  <div className={`mui-container mui-container-${maxWidth} ${className}`}>
    {children}
  </div>
);

// Grid
export const Grid = ({ 
  container = false, 
  item = false, 
  xs, sm, md, lg, xl,
  spacing = 0,
  children, 
  className = '',
  ...props 
}) => {
  const classes = [
    'mui-grid',
    container && 'mui-grid-container',
    item && 'mui-grid-item',
    xs && `mui-grid-xs-${xs}`,
    sm && `mui-grid-sm-${sm}`,
    md && `mui-grid-md-${md}`,
    lg && `mui-grid-lg-${lg}`,
    xl && `mui-grid-xl-${xl}`,
    container && spacing && `mui-grid-spacing-${spacing}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// TextField
export const TextField = ({ 
  label, 
  variant = 'outlined',
  fullWidth = false,
  error = false,
  helperText,
  className = '',
  ...props 
}) => (
  <div className={`mui-textfield mui-textfield-${variant} ${fullWidth ? 'mui-textfield-fullwidth' : ''} ${error ? 'mui-textfield-error' : ''} ${className}`}>
    {label && <label className="mui-textfield-label">{label}</label>}
    <input className="mui-textfield-input" {...props} />
    {helperText && <p className="mui-textfield-helper">{helperText}</p>}
  </div>
);

// Drawer (for mobile menu)
export const Drawer = ({ 
  anchor = 'left', 
  open = false, 
  onClose, 
  children, 
  className = '' 
}) => (
  <>
    {open && <div className="mui-drawer-backdrop" onClick={onClose} />}
    <div className={`mui-drawer mui-drawer-${anchor} ${open ? 'mui-drawer-open' : ''} ${className}`}>
      {children}
    </div>
  </>
);

// IconButton
export const IconButton = ({ children, className = '', sx = {}, ...props }) => (
  <button className={`mui-icon-button ${className}`} style={sx} {...props}>
    {children}
  </button>
);

// Menu
export const Menu = ({ anchorEl, open, onClose, children, className = '' }) => (
  <>
    {open && <div className="mui-menu-backdrop" onClick={onClose} />}
    <div 
      className={`mui-menu ${open ? 'mui-menu-open' : ''} ${className}`}
      style={{
        position: 'absolute',
        top: anchorEl?.offsetTop + anchorEl?.offsetHeight || 0,
        left: anchorEl?.offsetLeft || 0,
      }}
    >
      {children}
    </div>
  </>
);

export const MenuItem = ({ children, onClick, className = '' }) => (
  <div className={`mui-menu-item ${className}`} onClick={onClick}>
    {children}
  </div>
);

// Box (generic container)
export const Box = ({ 
  component: Component = 'div', 
  sx = {},
  className = '',
  children,
  ...props 
}) => (
  <Component 
    className={`mui-box ${className}`}
    style={sx}
    {...props}
  >
    {children}
  </Component>
);

// Avatar component
export const Avatar = ({ 
  children, 
  src,
  alt,
  sx = {},
  className = ''
}) => {
  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--mui-grey-400)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    overflow: 'hidden',
    ...sx
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`mui-avatar ${className}`}
        style={avatarStyle}
      />
    );
  }

  return (
    <div 
      className={`mui-avatar ${className}`}
      style={avatarStyle}
    >
      {children}
    </div>
  );
};

// Rating component
export const Rating = ({
  value = 0, 
  onChange, 
  max = 5, 
  readOnly = false,
  className = '',
  sx = {} 
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleStarClick = (starValue) => {
    if (!readOnly && onChange) {
      onChange(starValue);
    }
  };

  const handleStarHover = (starValue) => {
    if (!readOnly) {
      setHoverValue(starValue);
    }
  };

  const handleStarLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
    }
  };

  return (
    <div 
      className={`mui-rating ${readOnly ? 'mui-rating-readonly' : ''} ${className}`}
      style={sx}
    >
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;
        const isActive = (hoverValue || value) >= starValue;
        
        return (
          <span
            key={starValue}
            className={`mui-rating-star ${isActive ? 'mui-rating-star-active' : ''}`}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
            onMouseLeave={handleStarLeave}
            style={{
              cursor: readOnly ? 'default' : 'pointer',
              color: isActive ? '#ffc107' : '#e0e0e0',
              fontSize: '1.5rem',
              marginRight: '4px',
              transition: 'color 0.2s ease'
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};
