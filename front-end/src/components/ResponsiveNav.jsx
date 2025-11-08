import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

/**
 * ResponsiveNav Component with React Router Link support
 * 
 * @param {Array} items - Navigation items [{ id, label, to }]
 * @param {ReactNode} logo - Custom logo component (optional)
 * @param {Function} onItemClick - Callback when nav item is clicked (optional)
 * @param {String} logoTo - Logo link destination (default: '/')
 * @param {Boolean} useLinks - Use React Router Links instead of <a> tags (default: true)
 * 
 * @example
 * const navItems = [
 *   { id: 1, label: 'Home', to: '/' },
 *   { id: 2, label: 'Products', to: '/products' },
 * ];
 * 
 * <ResponsiveNav items={navItems} />
 */
function ResponsiveNav({ 
  items = [], 
  onItemClick,
  useLinks = true // Toggle between Link and <a> tags
}) {
  const [visibleItems, setVisibleItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const itemsRef = useRef([]);
  
  // Get current location for active state
  const location = useLocation ? useLocation() : null;

  const calculateVisibleItems = () => {
    if (!navRef.current) return;

    const containerWidth = navRef.current.offsetWidth;
    const hamburgerWidth = 60;
    let usedWidth = 0;
    const visible = [];
    const hidden = [];

    items.forEach((item, index) => {
      const itemWidth = itemsRef.current[index]?.offsetWidth || 120;
      
      if (usedWidth + itemWidth + hamburgerWidth < containerWidth) {
        visible.push(item);
        usedWidth += itemWidth;
      } else {
        hidden.push(item);
      }
    });

    setVisibleItems(visible);
    setHiddenItems(hidden);
  };

  useEffect(() => {
    calculateVisibleItems();

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleItems();
    });

    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [items]);

  const handleItemClick = (item, e) => {
    setMenuOpen(false);
    
    if (onItemClick) {
      onItemClick(item);
    }
  };

  /**
   * Check if current path matches the nav item
   */
  const isActive = (item) => {
    if (!location) return false;
    return location.pathname === item.to;
  };

  /**
   * Render navigation item - either as Link or <a> tag
   */
  const renderNavItem = (item, index, isDropdown = false) => {
    const baseClasses = isDropdown
      ? "block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
      : "px-4 py-2 rounded-md text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-all whitespace-nowrap";
    
    const activeClasses = isActive(item) 
      ? "bg-yellow-100 text-yellow-700 font-semibold" 
      : "";
    
    const visibilityClass = !isDropdown && !visibleItems.find(v => v.id === item.id) 
      ? "hidden" 
      : "block";

    const className = `${baseClasses} ${activeClasses} ${visibilityClass}`;

    // Use React Router Link
    if (useLinks) {
      return (
        <Link
          key={item.id}
          to={item.to || '/'}  // Uses item.to (e.g., '/products', '/about')
          ref={!isDropdown ? el => itemsRef.current[index] = el : null}
          className={className}
          onClick={(e) => handleItemClick(item, e)}
        >
          {item.label}
        </Link>
      );
    }

    // Use regular <a> tag (for external links or non-React Router apps)
    return (
      <a
        key={item.id}
        href={item.to || '#'}  // Uses item.to (e.g., '/products', '/about')
        ref={!isDropdown ? el => itemsRef.current[index] = el : null}
        className={className}
        onClick={(e) => handleItemClick(item, e)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <nav className="mt-0 w-full" role="navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">

          {/* Navigation Container */}
          <div 
            ref={navRef} 
            className="flex-1 flex items-center font-bold justify-end gap-1 ml-8"
          >
            {/* Visible Navigation Items */}
            {items.map((item, index) => renderNavItem(item, index, false))}

            {/* Hamburger Menu */}
            {hiddenItems.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 rounded-md text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                  aria-label="Toggle menu"
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {menuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setMenuOpen(false)}
                    />
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      {hiddenItems.map((item) => renderNavItem(item, null, true))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ResponsiveNav;
