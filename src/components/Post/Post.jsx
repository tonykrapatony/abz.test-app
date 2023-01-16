import React, { useState } from 'react'
import Form from './Form';
import Success from './Success';

export default function Post() {
    const [sendForm, setSendForm] = useState('post_form');
    const [successMsg, setSuccessMsg] = useState('success_block hide');

    const showHide = (class1,) => {
        setSendForm('post_form hide');
        setSuccessMsg('success_block show');
    }

    return (
        <div className="post-block">
            <h1 className="h1">Working with POST request</h1>
            <Form showHide={showHide} className={sendForm}></Form>
            <Success className={successMsg}></Success>
        </div>
    )
}
