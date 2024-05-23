import { useLang } from '@/hooks/useLang';
import React, { useState } from 'react';
import styles from '@/styles/calcShippingBlock/index.module.css'

const states = [
        {
            id: 1,
            name: "New York",
            value: 'NY',
            cities: [ 
                {
                    id: 100,
                    name: "New York",
                    zip: [
                        111111,
                        122222,
                        133333
                    ]
                },
                {
                    id: 101,
                    name: "Buffalo",
                    zip: [
                        111112,
                        122223,
                        133334
                    ]
                },
                {
                    id: 102,
                    name: "Rochester",
                    zip: [
                        111122,
                        122233,
                        133344
                    ]
                },
            ]
        },
        {
            id: 2,
            name: "California",
            value: 'CL',
            cities: [ 
                {
                    id: 104,
                    name: "Los Angeles",
                    zip: [
                        111111,
                        122222,
                        133333
                    ]
                },
                {
                    id: 105,
                    name: "San Diego",
                    zip: [
                        111112,
                        122223,
                        133334
                    ]
                },
                {
                    id: 106,
                    name: "San Jose",
                    zip: [
                        111432,
                        122443,
                        133344
                    ]
                },
            ]
        },
        {
            id: 3,
            name: "Illinois",
            value: 'IL',
            cities: [ 
                {
                    id: 107,
                    name: "Decatur",
                    zip: [
                        111111,
                        122222,
                        133333
                    ]
                },
                {
                    id: 108,
                    name: "Schaumburg",
                    zip: [
                        111112,
                        122223,
                        133334
                    ]
                },
                {
                    id: 109,
                    name: "Bolingbrook",
                    zip: [
                        111432,
                        122443,
                        133344
                    ]
                },
            ]
        },
        {
            id: 4,
            name: "Florida",
            value: 'FL',
            cities: [ 
                {
                    id: 110,
                    name: "Mayami",
                    zip: [
                        111111,
                        122222,
                        133333
                    ]
                },
                {
                    id: 111,
                    name: "Orlando",
                    zip: [
                        111112,
                        122223,
                        133334
                    ]
                },
                {
                    id: 112,
                    name: "Sarasota",
                    zip: [
                        111432,
                        122443,
                        133344
                    ]
                },
            ]
        }
    ]

console.log(states)

export default function CalcShippingBlock() {
const { lang, translations } = useLang();
const [open, setOpen] = React.useState(false);
const handleClick = () => {
    setOpen(!open);
  };
const [selectedState, setSelectedState] = useState(`${translations[lang].cart.select_state}`)
const [selectedCity, setSelectedCity] = useState(`${translations[lang].cart.city}`)
const [selectedZip, setSelectedZip] = useState(`${translations[lang].cart.zip}`)

// const handleStateChange = ({ target: { value } }) => {
//     setSelectedState(value)
// }
// const handleCityChange = ({ target: { id } }) => {
//     setSelectedState(id)
// }
// const handleZipChange = ({ target: { value } }) => {
//     setSelectedState(value)
// }

  return (
    <div className={`uppercase ${styles.calc_shipping_list_inner}`}>
        <div className={styles.calc_shipping_list_inner_title}>
            <h5>{translations[lang].cart.calculate_shipping}</h5>
            <button className={`${styles.calc_shipping_list_inner_title_btn} ${open? 'calc_shipping_list_inner_title_btn_open' : 'calc_shipping_list_inner_title_btn_close'}`}
            onClick={handleClick}
            ><span /></button>
        </div>
        <div className={`${styles.calc_shipping_list_main} ${open? 'hide' : ''}`}>
            <ul>
            <li><select
                value={selectedState}
                className={styles.calc_shipping_select}
                onChange={() => {}}>
                {
                    states.map(state => (
                        <option
                        key={state.id}
                        value={state.value}
                        >
                            {state.name}
                        </option>
                    ))
                }
            </select></li>
            <li><select
                value={selectedState}
                className={styles.calc_shipping_select}
                onChange={() => {}}>
                {
                    states.map(state => (
                        <option
                        key={state.id}
                        value={state.value}
                        >
                            {state.name}
                        </option>
                    ))
                }
            </select></li>
            <li><select
                value={selectedState}
                className={styles.calc_shipping_select}
                onChange={() => {}}>
                {
                    states.map(state => (
                        <option
                        key={state.id}
                        value={state.value}
                        >
                            {state.name}
                        </option>
                    ))
                }
            </select></li>
            </ul>
        </div>
    </div>
  );
}
