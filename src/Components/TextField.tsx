import { InputHTMLAttributes, useState } from "react";
import styled from "styled-components";
import { useSimara } from "../Global/Context";
import { ISimaraThemeData } from "../Global/Interface";
import { ComponentSize } from "../Global/Type";
import IconWrapper from "./IconWrapper";

const STextFieldBox = styled.div`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  display: inline-flex;
  position: relative;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const STextField = styled.input`
  margin: 0;
  padding: 0;
  height: ${(p) => p.theme.height + "px"};
  outline: none;
  border-radius: ${(p) => p.theme.borderRadius + "px"};
  box-sizing: border-box;
  border: 1.5px solid ${(p) => p.theme.inActiveBorderColor};
  font-size: ${(p) => p.theme.height / 3 + "px"};
  padding: 0px ${(p) => p.theme.height * 0.2 + "px"};
  transition: all 0.3s;
  font-weight: 400;
  -webkit-appearance: none;
  &:focus {
    border: 1.5px solid ${(p) => p.theme.activeBorderColor};
    box-shadow: 0 0 0 2px ${(p) => p.theme.activeBoxShadowColor};
  }
`;

const Counter = styled.p`
  margin: 0;
  padding: 0;
  font-size: ${(p) => p.theme.height / 3.5 + "px"};
  position: absolute;
  top: -20px;
  font-weight: 600;
  width: fit-content;
  margin-right: 10px;
  color: ${(p) => p.theme.activeBorderColor};
`;
function getTextFieldTheme(p: TextFieldProps, baseTheme: ISimaraThemeData) {
  let height = baseTheme.MediumHeight;
  switch (p.cSize) {
    case "small":
      height = baseTheme.SmallHeight;
      break;
    case "large":
      height = baseTheme.LargeHeight;
      break;
  }
  return {
    height,
    borderRadius: baseTheme.BorderRadius,
    inActiveBorderColor: p.isInvalid
      ? baseTheme.Colors.danger.dil30
      : baseTheme.Colors.grey.dil60,
    activeBorderColor: p.isInvalid
      ? baseTheme.Colors.danger.dil0
      : baseTheme.Colors.primary.dil0,
    activeBoxShadowColor: p.isInvalid
      ? baseTheme.Colors.danger.dil60
      : baseTheme.Colors.primary.dil60,
  };
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  showMaxCounter?: boolean;
  iconBefore?: JSX.Element;
  iconAfter?: JSX.Element;
  cSize?: ComponentSize;
}
function TextField(props: TextFieldProps) {
  const textFieldTheme = getTextFieldTheme(props, useSimara());
  const [textLength, setTextLength] = useState(
    props.value?.toString.length || 0
  );
  return (
    <STextFieldBox
      style={{ width: props.style?.width, height: props.style?.height }}
    >
      {props.iconBefore && (
        <IconWrapper
          style={{
            position: "absolute",
            left: textFieldTheme.height / 3,
          }}
          cSize={props.cSize}
          color={textFieldTheme.activeBorderColor}
        >
          {props.iconBefore}
        </IconWrapper>
      )}
      {props.iconAfter && (
        <IconWrapper
          style={{
            position: "absolute",
            right: textFieldTheme.height / 3,
          }}
          cSize={props.cSize}
          color={textFieldTheme.activeBorderColor}
        >
          {props.iconAfter}
        </IconWrapper>
      )}
      {props.showMaxCounter && (
        <Counter theme={textFieldTheme}>
          {textLength + (props.maxLength ? " / " + props.maxLength : "")}
        </Counter>
      )}
      <STextField
        theme={textFieldTheme}
        {...props}
        style={{
          ...props.style,
          paddingLeft: props.iconBefore ? textFieldTheme.height + "px" : "",
          paddingRight: props.iconAfter ? textFieldTheme.height + "px" : "",
        }}
        onChange={(e) => {
          setTextLength(e.target.value.length);
          props.onChange && props.onChange(e);
        }}
      />
    </STextFieldBox>
  );
}

export default TextField;
