import React, {useState} from 'react';


const Filter=()=> {

    const [input, setInput] = useState('');

    const handleChange =(e)=> {
        const info = e?.target?.value
        setInput(info)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendInfo();
        }
    };

    const sendInfo =()=> {
        searching()
    }

    const searching =()=> {
        window.location.href = (`/items?search=${input}`)
    }

    return (
        <div className="hero-filter">
            <div className="filter">
                <div className="filter__box-img">
                    <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.15/mercadolibre/logo_large_plus@2x.webp" alt="mercado libre" />
                </div>
                <input
                    placeholder="Nunca dejes de buscar"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="filter__send-button"
                    onClick={searching}
                >
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    );
};


export default Filter;


