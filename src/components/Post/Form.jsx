import React, { useState, useEffect } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input';

export default function Form({showHide, ...props}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pos, setPos] = useState('');
    const [file, setFile] = useState('');  
    
    const [errNameMsg, setErrNameMsg] = useState('');
    const [errEmailMsg, setErrEmailMsg] = useState('');
    const [errPhoneMsg, setErrPhoneMsg] = useState('');
    const [errPosMsg, setErrPosMsg] = useState('');
    const [errFileMsg, setErrFileMsg] = useState('');

    const [nameClass, setNameClass] = useState('form-input');
    const [emailClass, seteEmailClass] = useState('form-input');
    const [phoneClass, setPhoneClass] = useState('form-input');
    const [fileClass, setFileClass] = useState('input_container select_file');

    const [job, setJob] = useState([]);
    const [token, setToken] = useState('');    
    const [disabled, setDisabled] = useState(true);
    const [val, setVal] = useState(false)    
    const [fileName, setFileName] = useState('Upload your photo')    
    
    const validationName = () => {
        let namePat = /[A-z]|[a-z]|[А-Я]|[а-я]/;
        if (name.match(namePat) && name.length > 2 && name.length < 60){
            setErrNameMsg('')
            setNameClass('form-input');
            // validationEmail(file);
        } else {
            setNameClass('form-input error');
            setErrNameMsg('Error, enter yor name');
        }
    }
    const validationEmail = () => {
        let emailPat = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        if (email.match(emailPat) && email.length > 2 && email.length < 100){
            setErrEmailMsg('');
            seteEmailClass('form-input');
            // validationPhone(file);
        } else {
            seteEmailClass('form-input error');
            setErrEmailMsg('Error, enter yor email correctly');
        }
    }
    const validationPhone = () => {
        let phonePat = /^\+?3?8?(0\d{9})$/;
        if (phone.match(phonePat) || phone.length >= 12){
            setErrPhoneMsg('');
            setPhoneClass('form-input')
            // validationPos(file);
        } else {
            setPhoneClass('form-input error');
            setErrPhoneMsg('Error, enter yor phone correctly');
        }
    }
    const validationPos = () => {
        if (pos !== ''){
            setErrPosMsg('');
            // validationFile(file);
        } else {
            setErrPosMsg('Select your position');
        }
    }
    const validationFile = () => {
        let fileFields = document.querySelector('.select_file .form-control');
         if (fileFields.files.length !== 0) {
            if (fileFields.files[0].size < 5242880){
                setErrFileMsg('');
                setFileClass('input_container select_file');
                setFile(fileFields.files[0]);
            } else {
                setFileClass('input_container select_file error');
                setErrFileMsg('The photo size must not be greater than 5 Mb');
            }
        } else {
            setFileClass('form-control error');
            setErrFileMsg('Please load photo');
        }
    }
    const checkFields = () => {
        console.log(name, email, phone, pos, file)
        if (name !== '' & email !== '' & phone !== '' & pos !== '' & file !== '') {
            setDisabled(false);
        }
        if (val === true) {
            validation();
        }
    }
    const validation = () => {
        validationName();
        validationEmail();
        validationPhone();
        validationPos();
        validationFile();
    }
    const sendForm = (data) => {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', { 
            method: 'POST', 
            body: data, 
            headers: { 'Token': token}, 
        }) 
            .then(function(response) { return response.json(); }) 
            .then(function(data) { 
                if(data.success) {
                    showHide();
                }
            })
            .catch((error) => {
                alert('Please fill out the form');
                console.log('Error parsing JSON:', error);
            });
    }
    const sendPost = (el) => {
        el.preventDefault();
        setVal(true);
        validation();
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token') 
        .then(data => {
            return data.json();
        })
        .then( 
            (result) => {
                setToken(result.token);
                // validation(fileField);
                let formData = new FormData();
                formData.append('position_id', 2); 
                formData.append('name', name); 
                formData.append('email', email);
                formData.append('phone', phone); 
                formData.append('position', pos); 
                formData.append('photo', file);
                sendForm(formData);
        })
    }
    useEffect(() => {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(data => {
                return data.json();
            })
            .then( 
                (result) => {
                    setJob(result.positions);
            })
    }, [])
    return (
        <form {...props} onSubmit={sendPost}>
            <div className="input_container name_input">
                <Input className={nameClass} type="text" placeholder='Your name' onChange={(event) => {
                    setName(event.target.value);
                    checkFields();
                    }}/>
                <label htmlFor="" className="input_label">Your name</label>
                <span className="error">{errNameMsg}</span>
            </div>
            <div className="input_container email_input">
                <Input className={emailClass} type="text" placeholder='Email' onChange={(event) => {
                     setEmail(event.target.value);
                     checkFields();
                    }}/>
                <label htmlFor="" className="input_label">Email</label>
                <span className="error">{errEmailMsg}</span>

            </div>
            <div className="input_container phone_input">
                <Input className={phoneClass} type="text" placeholder='Phone' onChange={(event) => {
                    setPhone(event.target.value);
                    checkFields();
                }}/>
                <label htmlFor="" className="input_label">Phone</label>
                <span className='phone_ex'>+38 (XXX) XXX - XX - XX</span>
                <span className="error">{errPhoneMsg}</span>
            </div>
            <div className='select_position'>
                <p>Select your position</p>
                {job.map(item => (
                    <div key={item.id} className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" data-name={item.name} id={item.id} onChange={(event) => {
                            setPos(event.target.id);
                            checkFields();
                        }}/>
                        <label className="form-check-label" htmlFor={item.id}>{item.name}</label>
                    </div>
                ))}
                <span className="error">{errPosMsg}</span>
            </div>
            <div className={fileClass}>
                <label htmlFor="inputfile" className="label">Upload</label>
                <Input required type="file" className="form-control" id="inputfile" aria-describedby="inputGroupFileAddon04" aria-label="Upload" 
                    onInput={(event) => {
                        setFile(event.target.files[0]);
                        setFileName(event.target.files[0].name)
                    }}
                    onChange={checkFields}
                />
                <label htmlFor="inputfile" className="fileLabel">{fileName}</label>
                <span className="error">{errFileMsg}</span>
            </div>
            <Button  disabled={disabled} className='btn primary-btn'>Sign up</Button>
        </form>
    )
}
