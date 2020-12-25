import React, {useEffect, useState} from 'react';
import buttonStyles from '../css-modules/buttons.module.css'
import styles from '../css-modules/admindetails.module.css'
import {AiFillEye, AiFillEyeInvisible, BsPersonSquare} from "react-icons/all";
import {generator} from "../constants/passwordGenerator";

const defaultRole = 'Administrator';

const AdminDetails = ({activeUser, mode, counter, addEditUser, setActiveUser}) => {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [role, setRole] = useState(defaultRole);
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [description, setDescription] = useState('');

        const [typePassword, setTypePassword] = useState('password');
        const [openEyeVisibility, setOpenEyeVisibility] = useState('');
        const [closedEyeVisibility, setClosedEyeVisibility] = useState('d-none');
        const [toggleInput, setToggleInput] = useState('');
        const [toggleInputPass, setToggleInputPass] = useState('');
        const [toggleInputConfirm, setToggleInputConfirm] = useState('');


        useEffect(() => {
            if (activeUser.id) {
                setFirstName(activeUser.firstname);
                setLastName(activeUser.lastname);
                setUsername(activeUser.username);
                setEmail(activeUser.email);
                setRole(activeUser.role);
                setDescription(activeUser.description);
            } else {
                setFirstName('');
                setLastName('');
                setUsername('');
                setEmail('');
                setRole(defaultRole);
                setDescription('');
                setPassword('');
                setConfirmPassword('');
            }
        }, [activeUser, mode]);

        function checkPasswordMatch() {
            return password.trim() === confirmPassword.trim();
        }

        function checkPasswordRegex(password) {
            let count = 0;
            //Length
            if(password.length>=8) {
                count += 1;
            }
            //UpperCase
            if( /[A-Z]/.test(password) ) {
                count += 1;
            }
            //Lowercase
            if( /[a-z]/.test(password) ) {
                count += 1;
            }
            //Numbers
            if( /\d/.test(password) ) {
                count += 1;
            }
            return count===4;
        }

        function handleSave() {
            let checkPassword;
            let checkFields;
            let passwordRequirements;
            switch (mode) {
                case 'edit':
                    checkFields = username && firstName && lastName && email && role;
                    if (checkFields) {
                        checkPassword = true;
                        passwordRequirements = true;
                    }
                    break;
                default:
                    checkFields = username && firstName && lastName && email && role && password && confirmPassword;
                    if (checkFields) {
                        checkPassword = checkPasswordMatch();
                        passwordRequirements = checkPasswordRegex(password);
                    }
                    break;
            }

            if (checkFields) {
                if (checkPassword) {
                    if (passwordRequirements) {
                        const newUser = {
                            "id": activeUser.id || counter,
                            "username": username,
                            "firstname": firstName,
                            "lastname": lastName,
                            "email": email,
                            "role": role,
                            "password": password,
                            "description": description
                        }
                        addEditUser(newUser);
                    } else {
                        alert('Password does not meet requirements');
                    }
                } else {
                    alert('Passwords not match');
                }
            } else {
                alert('Not all fields are filled')
            }
        }

        function handleCancel() {
            setFirstName('');
            setLastName('');
            setUsername('');
            setEmail('');
            setRole(defaultRole);
            setDescription('');
            setPassword('');
            setConfirmPassword('');
            setActiveUser('');
        }


        if (activeUser) {
            return (
                <div className='row'>
                    <div className='col-12 mt-2'>
                        {mode === 'edit' ? <h2 className={`mb-1`}>{activeUser.role} Details</h2> :
                            <h2 className={`mb-1`}>New Admin Details</h2>}
                        <div className='row justify-content-between'>
                            <div className='col-auto'>
                                <span className={`${styles.label}`}>Admin details</span>
                            </div>
                            <div className='col-auto'>
                            <span className={`${buttonStyles.button} ${buttonStyles.buttonSave} mr-2`}
                                  onClick={() => {
                                      handleSave();
                                  }}

                            >Save</span>
                                <span className={`${buttonStyles.button} ${buttonStyles.buttonCancel}`}

                                      onClick={() => {
                                          handleCancel();
                                      }}
                                >Cancel</span>
                            </div>
                        </div>
                        <hr/>


                        <div className='mb-1'>
                            <label htmlFor='firstName' className={`${styles.label} `}>
                                First Name:<sup className={`${styles.tip}`}>*</sup></label>
                            <div className={`${styles.inputWrapper} d-block ${toggleInput}`}>
                                <input id='firstName' name='firstName' type='text'
                                       value={firstName}
                                       className={`${styles.innerInput}`}
                                       onChange={event => {
                                           setFirstName(event.target.value);
                                       }}
                                       onFocus={(event) => {
                                           event.stopPropagation();
                                           setToggleInput(styles.inputWrapperFocused);
                                       }}
                                       onBlur={(event) => {
                                           event.stopPropagation();
                                           setToggleInput('');
                                       }}

                                />
                                <BsPersonSquare size='1.3em' color='lightgrey'/>


                            </div>

                        </div>

                        <div className='mb-1'>

                            <label htmlFor='lastName' className={`${styles.label}`}>
                                Last Name:<sup className={`${styles.tip}`}>*</sup></label>

                            <input id='lastName' name='lastName' type='text' value={lastName}
                                   className={`${styles.input} d-block`}
                                   onChange={event => {
                                       setLastName(event.target.value);
                                   }}/>
                        </div>

                        <div className='mb-1'>
                            <label htmlFor='username' className={`${styles.label}`}>
                                Username:<sup className={`${styles.tip}`}>*</sup></label>
                            <input id='username' name='username' type='text' value={username}
                                   className={`${styles.input} d-block`} onChange={event => {
                                setUsername(event.target.value);
                            }}
                            />
                        </div>

                        <div className='mb-1'>
                            <label htmlFor='email' className={`${styles.label}`}>
                                Email:<sup className={`${styles.tip}`}>*</sup></label>
                            <input id='email' name='email' type='text' value={email}
                                   className={`${styles.input} d-block`}
                                   onChange={event => {
                                       setEmail(event.target.value);
                                   }}/>
                        </div>

                        {mode === 'add' ? <div className='mb-1'>
                                <label htmlFor='password' className={`${styles.label}`}>
                                    Password:<sup className={`${styles.tip}`}>*</sup></label>
                                <div className='d-block'>
                                    <div className={`${styles.inputWrapper} d-inline-block  ${toggleInputPass}`}>
                                        <input id='password' name='password' type={typePassword} value={password}
                                               className={`${styles.innerInput}`}
                                               onChange={event => {
                                                   setPassword(event.target.value);
                                               }}
                                            onFocus={(event) => {
                                                event.stopPropagation();
                                                setToggleInputPass(styles.inputWrapperFocused);
                                            }}
                                               onBlur={(event) => {
                                                   event.stopPropagation();
                                                   setToggleInputPass('');
                                               }}
                                        />
                                        <AiFillEye size='1.5em' className={openEyeVisibility} onClick={() => {
                                            setTypePassword('text');
                                            setOpenEyeVisibility('d-none');
                                            setClosedEyeVisibility('');
                                        }}/>
                                        <AiFillEyeInvisible size='1.5em' className={closedEyeVisibility} onClick={() => {
                                            setTypePassword('password');
                                            setOpenEyeVisibility('');
                                            setClosedEyeVisibility('d-none');
                                        }}/>

                                    </div>
                                    <span className={`${buttonStyles.button} ${buttonStyles.buttonSave} ml-2`}
                                          onClick={() => {
                                              const generatedPassword = generator.generate({
                                                  length: 8,
                                                  numbers: true,
                                                  lowercase: true,
                                                  uppercase: true,
                                                  strict: true
                                              });
                                              setPassword(generatedPassword);
                                              setConfirmPassword(generatedPassword);
                                          }}>Generate</span>


                                </div>
                            </div>
                            : null}

                        {mode === 'add' ? <div className='mb-1'>
                            <label htmlFor='confirmPassword' className={`${styles.label}`}>
                                Retype Password:<sup className={`${styles.tip}`}>*</sup></label>
                            <div className={`${styles.inputWrapper} d-block  ${toggleInputConfirm}`}>
                                <input id='confirmPassword' name='confirmPassword' type={typePassword}
                                       value={confirmPassword}
                                       className={`${styles.innerInput}`}
                                       onChange={event => {
                                           setConfirmPassword(event.target.value);
                                       }}
                                       onFocus={(event) => {
                                           event.stopPropagation();
                                           setToggleInputConfirm(styles.inputWrapperFocused);
                                       }}
                                       onBlur={(event) => {
                                           event.stopPropagation();
                                           setToggleInputConfirm('');
                                       }}
                                />
                                <AiFillEye size='1.5em' className={openEyeVisibility} onClick={() => {
                                    setTypePassword('text');
                                    setOpenEyeVisibility('d-none');
                                    setClosedEyeVisibility('');
                                }}/>
                                <AiFillEyeInvisible size='1.5em' className={closedEyeVisibility} onClick={() => {
                                    setTypePassword('password');
                                    setOpenEyeVisibility('');
                                    setClosedEyeVisibility('d-none');
                                }}/>

                            </div>

                        </div> : null
                        }


                        {
                            mode === 'add' ? <div className='mb-1'>
                                <label htmlFor='role' className={`${styles.label}`}>
                                    Role:<sup className={`${styles.tip}`}>*</sup></label>
                                <select id='role' name='role'
                                        className={`${styles.input} d-block`}
                                        onChange={e => {
                                            setRole(e.target.value);
                                        }}>
                                    <option value="Administrator">Administrator</option>
                                    <option value="Readonly">Readonly</option>
                                    <option value="Services">Services</option>
                                    <option value="Provisioning">Provisioning</option>
                                </select>
                            </div> : null
                        }


                        <div className='mb-1'>
                            <label htmlFor='description' className={`${styles.label}`}>
                                Description:</label>
                            <input id='description' name='description' type='text' value={description}
                                   className={`${styles.input} d-block`}
                                   onChange={event => {
                                       setDescription(event.target.value);
                                   }}/>
                        </div>

                        {
                            mode === 'add' ?
                                <p className={`${styles.bottomText} mt-2 mb-0`}>* Please copy the generated password and
                                    send by
                                    Email to the new
                                    administrator</p> : null
                        }


                    </div>
                </div>
            );
        } else return (
            <div className={`row justify-content-center ${styles.detailsWrapper}`}>
                <p className={`${styles.intro}`}>Please select an admin from the list</p>
            </div>

        )


    }
;

export default AdminDetails;