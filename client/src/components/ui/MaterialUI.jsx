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
  ...props 
}) => (
  <Component className={`mui-typography mui-${variant} ${className}`} {...props}>
    {children}
  </Component>
);

// Button
export const Button = ({ 
  variant = 'contained', 
  color = 'primary', 
  size = 'medium',
  startIcon,
  endIcon,
  children, 
  className = '',
  ...props 
}) => (
  <button 
    className={`mui-button mui-button-${variant} mui-button-${color} mui-button-${size} ${className}`}
    {...props}
  >
    {startIcon && <span className="mui-button-icon-start">{startIcon}</span>}
    {children}
    {endIcon && <span className="mui-button-icon-end">{endIcon}</span>}
  </button>
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
export const IconButton = ({ children, className = '', ...props }) => (
  <button className={`mui-icon-button ${className}`} {...props}>
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