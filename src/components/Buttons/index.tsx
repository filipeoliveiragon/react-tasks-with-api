import React from "react";
import Logo from './../../assets/logoArpia.png';
import Style from './buttons.module.scss';
import '../../styles/global_styles.scss'
import { Component } from "react";

interface Props{
    name: string;
    onClick?: string;
    classes?: string;
    type: "button" | "submit";
}

function ButtonComponent(props: Props){
    return(
        <button className={Style.btn + ' ' + props.classes} type={props.type}>
            {props.name}
        </button>
    )
}

export default ButtonComponent;