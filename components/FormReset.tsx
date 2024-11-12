"use client";
import Link from 'next/link';
import React from 'react';

const FormReset = () => {
    const Reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement; // Correctly selecting the form
        if (form) form.reset(); // Resetting the form
    };

    return (
        <div>
            <button type="button" onClick={Reset}> 
                <Link href="/">
                reset
                </Link>
               
            </button>
        </div>
    );
};

export default FormReset;
