import React from "react";
import {PrimaryButton} from "./style";

const Button = (props) => {
  const {children, visible, onClick} = props

  return(
    <div>
      { visible
        ? <PrimaryButton onClick={onClick}>
          {children}
        </PrimaryButton>
        : <></>
      }
    </div>
  )
}

export default Button