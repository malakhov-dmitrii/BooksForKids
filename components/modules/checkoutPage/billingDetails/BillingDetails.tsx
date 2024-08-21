import autosize from 'autosize'
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useLang } from "@/hooks/useLang";
import styles from '@/styles/checkoutPage/index.module.css';
import { $isAuth } from "@/context/auth/state";
import { useUnit } from "effector-react";
import { FieldErrorsImpl, useForm } from 'react-hook-form';
import { emailValidationRules, nameValidationRules, phoneValidationRules } from '@/lib/utils/auth';
import NameErrorMessage from '@/components/elements/nameErrorMessage/NameErrorMessage';
import { IAmInput } from '@/types/authPopup';

const BillingDetails = () => {
    const { lang, translations } = useLang();
    const isAuth = useUnit($isAuth)
    const [userWantToCreateAccount, setUserWantToCreateAccount] = useState(false)
    const [shipToDifferentAddress, setshipToDifferentAddress] = useState(false)
    const checkboxRef = useRef() as MutableRefObject<HTMLInputElement>
    const [messageLength, setMessageLength] = useState(0)
    const { register, trigger, formState: { errors }, } = useForm()

    const nameRegister = register(
        'name_label',
        nameValidationRules(translations[lang].validation.invalid_value)
      )

    const lastNameRegister = register(
        'last_name_label',
        nameValidationRules(translations[lang].validation.invalid_value)
    )

    const companyNameRegister = register(
        'company_name_label',
        nameValidationRules(translations[lang].validation.invalid_value)
    )

    const phoneRegister = register(
        'phone_label',
        phoneValidationRules(translations[lang].validation.invalid_phone)
    )

    const emailRegister = register(
        'email_label',
        emailValidationRules(translations[lang].validation.invalid_email)
      )

      const messageRegister = register('message_label', { maxLength: 255 })

    const handleCreatingAccountChange = () => setUserWantToCreateAccount(!userWantToCreateAccount)
    const handleShipToDiffAddressChange = () => setshipToDifferentAddress(!shipToDifferentAddress)

    const handleTabCheckbox = (e: React.KeyboardEvent<HTMLLabelElement>) => {
        if (e.key == ' ' || e.code == 'Space') {
          e.preventDefault()
          setUserWantToCreateAccount(!checkboxRef.current.checked)
          checkboxRef.current.checked = !checkboxRef.current.checked
        }
      }

      const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        nameRegister.onChange({
          target: {
            name: nameRegister.name,
            value,
          },
        })
        // setOrderDetailsValues({
        //   ...inputs,
        //   isValid,
        //   name_label: value,
        // })
        trigger(nameRegister.name)
      }
    
      const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        lastNameRegister.onChange({
          target: {
            name: lastNameRegister.name,
            value,
          },
        })
        // setOrderDetailsValues({
        //   ...inputs,
        //   isValid,
        //   last_name_label: value,
        // })
        trigger(lastNameRegister.name)
      }

      const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        lastNameRegister.onChange({
          target: {
            name: companyNameRegister.name,
            value,
          },
        })
        // setOrderDetailsValues({
        //   ...inputs,
        //   isValid,
        //   company_name_label: value,
        // })
        trigger(companyNameRegister.name)
      }
    
      const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        phoneRegister.onChange({
          target: {
            name: phoneRegister.name,
            value,
          },
        })
        // setOrderDetailsValues({
        //   ...inputs,
        //   isValid,
        //   phone_label: value,
        // })
        trigger(phoneRegister.name)
      }
    
      const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        emailRegister.onChange({
          target: {
            name: emailRegister.name,
            value,
          },
        })
        // setOrderDetailsValues({
        //   ...inputs,
        //   isValid,
        //   email_label: value,
        // })
        trigger(emailRegister.name)
      }

      const handleMessageChange = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.trim()
        messageRegister.onChange({
          target: {
            name: messageRegister.name,
            value,
          },
        })
    
        // setOrderDetailsValues({
        //   ...inputs,
        //   isValid,
        //   message_label: value,
        // })
        setMessageLength(e.target.value.length)
        trigger(messageRegister.name)
      }

      const handleDetailsInputFocus = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
      ) => e.target.classList.add(styles.with_value)

      useEffect(() => {
        const textarea = document.querySelector(
          `.${styles.checkout_billing_details_textarea}`
        )
    
        if (textarea) {
          autosize(textarea)
        }
      }, [])


    return (
        <form>
            <div className={styles.checkout_billing_details_form_inner}> 
                <div className={styles.checkout_billing_details_form_inner_name_block}>
                    <label className={`${styles.checkout_billing_details_form_label} ${styles.checkout_billing_details_form_input_name_block}`}>
                        <h5><input 
                        type='text'
                        placeholder={translations[lang].billing_form.first_name}
                        name={nameRegister.name}
                        ref={nameRegister.ref}
                        className={`${styles.checkout_billing_details_form_input}`}
                        onChange={handleNameChange}
                        /></h5>
                        <NameErrorMessage
                            errors={errors as Partial<FieldErrorsImpl<IAmInput>>}
                            className={`body_small ${styles.checkpot_input_error_alert}`}
                            fieldName={nameRegister.name}
                        />
                    </label>
                    <label className={`${styles.checkout_billing_details_form_label} ${styles.checkout_billing_details_form_input_name_block}`}>
                        <h5><input 
                        type='text'
                        placeholder={translations[lang].billing_form.last_name}
                        name={lastNameRegister.name}
                        ref={lastNameRegister.ref}
                        className={`${styles.checkout_billing_details_form_input}`}
                        onChange={handleLastNameChange}
                        /></h5>
                        <NameErrorMessage
                            errors={errors as Partial<FieldErrorsImpl<IAmInput>>}
                            className={`body_small ${styles.checkpot_input_error_alert}`}
                            fieldName={lastNameRegister.name}
                        />
                    </label>
                </div>
                <label className={styles.checkout_billing_details_form_label}>
                    <h5><input 
                    type='text'
                    placeholder={translations[lang].billing_form.company_name}
                    name={companyNameRegister.name}
                    ref={companyNameRegister.ref}
                    className={styles.checkout_billing_details_form_input}
                    onChange={handleCompanyNameChange}
                    /></h5>
                        <NameErrorMessage
                            errors={errors as Partial<FieldErrorsImpl<IAmInput>>}
                            className={`body_small ${styles.checkpot_input_error_alert}`}
                            fieldName={companyNameRegister.name}
                        />
                </label>
                <label className={styles.checkout_billing_details_form_label}>
                    <h5><input 
                    type='text'
                    placeholder={translations[lang].billing_form.state}
                    // name={phoneRegister.name}
                    // ref={phoneRegister.ref}
                    className={styles.checkout_billing_details_form_input}
                    onChange={() => {}}
                    /></h5>
                </label>
                <label className={styles.checkout_billing_details_form_label}>
                    <h5><input 
                    type='text'
                    placeholder={translations[lang].billing_form.street}
                    // name={phoneRegister.name}
                    // ref={phoneRegister.ref}
                    className={styles.checkout_billing_details_form_input}
                    onChange={() => {}}
                    /></h5>
                </label>
                <label className={styles.checkout_billing_details_form_label}>
                    <h5><input 
                    type='text'
                    placeholder={translations[lang].billing_form.zip}
                    // name={phoneRegister.name}
                    // ref={phoneRegister.ref}
                    className={styles.checkout_billing_details_form_input}
                    onChange={() => {}}
                    /></h5>
                </label>
                <label className={styles.checkout_billing_details_form_label}>
                    <h5><input 
                    type='text'
                    placeholder={translations[lang].billing_form.city}
                    // name={phoneRegister.name}
                    // ref={phoneRegister.ref}
                    className={styles.checkout_billing_details_form_input}
                    onChange={() => {}}
                    /></h5>
                </label>
                <label className={styles.checkout_billing_details_form_label}>
                    <h5><input 
                    type='text'
                    placeholder={translations[lang].billing_form.phone}
                    name={phoneRegister.name}
                    ref={phoneRegister.ref}
                    className={styles.checkout_billing_details_form_input}
                    onChange={handlePhoneChange}
                    /></h5>
                    {errors.phone_label && (
                        <span className={`body_small ${styles.checkpot_input_error_alert}`}>
                        {errors.phone_label?.message as React.ReactNode}
                        </span>
                    )}
                </label>
                <label className={styles.checkout_billing_details_form_label}>
                    <h5><input 
                    type='text'
                    placeholder="Email *"
                    name={emailRegister.name}
                    ref={emailRegister.ref}
                    className={styles.checkout_billing_details_form_input}
                    onChange={handleEmailChange}
                    /></h5>
                    {errors.email_label && (
                        <span className={`body_small ${styles.checkpot_input_error_alert}`}>
                        {errors.email_label?.message as React.ReactNode}
                        </span>
                    )}
                </label>
                {!isAuth ? (
                    <label className={`${styles.order_create_account_checkbox}`}>
                        <input type="checkbox" 
                        className={`input_checkbox ${styles.order_checkbox}`} 
                        tabIndex={-1}
                        onChange={handleCreatingAccountChange}
                        checked={userWantToCreateAccount}
                        ref={checkboxRef}
                        />
                        <span className={styles.order_checkbox_mark} />
                        <span
                            className={styles.order_checkbox_frame}
                            tabIndex={0}
                            onKeyDown={handleTabCheckbox}
                            />
                        <span className={styles.order_checkbox_text}>
                            {translations[lang].checkout.create_an_account}
                        </span>
                    </label>
                        ) : ""
                }
                <label className={` ${styles.order_ship_to_different_checkbox}`}>
                    <input type="checkbox" 
                        className={`input_checkbox ${styles.order_checkbox}`} 
                        tabIndex={-1}
                        onChange={handleShipToDiffAddressChange}
                        checked={shipToDifferentAddress}
                    />
                    <span className={styles.order_checkbox_mark} />
                    <span
                        className={styles.order_checkbox_frame}
                        tabIndex={0}
                    />
                    <span className={styles.order_checkbox_text}>
                        {translations[lang].checkout.ship_to_different}
                    </span>
                </label>
                <div className={styles.checkout_order_notes_container}>
                    <label className={styles.checkout_billing_details_form_label}>
                        <textarea className={styles.checkout_billing_details_textarea}
                         name={messageRegister.name}
                         ref={messageRegister.ref}
                         id=''
                         placeholder={translations[lang].checkout.order_notes}
                         onChange={handleMessageChange}
                         onFocus={handleDetailsInputFocus}
                         style={{
                            color:
                              messageLength < 255 ? 'var(--color-Dark-gray)' : 'var(--color-Errors)',
                          }} />
                        {errors.message_label && errors.message_label?.type === 'maxLength' && (
                        <span className={`body_small ${styles.checkpot_input_error_alert}`}>
                            {translations[lang].validation.max_255}
                        </span>
                        )}
                    </label>
                </div>
            </div>
        </form>
    );
};

export default BillingDetails;