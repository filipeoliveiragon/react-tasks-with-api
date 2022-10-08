import React from "react";
import '../../styles/global_styles.scss'
import Style from '../Inputs/input.module.scss';


interface Props{
    type: string;
    placeholder: string;
    label: string;
    id: string;
}

function Input(props: Props){

    return(
        <div className={Style.inputGroup}>
            <label>
                {props.label}
            </label>
            <input 
                className={Style.input} 
                type={props.type} 
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default Input;