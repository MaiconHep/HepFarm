import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ options, value, onChange, placeholder = "Selecione..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Fecha o dropdown se clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="custom-select-container" ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <button 
        type="button"
        className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: '12px',
          border: isOpen ? '1px solid #0A84FF' : '1px solid transparent',
          background: isOpen ? 'rgba(118, 118, 128, 0.35)' : 'rgba(118, 118, 128, 0.24)',
          color: 'var(--text)',
          fontSize: '1rem',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 3px rgba(10, 132, 255, 0.3)' : 'none',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit'
        }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={18} style={{ color: 'rgba(235, 235, 245, 0.6)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div 
          className="custom-select-dropdown"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: 'rgba(28, 28, 30, 0.85)',
            backdropFilter: 'saturate(180%) blur(20px)',
            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
            border: '0.5px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            overflow: 'hidden',
            zIndex: 1000,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            animation: 'fadeInDrop 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          {options.map((opt, index) => (
            <div 
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              style={{
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                borderBottom: index < options.length - 1 ? '0.5px solid rgba(255,255,255,0.1)' : 'none',
                background: 'transparent',
                transition: 'background 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ 
                fontSize: '1rem', 
                color: 'var(--text)',
                fontWeight: value === opt.value ? '600' : '400' 
              }}>
                {opt.label}
              </span>
              {value === opt.value && <Check size={18} style={{ color: 'var(--accent)' }} />}
            </div>
          ))}
        </div>
      )}
      <style>{`
        @keyframes fadeInDrop {
          from { opacity: 0; transform: translateY(-4px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
