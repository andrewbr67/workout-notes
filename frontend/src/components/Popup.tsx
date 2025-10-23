import React, { type ReactNode, useEffect } from 'react';
import styles from './Popup.module.css';

interface PopupProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export default function Popuo({ isOpen, onClose, children }: PopupProps) {
    
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () =>  document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className = {styles.popup} onClick={onClose}>
            <div className = {styles.popupContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}